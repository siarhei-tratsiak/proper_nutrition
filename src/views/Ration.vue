<template>
  <div>
    <v-card v-if="settings.userID">
      <Calendar />
      <RationTable />
      <ProductDialog />
    </v-card>
  </div>
</template>

<script>
import Calendar from "@/components/ration/Calendar";
import ProductDialog from "@/components/ration/dialog/ProductDialog";
import RationTable from "@/components/ration/RationTable";
import { mapState } from "vuex";

export default {
  components: {
    Calendar,
    ProductDialog,
    RationTable
  },

  data() {
    return {
      headers: [
        { text: "Продукт", value: "product" },
        { text: "Масса, г", value: "mass" },
        { text: "Действия", sortable: false, value: "actions" }
      ]
    };
  },

  computed: {
    ...mapState(["settings"])
  }
};
</script>
