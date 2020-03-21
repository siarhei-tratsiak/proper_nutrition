import {
  clauseForSelectedAll,
  clauseForSelectedCategory,
  clauseForSelectedProduct,
} from '@/store/store_service.js';
import {initDatabase} from '@/api/indexedDBService';
import {conditions} from '@/data/DBSettings';
import {simplex} from '@/api/simplex';
import {defaultSettings, trackingChanges} from '@/data/defaultSettings';

const actions = {

  enableSettings({commit}) {
    commit('setSettings', {
      setting: 'disabled',
      value: false,
    });
  },

  getCategoryIsExpanded({state, commit}) {
    const categoryIsExpanded = state.productsList.map(() => false);
    commit('setCategoryIsExpanded', categoryIsExpanded);
  },

  async getSolution({state, getters, commit, dispatch}) {
    commit('setCounting', 'started');
    const {A, b, c, indices} = await getters.getConditions();
    const test = false;
    let result = [];
    result = [
      {
        index: 664,
        value: 4.569412690773433,
      },
      {
        index: 765,
        value: 6.768717862962623,
      },
      {
        index: 789,
        value: 0.005774796693993312,
      },
      {
        index: 861,
        value: 0.007633636034107025,
      },
      {
        index: 880,
        value: 0.5071104741299753,
      },
      {
        index: 1443,
        value: 0.005175322906293025,
      },
      {
        index: 1635,
        value: 0.020567777637319963,
      },
      {
        index: 1647,
        value: 0.23914786677821118,
      },
      {
        index: 1895,
        value: 0.05071810939376501,
      },
      {
        index: 1929,
        value: 0.18342288079307126,
      },
      {
        index: 1934,
        value: 0.010044039255018513,
      },
      {
        index: 1939,
        value: 0.024192952681500575,
      },
      {
        index: 2014,
        value: 0.09870617458709506,
      },
      {
        index: 2045,
        value: 0.025186091797739372,
      },
      {
        index: 2052,
        value: 0.0789726247104865,
      },
      {
        index: 2072,
        value: 0.0857622850519656,
      },
      {
        index: 2090,
        value: 0.15949424574600735,
      },
      {
        index: 2180,
        value: 0.10854010309067817,
      },
      {
        index: 2242,
        value: 0.06887192690836842,
      },
      {
        index: 2269,
        value: 0.5989104828101579,
      },
      {
        index: 2274,
        value: 0.04510459535937683,
      },
      {
        index: 2586,
        value: 0.008125068228944198,
      },
      {
        index: 2755,
        value: 0.07322363542732481,
      },
      {
        index: 3156,
        value: 2.3207512378162543,
      },
      {
        index: 3570,
        value: 0.0914460579157686,
      },
      {
        index: 3574,
        value: 0.3564966409125774,
      },
      {
        index: 3594,
        value: 0.0023122581937672277,
      },
      {
        index: 3595,
        value: 0.12222571168031642,
      },
      {
        index: 4656,
        value: 1.5988411580064883,
      },
      {
        index: 4920,
        value: 0.005490019506223904,
      },
      {
        index: 5133,
        value: 0.016795908711585417,
      },
      {
        index: 5402,
        value: 0.29717748701830565,
      },
      {
        index: 5408,
        value: 0.1999168003139237,
      },
      {
        index: 5933,
        value: 0.021947062884508046,
      },
      {
        index: 6470,
        value: 0.17447230030517985,
      },
      {
        index: 6498,
        value: 0.09581875908962274,
      },
      {
        index: 6507,
        value: 0.0017674293955819143,
      },
      {
        index: 6542,
        value: 0.0770775917098274,
      },
      {
        index: 6621,
        value: 0.0881485430770563,
      },
      {
        index: 6868,
        value: 0.06058400156383571,
      },
      {
        index: 6869,
        value: 0.018614733999458115,
      },
      {
        index: 6873,
        value: 0.013092452173017698,
      },
      {
        index: 6991,
        value: 0.19503997170330079,
      },
      {
        index: 7888,
        value: 0.9837378232016989,
      },
      {
        index: 8065,
        value: 9.325446708534356,
      },
      {
        index: 8085,
        value: 0.02303112433974114,
      },
      {
        index: 8512,
        value: 0.02415544321767649,
      },
    ];
    if (!test) {
      result = simplex(A, b, c);
      console.log(result);
      result = result.x
          .map((curVal, index) => {
            const id = indices[index];
            return {
              id,
              value: curVal,
            };
          })
          .filter((curVal) => curVal.value !== 0);
    }
    const db = state.db;
    const products = await db.products.toArray();
    result = result.map((curVal) => {
      const id = curVal.id;
      const name = products.find((product) => product.id === id).name;
      return {
        id,
        name,
        value: curVal.value * 100,
      };
    });
    commit('setProducts', result);
    dispatch('setNutrients');
    commit('setCounting', 'finished');
    commit('setStatus', {
      resultIsOpened: true,
    });
  },

  async initData({dispatch}) {
    await dispatch('initDB');
    dispatch('setProductsList');
    await dispatch('initSettings');
    dispatch('initSelected');
    dispatch('initFavored');
  },

  async initDB({commit}) {
    const db = await initDatabase();
    commit('setDB', db);
    if (db) {
      return true;
    }
  },

  async initFavored({state, commit}) {
    const userId = state.settings.userId;
    const rawFavored = await state.db.filters
        .where({user_id: userId, favored: 1})
        .toArray();
    const favored = rawFavored.map((filter) => filter.product_id);
    commit('setFavored', favored);
  },

  async initSelected({state, commit}) {
    const userId = state.settings.userId;
    const db = state.db;
    const selectedRaw = await db.filters
        .where('user_id').equals(userId).toArray();
    const products = await db.products.toArray();
    const selected = selectedRaw.map((row) => {
      row.category_id = products.find(
          (product) => product.id === row.product_id,
      ).category_id;
      return {
        id: row.product_id,
        category_id: row.category_id,
        selected: row.selected,
      };
    });
    commit('setSelected', selected);
    commit('setStatus', {
      selected: true,
    });
  },

  async initSettings({state, commit, dispatch}) {
    trackingChanges.forEach(async (setting) => {
      const lastValue = await state.db.changes
          .where('parameter')
          .equals(setting)
          .last();
      const value = lastValue ? lastValue.value : defaultSettings[setting];
      commit('setSettings', {
        setting,
        value,
      });
    });
    dispatch('enableSettings');
    await dispatch('setUserId');
  },

  async setNutrients({state, commit}) {
    const db = state.db;
    const dbProducts = await db.products.toArray();
    const products = state.products;
    const nutrients = conditions.constraints.map((constraint) => {
      const count = products
          .map((product) => {
            const dbProduct = dbProducts
                .find((dbProduct) => dbProduct.id === product.id);
            return (product.value / 100) * dbProduct[constraint.namedVector];
          })
          .reduce((acc, curVal) => acc + curVal);
      return {
        name: constraint.namedVector,
        constraint: constraint.constraint,
        constant: constraint.constant,
        count,
      };
    });
    commit('setNutrients', nutrients);
  },

  async setProductsList({state, commit}) {
    const db = state.db;
    const categories = await db.categories.toArray();
    const products = await db.products.toArray();
    const productsList = categories.map((row) => ({
      category: {
        id: row.id,
        name: row.category,
      },
      products: products
          .filter((product) => product.category_id === row.id)
          .map((product) => ({
            id: product.id,
            name: product.name,
            // favored: product.favored,
          })),
    }));
    commit('setProductsList', productsList);
  },

  settingChange({state, commit}, payload) {
    commit('setSettings', payload);
    const dateTime = new Date().toLocaleString();
    state.db.changes.add({
      date_time: dateTime,
      parameter: payload.setting,
      value: payload.value,
    });
  },

  async setUserId({state, commit}) {
    const lastUser = await state.db.users.toCollection().last();
    const userId = lastUser.id;

    commit('setSettings', {
      setting: 'userId',
      value: userId,
    });
  },

  toggleFavored({state}, payload) {
    state.db.filters
        .where({user_id: state.settings.userId, product_id: payload.id})
        .modify({favored: payload.favored});
  },

  toggleFilter({commit}) {
    commit('setFilter');
  },

  async toggleSelected({state, commit}, payload) {
    commit('setStatus', {
      recordingToDB: true,
    });
    const userId = state.settings.userId;
    const filters = state.db.filters;
    let whereClause = filters;
    if (payload.all) {
      commit('setSelectedAll', payload);
      whereClause = clauseForSelectedAll(filters, userId);
    } else if (payload.category_id) {
      commit('setSelectedCategory', payload);
      whereClause = await clauseForSelectedCategory(
          state, payload, filters, userId);
    } else {
      commit('setSelectedProduct', payload);
      whereClause = clauseForSelectedProduct(filters, userId, payload);
    }
    await whereClause.modify({
      selected: payload.selected,
    });
    commit('setStatus', {
      recordingToDB: false,
    });
  },
};

export {actions};
