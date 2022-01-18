<template>
  <h1>Exchange Rates</h1>
  <ul class="exchange-rates">
    <li v-for="(value, name) in exchangeRates" :key="name">
      <div class="exchange-rates__item">
        <span class="exchange-rates-currency">
          <span class="exchange-rates-currency__value">1 </span>
          <span class="exchange-rates-currency__name">{{ name }}</span>
        </span>
        -
        <span class="exchange-rates-currency">
          <span class="exchange-rates-currency__value">
            {{ formatCurrency(value) }}
          </span>
          <span class="exchange-rates-currency__name">{{ baseCurrency }}</span>
        </span>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapState } from "vuex";
import { exchangeRatesApi } from "@/api/exchange-rates";
import { formatCurrency } from "@/utils/formatters/currency";

export default {
  data() {
    return {
      exchangeRates: {},
    };
  },
  computed: {
    ...mapState("exchangeRates", ["baseCurrency", "currencies"]),
  },
  created() {
    this.fetchExchangeRates();
  },
  methods: {
    formatCurrency,
    async fetchExchangeRates() {
      const filteredCurrencies = this.currencies.filter(
        (currency) => currency !== this.baseCurrency
      );
      const responsePromises = filteredCurrencies.map((currency) =>
        exchangeRatesApi.fetchRates(currency)
      );
      const responses = await Promise.allSettled(responsePromises);
      const jsonData = await Promise.allSettled(
        responses.map((response) => response.value.json())
      );
      jsonData.forEach((data) => {
        const { currency, rates } = data.value.data;
        const rate = rates[this.baseCurrency];
        this.exchangeRates[currency] = rate;
      });
    },
  },
};
</script>

<style>
.exchange-rates {
  list-style-type: none;
  text-align: left;
}
.exchange-rates__item {
  margin-bottom: 0.5rem;
}
</style>
