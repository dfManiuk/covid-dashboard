import { MapContainer, TileLayer } from 'react-leaflet';
import './MapComponent.scss';
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { CircularProgress } from "@material-ui/core";
import * as React from "react";
import MarkerComponent from "./Popup/MarkerComponent";

const MapComponent = ({ itemOnFocus }) => {
  const {
    global,
    loadingStatusCovidApi, loadingStatusCountryApi,
    countriesInCovid, countriesInfo,
  } = useSelector((state) => state.covid);

  if (loadingStatusCovidApi !== 'idle' || loadingStatusCountryApi !== 'idle') return <p className='map-loading'><CircularProgress /></p>;

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
    <MapContainer center={itemOnFocus === false ? position : itemOnFocus.latlng} zoom={3} zoomControl={false} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {covidFullStatistic}
    </MapContainer>
  );
};

MapComponent.propTypes = { itemOnFocus: PropTypes.bool.isRequired };
export default MapComponent;
