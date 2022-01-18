const baseUrl = "https://api.coinbase.com/v2";

export const exchangeRatesApi = {
  fetchRates(currency) {
    return fetch(`${baseUrl}/exchange-rates?currency=${currency}`);
  },
};
