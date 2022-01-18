<template>
  <div class="converter">
    <h1>Converter</h1>
    <div class="converter-row">
      <input
        class="converter__input"
        type="text"
        v-model="valueFrom"
        @input="calcAgain"
      />
      <select v-model="checkedCurrencyFrom" @change="fetchNew">
        <option
          v-for="currency in currencies"
          :key="currency"
          :value="currency"
        >
          {{ currency }}
        </option>
      </select>
    </div>

    <div class="converter-row">
      <input class="converter__input" type="text" v-model="valueTo" readonly />
      <select v-model="checkedCurrencyTo" @change="calcAgain">
        <option
          v-for="currency in currencies"
          :key="currency"
          :value="currency"
        >
          {{ currency }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { exchangeRatesApi } from "@/api/exchange-rates";
import { formatCurrency } from "@/utils/formatters/currency";

export default {
  data() {
    return {
      exchangeRates: {},
      valueFrom: 0,
      valueTo: 0,
      checkedCurrencyFrom: "USD",
      checkedCurrencyTo: "UAH",
    };
  },
  computed: {
    ...mapState("exchangeRates", ["currencies"]),
  },
  created() {
    this.fetchNew();
  },
  methods: {
    async fetchNew() {
      const response = await exchangeRatesApi.fetchRates(
        this.checkedCurrencyFrom
      );
      const { data: jsonData } = await response.json();
      if (!jsonData?.rates) {
        return new Error(`Rates not found!`);
      }
      this.exchangeRates = jsonData;
      this.calcAgain();
    },
    calcAgain() {
      const rate = this.exchangeRates?.rates[this.checkedCurrencyTo];
      if (!rate) {
        return new Error(`Currency ${this.checkedCurrencyTo} not found!`);
      }
      this.valueTo = formatCurrency(rate * this.valueFrom);
    },
  },
};
</script>
