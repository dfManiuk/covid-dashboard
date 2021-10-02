import { CountryInfo } from "../../entities/CountryInfo";
import countryCordMock from "../../mock/country-by-geo-coordinates.json";
import countryFlagMock from "../../mock/country-by-flag.json";

const MockApi = () => (countryFlagMock.reduce((acc, flagMockItem, index) => {
  if (flagMockItem.flag_base64 !== null && countryCordMock[index].north !== null && countryCordMock[index].west !== null
      && countryCordMock[index].south !== null && countryCordMock[index].east !== null) {
    const flag = flagMockItem.flag_base64;

    const countryCordInfo = countryCordMock.find((item) => flagMockItem.country === item.country);

    const lat = Math.ceil(((countryCordInfo.north + countryCordInfo.south) * 0.5));
    const lon = Math.ceil((countryCordInfo.west + countryCordInfo.east) * 0.5);

    const latlng = [lat, lon];

    const name = countryCordInfo.country;

    const country = new CountryInfo({ flag, latlng, name });

    acc.push(country);
  }

  return acc;
}, [])
);

export default MockApi;
