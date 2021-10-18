const getCovidInfoSingleCountry = (country, timeFrom, timeTo, fetch) => fetch(
  `https://api.covid19api.com/total/country/${country}?from=${timeFrom.substr(0, 10)}&to=${timeTo.substr(0, 10)}`,
);

export default getCovidInfoSingleCountry();
