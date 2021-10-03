import './InfoBox.scss';
import { useSelector } from "react-redux";
import { Box, Grid } from "@material-ui/core";
import { styled, createTheme, ThemeProvider } from '@mui/system';
import PropTypes from "prop-types";
import InfoLine from "../InfoLine/InfoLine";
import SideInfo from "../SideInfo/SideInfo";
import MapComponent from "../Map/MapComponent";
import NavTabs from "../Tab/Tabs";

const iconTheme = createTheme({
  components: {
    ItemThemeComponent: {
      styleOverrides: {
        root: {
          color: 'darkslategray',
          backgroundColor: '#0cbcc8ba',
        },
        primary: {
          color: 'darkblue',
          backgroundColor: '#757575ba',
        },
        secondary: {
          color: 'darkred',
          backgroundColor: 'pink',
        },
        firstly: {
          color: 'darkred',
          backgroundColor: '#ffcf337d',
        },
      },
    },
  },
});

const Item = styled('div', {
  shouldForwardProp: (prop) => prop !== 'color',
  name: 'ItemThemeComponent',
  slot: 'Root',
  // We are specifying here how the styleOverrides are being applied based on props
  overridesResolver: (props, styles) => [
    styles.root,
    props.color === 'primary' && styles.primary,
    props.color === 'secondary' && styles.secondary,
    props.color === 'firstly' && styles.firstly,
  ],
})(() => ({
  padding: `20px 5px 30px 5px`,
  textAlign: 'center',
  margin: `0 20px 0 0`,
  borderRadius: `12px`,
  backgroundColor: 'aliceblue',
  boxShadow: '1px 2px 3px 1px #6968687d;',
  fontSize: '20px',
  div: {
    '& > :first-child': {
      fontSize: '30px',
      marginBottom: '10px',
    },
  },
}));

const InfoBox = ({ itemOnFocus }) => {
  const { global, loadingStatusCovidApi, countriesInCovid } = useSelector((state) => state.covid);

  if (loadingStatusCovidApi !== 'idle') {
    return <div> Loading... </div>;
  }

  let countrySelector = true;

  const tempItem = (item, data) => {
    if (item !== false) {
      const selectedCountry = countriesInCovid.find((country) => country.Country === item.name);

      countrySelector = false;

      return (
        <p>{typeof selectedCountry !== 'undefined' ? numberWithCommas(selectedCountry[data]) : 'Not data'} </p>
      );
    }

    return (
      <p>{numberWithCommas(global[data]) }</p>
    );
  };

  const numberWithCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div className='info-box'>
      <ThemeProvider theme={iconTheme}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <Item color='firstly'>
                <div>
                  {tempItem(itemOnFocus, 'TotalConfirmed')}
                  <p>Total Confirmed</p>
                </div>
              </Item>
            </Grid>
            <Grid item xs={3}>
              <Item color='secondary'>
                <div>
                  {tempItem(itemOnFocus, 'NewDeaths')}
                  <p>New Deaths</p>
                </div>
              </Item>
            </Grid>
            <Grid item xs={3}>
              <Item color='primary'>
                <div>
                  {tempItem(itemOnFocus, 'NewConfirmed')}
                  <p>New Confirmed</p>
                </div>
              </Item>
            </Grid>
            <Grid item xs={3}>
              <Item>
                <div>
                  {tempItem(itemOnFocus, 'TotalDeaths')}
                  <p>Total Deaths</p>
                </div>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
      {countrySelector
        ? (
          <>
            <InfoLine itemOnFocus={itemOnFocus} />
            <div className='map-wrapper'>
              <SideInfo />
              <MapComponent itemOnFocus={itemOnFocus} />
            </div>
          </>
        )
        : (
          <>
            <NavTabs />
          </>
        ) }
    </div>
  );
};

InfoBox.propTypes = { itemOnFocus: PropTypes.func };
InfoBox.defaultProps = { itemOnFocus: () => {} };
export default InfoBox;
