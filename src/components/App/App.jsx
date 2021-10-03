import React, { useEffect, useState } from "react";
import './App.scss';
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header";
import SidePanel from "../SidePanel/SidePanel";
import InfoBox from "../InfoBox/InfoBox";
import {
  countriesApiAsync,
  covidApiAsync, ipAddressAsync,
  mockApiCountry,
  mockStatusCountryApi,
} from "../../core/counter/covidSlice";
import MockApi from "../../core/api/covidApi/countryInfoPreConverter";

const App = () => {
  const [itemOnFocus, setItemOnFocus] = useState(null);
  const dispatch = useDispatch();
  const {
    global,
    countriesInfo,
    loadingStatusCountryApi,
    countriesInCovid,
    loadingStatusCovidApi,
    loadingStatusIpApi,
    ipApi,
  } = useSelector((state) => state.covid);

  const handleItemClick = (item) => {
    setItemOnFocus(item);
  };

  useEffect(() => {
    dispatch(covidApiAsync());
    dispatch(countriesApiAsync());
    dispatch(ipAddressAsync());
  }, [dispatch]);

  if (loadingStatusCountryApi !== 'idle') {
    setTimeout(() => {
      const mockApi = MockApi();

      dispatch(mockApiCountry(mockApi));

      dispatch(mockStatusCountryApi('idle'));
    }, 1000);
  }

  console.log({ global, ipApi, loadingStatusCountryApi, loadingStatusCovidApi, countriesInCovid, countriesInfo, loadingStatusIpApi });

  return (
    <>
      <Header />
      <SidePanel handleItemClick={handleItemClick} />
      <InfoBox itemOnFocus={itemOnFocus} />
    </>
  );
};

export default App;
