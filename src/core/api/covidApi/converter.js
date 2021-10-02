import { CovidEntity } from "../../entities/CovidEntity";
import { GlobalCovidEntity } from "../../entities/GlobalCovidEntity";

export const converter = (api) => {
  const countries = api.Countries.reduce((acc, item) => {
    const country = new CovidEntity({ ...item });

    acc.push(country);

    return acc;
  }, []);

  const global = new GlobalCovidEntity(api.Global);

  return { countries, global };
};
