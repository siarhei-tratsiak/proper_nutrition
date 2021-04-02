<template>
  <v-dialog max-width="500px" v-model="dialog">
    <v-card>
      <v-card-title>
        <span class="headline">{{ headlineText }}</span>
      </v-card-title>

      <v-form ref="form" v-model="valid">
        <v-card-text>
          <v-container>
            <v-row>
              <SearchProduct :rules="rules" />

              <v-col cols="12" md="3" sm="6">
                <v-text-field
                  label="Масса, г"
                  :rules="Object.values(rules)"
                  v-model="product.mass"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <CloseButton />

          <SaveButton :valid="valid" />
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import CloseButton from '@/components/ration/dialog/CloseButton'
import CloseProductDialog from '@/mixins/CloseProductDialog'
import SaveButton from '@/components/ration/dialog/SaveButton'
import SearchProduct from '@/components/ration/dialog/SearchProduct'
import { mapMutations, mapState } from 'vuex'

export default {
  components: {
    CloseButton,
    SaveButton,
    SearchProduct
  },

  computed: {
    ...mapState(['editedProduct', 'status']),

    dialog: {
      get: function () {
        return this.status.productDialogIsOpened
      },

      set: function () {
        this.close()
      }
    },

    headlineText: function () {
      return (this._isNewProduct ? 'Добавить' : 'Редактировать') + ' продукт'
    },

    _isNewProduct: function () {
      return !this.editedProduct.id
    },

    product: {
      get: function () {
        return this.editedProduct
      },

      set: function (mass) {
        const editedProduct = { objectName: 'editedProduct', state: { mass } }
        this.setStateObject(editedProduct)
      }
    }
  },

  data: () => ({
    rules: {
      required: value => !!value || 'Обязательное поле',
      numeric: value => !isNaN(value) || 'Не число',
      positive: value => +value > 0 || 'Не больше 0'
    },
    valid: true
  }),

  methods: {
    ...mapMutations(['setStateObject'])
  },

  mixins: [CloseProductDialog]
}
</script>
