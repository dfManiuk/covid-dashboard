import { MapContainer, TileLayer } from 'react-leaflet';
import './MapComponent.scss';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { countriesApiAsync, covidApiAsync, mockApiCountry, mockStatusCountryApi } from "../../core/counter/covidSlice";
import MarkerComponent from "./Popup/MarkerComponent";
import MockApi from "../../core/api/covidApi/countryInfoPreConverter";

const MapComponent = ({ itemOnFocus }) => {
  const dispatch = useDispatch();
  const {
    global,
    loadingStatusCovidApi, loadingStatusCountryApi,
    countriesInCovid, countriesInfo,
  } = useSelector((state) => state.covid);

  console.log({ global, loadingStatusCountryApi, loadingStatusCovidApi, countriesInCovid, countriesInfo });

  useEffect(() => {
    dispatch(covidApiAsync());
    dispatch(countriesApiAsync());
  }, [dispatch]);

  if (loadingStatusCountryApi !== 'idle') {
    setTimeout(() => {
      const mockApi = MockApi();

      dispatch(mockApiCountry(mockApi));

      dispatch(mockStatusCountryApi('idle'));
    }, 1000);
  }

  if (loadingStatusCovidApi !== 'idle' || loadingStatusCountryApi !== 'idle') return <p>Loading...</p>;

  const averageCalculation = (() => (global.TotalConfirmed / countriesInCovid.length))();

  const covidFullStatistic = countriesInCovid.reduce((arr, covidStat) => {
    let countyInfo;

    countriesInfo.every((element) => {
      if (element.name === covidStat.Country) {
        countyInfo = element;
        const markerComponent = (
          <MarkerComponent
            key={Math.random()}
            countyInfo={countyInfo}
            covidStat={covidStat}
            averageCalculation={averageCalculation}
          />
        );

        arr.push(markerComponent);

        return false;
      }

      return true;
    });

    return arr;
  }, []);

  const position = [51.505, -0.09];

  return (
    <MapContainer center={itemOnFocus === null ? position : itemOnFocus.latlng} zoom={3} zoomControl={false} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {covidFullStatistic}
    </MapContainer>
  );
};

MapComponent.propTypes = { itemOnFocus: PropTypes.element.isRequired };
export default MapComponent;
