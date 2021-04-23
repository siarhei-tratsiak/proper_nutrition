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
                  :label="$t('dialog.mass')"
                  :rules="Object.values(rules)"
                  type="number"
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
import CloseButton from '@/components/common/dialog/CloseButton'
import CloseProductDialog from '@/mixins/CloseProductDialog'
import SaveButton from '@/components/common/dialog/SaveButton'
import SearchProduct from '@/components/common/dialog/SearchProduct'
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
      const action = this._isNewProduct
        ? this.$t('dialog.headline.add')
        : this.$t('dialog.headline.edit')
      const text = this.$t('dialog.headline.product', { action })
      return text
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

  data: function () {
    const required = this.$t('rules.required')
    const numeric = this.$t('rules.numeric')
    const positive = this.$t('rules.positive')
    return {
      rules: {
        required: value => !!value || required,
        numeric: value => !isNaN(value) || numeric,
        positive: value => +value > 0 || positive
      },
      valid: true
    }
  },

  methods: {
    ...mapMutations(['setStateObject'])
  },

  mixins: [CloseProductDialog]
}
</script>
