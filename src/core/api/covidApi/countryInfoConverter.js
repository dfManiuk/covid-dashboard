import { CountryInfo } from "../../entities/CountryInfo";

export const countryInfoConverter = (api) => api.reduce((acc, item) => {
  const country = new CountryInfo({ ...item });

  acc.push(country);

  return acc;
}, []);
