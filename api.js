const BASE_URL = "https://api.coinpaprika.com/v1";
const COINS_URL = `${BASE_URL}/coins`;

export const getCoins = () =>
  fetch(COINS_URL).then((response) => response.json());

export const getSymbol = (symbol) =>
  `https://cryptoicon-api.vercel.app/api/icon/${symbol.toLowerCase()}`;

export const getCoinInfo = ({ queryKey }) =>
  fetch(`${COINS_URL}/${queryKey[1]}`).then((response) => response.json());

export const getCoinHistory = ({ queryKey }) =>
  fetch(
    `${BASE_URL}/tickers/${queryKey[1]}/historical?start=${
      new Date().toISOString().split("T")[0]
    }&interval=30m`
  ).then((response) => response.json());
