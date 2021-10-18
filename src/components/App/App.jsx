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
} from "../../core/covid/covidSlice";
import MockApi from "../../core/api/covidApi/countryInfoPreConverter";

const App = () => {
  const [itemOnFocus, setItemOnFocus] = useState(false);
  const [isCountriesOpen, setIsCountriesOpen] = useState(false);
  const dispatch = useDispatch();

  const { loadingStatusCountryApi } = useSelector((state) => state.covid);

  const handleItemClick = (item) => {
    setItemOnFocus(item);
  };

  const handleItemMainPage = () => {
    setItemOnFocus(false);
    setIsCountriesOpen(false);
  };

  const handleClickCountries = () => {
    setIsCountriesOpen(!isCountriesOpen);
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

  return (
    <>
      <Header itemOnFocus={itemOnFocus} />
      <SidePanel
        handleItemClick={handleItemClick}
        handleClickMainPage={handleItemMainPage}
        handleClickCountries={handleClickCountries}
      />
      {!isCountriesOpen ? (
        <InfoBox itemOnFocus={itemOnFocus} />
      ) : null}
    </>
  );
};

export default App;
