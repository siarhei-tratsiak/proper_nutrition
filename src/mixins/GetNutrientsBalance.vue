<script>
import { mapActions, mapState } from 'vuex'
import GetNutrietsTableData from '@/mixins/GetNutrientsTableData'

export default {
  computed: {
    ...mapState(['rationForPeriod'])
  },

  created: function () {
    this.setRationForPeriod()
  },

  methods: {
    ...mapActions(['setRationForPeriod']),

    _getProductIDs () {
      return this.products.map(product => product.id)
    },

    _getRationProductIDs () {
      return this.rationForPeriod.map(product => product.id)
    },

    _rowsSum (acc, nutrientValues) {
      return acc.map(
        (nutrientValue, index) => nutrientValues[index] + nutrientValue
      )
    }
  },

  mixins: [GetNutrietsTableData]
}
</script>
