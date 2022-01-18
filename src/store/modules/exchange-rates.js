const state = () => ({
  baseCurrency: "UAH",
  currencies: [
    "UAH",
    "USD",
    "EUR",
    "GBP",
    "JPY",
    "BTC",
    "ETH",
    "USDT",
    "RUB",
    "CAD",
  ],
});

const actions = {
  changeBaseCurrency({ commit }, baseCurrency) {
    commit("setBaseCurrency", { baseCurrency });
  },
};

const mutations = {
  setBaseCurrency(state, { baseCurrency }) {
    state.baseCurrency = baseCurrency;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
