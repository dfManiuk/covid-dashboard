import './Header.scss';
import { Search } from "@material-ui/icons";
import PropTypes from "prop-types";
import React from "react";

const Header = ({ itemOnFocus }) => (
  <div className='header'>
    <div className='header-center_box'>
      {itemOnFocus === false
        ? (
          <div>
            <p>Coronavirus</p>
            <p>Home Screen</p>
          </div>
        )
        : (
          <div className='header-center_country'>
            <img
              src={itemOnFocus.flag}
              width='50'
              height='50'
              alt='no img'
            />
            <p> {itemOnFocus.name} </p>
          </div>
        )}
    </div>
    <div className='header-right_box'>
      <div className='header-search'>
        <Search className='header-search__icon' />
      </div>
    </div>
  </div>
);

Header.propTypes = {
  itemOnFocus: PropTypes.arrayOf(PropTypes.shape({
    Country: PropTypes.string,
    CountryCode: PropTypes.string,
    Date: PropTypes.string,
    ID: PropTypes.string,
    NewConfirmed: PropTypes.number,
    NewDeaths: PropTypes.number,
    NewRecovered: PropTypes.number,
    Slug: PropTypes.string,
    TotalConfirmed: PropTypes.number,
    TotalDeaths: PropTypes.number,
    TotalRecovered: PropTypes.number,
  })),
};
Header.defaultProps = {
  itemOnFocus: {
    Country: "No data found",
    CountryCode: "No data found",
    Date: "0000-00-00T00:00:00.0000",
    ID: "d3d0ea12-0612-4e13-9b00-fe9cd35b3b24",
    NewConfirmed: -1,
    NewDeaths: -1,
    NewRecovered: -1,
    Slug: "No data found",
    TotalConfirmed: -1,
    TotalDeaths: -1,
    TotalRecovered: -1,
  },
};

export default Header;
