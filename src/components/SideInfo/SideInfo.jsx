import './SideInfo.css';
import { useSelector } from "react-redux";
import CountryInfo from "./CountryInfo";

const SideInfo = () => {
  const {
    ipApi,
    countriesInCovid,
    countriesInfo,
    loadingStatusIpApi,
    loadingStatusCountryApi,
    loadingStatusCovidApi,
  } = useSelector((state) => state.covid);

  if (loadingStatusIpApi !== 'idle' || loadingStatusCountryApi !== 'idle' || loadingStatusCovidApi !== 'idle') {
    return <div>Loading...</div>;
  }

  const countryPosition = countriesInCovid.find((item) => item.Country === ipApi[0]);
  const countryFlag = countriesInfo.find((item) => item.name === ipApi[0]);

  return (
    <div className='side-info'>
      <div className='side-info__country-name'>
        <img
          src={countryFlag.flag}
          width='50'
          height='50'
          alt='no img'
        />
        <p>{countryPosition.Country}</p>
      </div>
      <CountryInfo countryPosition={countryPosition} />
    </div>
  );
};

export default SideInfo;
