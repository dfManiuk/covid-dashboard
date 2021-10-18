import { Popup, Marker } from 'react-leaflet';
import PropTypes from "prop-types";
import { Icon } from "leaflet";
import image from "../../../assets/img/virus_corona.svg";

const MarkerComponent = ({ countyInfo, covidStat, averageCalculation }) => {
  const { flag, latlng, name } = countyInfo;
  const { NewConfirmed, NewDeaths, NewRecovered, TotalConfirmed, TotalDeaths } = covidStat;

  let iconOptions;

  if ((Math.round(TotalConfirmed * 0.1)) > averageCalculation) {
    iconOptions = [45, 45];
  } else if ((Math.round(TotalConfirmed * 0.1))
      < averageCalculation && (Math.round(TotalConfirmed * 0.5)) > averageCalculation) {
    iconOptions = [25, 25];
  } else {
    iconOptions = [15, 15];
  }

  const marker = new Icon({
    iconUrl: image,
    iconSize: iconOptions,
    iconAnchor: [10, 11],
  });

  return (
    <>
      { latlng
        ? (
          <Marker position={countyInfo.latlng} icon={marker}>
            <Popup className='request-popup'>
              <div>
                <img
                  src={flag}
                  width='250'
                  height='150'
                  alt='no img'
                />
                <div className='m-2'>
                  {name}
                </div>
                <div className='m-2'>
                  <span>
                    NewConfirmed: {NewConfirmed}
                  </span>
                </div>
                <div className='m-2'>
                  <span>
                    NewDeaths: {NewDeaths}
                  </span>
                </div>
                <div className='m-2'>
                  <span>
                    NewRecovered: { NewRecovered}
                  </span>
                </div>
                <div className='m-2'>
                  <span>
                    TotalConfirmed: { TotalConfirmed}
                  </span>
                </div>
                <div className='m-2'>
                  <span>
                    TotalDeaths:  { TotalDeaths}
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        ) : null }
    </>
  );
};

MarkerComponent.propTypes = {
  countyInfo: PropTypes.shape({
    flag: PropTypes.string,
    latlng: PropTypes.arrayOf(PropTypes.number),
    name: PropTypes.string,

  }),
  covidStat: PropTypes.shape({
    NewConfirmed: PropTypes.number,
    NewDeaths: PropTypes.number,
    NewRecovered: PropTypes.number,
    Slug: PropTypes.string,
    TotalConfirmed: PropTypes.number,
    TotalDeaths: PropTypes.number,
    TotalRecovered: PropTypes.number,
  }),
  averageCalculation: PropTypes.number,
};
MarkerComponent.defaultProps = {
  countyInfo: [],
  covidStat: [],
  averageCalculation: -1,
};

export default MarkerComponent;
