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
  itemOnFocus: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      flag: PropTypes.string,
      name: PropTypes.string,
    }),
  ]),

};
Header.defaultProps = {
  itemOnFocus: {
    flag: "No data found",
    name: "No data found",
  },
};

export default Header;
