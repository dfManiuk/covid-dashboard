import './Header.scss';
import { Search } from "@material-ui/icons";

const Header = () => (
  <div className='header'>
    <div className='header-center_box'>
      <p>Coronavirus </p>
      <p>Home Screen</p>
    </div>
    <div className='header-right_box'>
      <div className='header-search'>
        <Search className='header-search__icon' />
      </div>
    </div>
  </div>
);

export default Header;
