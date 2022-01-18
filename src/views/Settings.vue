<template>
  <h1>Settings</h1>
  <span>Cange base currency </span>
  <select v-model="selected">
    <option v-for="currency in currencies" :key="currency" :value="currency">
      {{ currency }}
    </option>
  </select>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("exchangeRates", ["baseCurrency", "currencies"]),
    selected: {
      get() {
        return this.baseCurrency;
      },
      set(baseCurrency) {
        this.changeBaseCurrency(baseCurrency);
      },
    },
  },
  methods: {
    ...mapActions("exchangeRates", ["changeBaseCurrency"]),
  },
};
</script>
