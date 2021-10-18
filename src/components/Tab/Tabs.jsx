import * as React from 'react';
import { Box, CircularProgress, Tab, Tabs, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ProjectApi from "../../core/api/covidApi/provider";
import LineChart from "../Chart/LineChart";

function LinkTab(props) {
  return (
    <Tab
      component='a'
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component='span'
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    fontSize: '30px',
    textAlign: 'center',
    margin: `20px 20px 0 0`,
  },
}));

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number,
  value: PropTypes.number,
};
TabPanel.defaultProps = {
  children: {},
  index: -1,
  value: -1,
};

const NavTabs = ({ itemOnFocus }) => {
  const [value, setValue] = useState(0);
  const { countriesInCovid } = useSelector((state) => state.covid);
  const [countyCovid, setCountryCovid] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();

  const infoAboutCountry = countriesInCovid.find((item) => item.Country === itemOnFocus.name);

  useEffect(() => {
    if (typeof infoAboutCountry === 'undefined') {
      setIsLoading(false);
    } else {
      ProjectApi.getCovidInfoFromCountry(
        infoAboutCountry.Country,
        '2021-04-01',
        infoAboutCountry.Date.substr(0, 10),
      ).then((responseData) => {
        setCountryCovid(responseData);

        setIsLoading(true);
      }).catch(() => setIsLoading(false));
    }
  }, [itemOnFocus]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label='nav tabs example'>
        <LinkTab label='Infected VS Recovered' />
        <LinkTab label='Death' />
        <LinkTab label='Active' />
      </Tabs>
      {isLoading && infoAboutCountry?.TotalConfirmed !== undefined ? (
        <>
          <TabPanel value={value} index={0}>
            <LineChart
              lineOne={infoAboutCountry.TotalConfirmed}
              lineTwo={infoAboutCountry.TotalRecovered}
              countyCovid={countyCovid}
              typeOfLine='Infected vs Recovered'
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <LineChart
              lineOne={infoAboutCountry.TotalDeaths}
              countyCovid={countyCovid}
              typeOfLine='Death'
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <LineChart
              lineOne={infoAboutCountry.TotalDeaths}
              countyCovid={countyCovid}
              typeOfLine='Active'
            />
          </TabPanel>
        </>
      ) : <p className={classes.root}> {isLoading ? (<CircularProgress />) : 'Not found data for this country. Try later...'}</p> }
    </Box>
  );
};

NavTabs.propTypes = { itemOnFocus: PropTypes.shape({ name: PropTypes.string }) };
NavTabs.defaultProps = { itemOnFocus: () => {} };

export default NavTabs;
