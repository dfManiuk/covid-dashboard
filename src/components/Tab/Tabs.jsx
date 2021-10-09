import * as React from 'react';
import { Box, Tab, Tabs, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import LineChart from "../Chart/LineChart";
import ProjectApi from "../../core/api/covidApi/provider";

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
      component='div'
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

  const infoAboutCountry = countriesInCovid.find((item) => item.Country === itemOnFocus.name);

  useEffect(() => {
    ProjectApi.getCovidInfoFromCountry(
      infoAboutCountry.Country,
      '2021-08-01',
      infoAboutCountry.Date.substr(0, 10),
    ).then((responseData) => {
      setCountryCovid(responseData);

      setIsLoading(true);
    });
  }, [itemOnFocus]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(countyCovid);

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label='nav tabs example'>
        <LinkTab label='Infected VS Recovered' />
        <LinkTab label='Page Two' />
        <LinkTab label='Page Three' />
      </Tabs>
      {isLoading ? (
        <TabPanel value={value} index={0}>
          <LineChart
            lineOne={infoAboutCountry.TotalConfirmed}
            lineTwo={infoAboutCountry.TotalRecovered}
            countyCovid={countyCovid}
          />
        </TabPanel>
      ) : <p> Load...</p>}
    </Box>
  );
};

NavTabs.propTypes = { itemOnFocus: PropTypes.func };
NavTabs.defaultProps = { itemOnFocus: () => {} };
export default NavTabs;
