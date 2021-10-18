import PropTypes from "prop-types";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import { styled } from '@mui/system';
import * as React from "react";
import Icon from "../Icon/Icon";

const CountryInfoStylComponent = styled('div')({
  width: '60px',
  height: '60px',
  color: 'darkslategray',
  padding: 8,
  '& > :first-of-type': {
    width: '60px',
    height: '60px',
  },
});

const CountryInfoItemText = ({ children }) => (
  <div style={{
    color: '#757575',
    fontSize: '20px',
    fontWeight: '600',
    textShadow: ' #9e9e9e 1px 0 2px',
  }}
  >{children}
  </div>
);

CountryInfoItemText.propTypes = { children: PropTypes.string };
CountryInfoItemText.defaultProps = { children: '' };

const CountryInfo = ({ countryPosition }) => (
  <div className='country-info'>
    <List sx={{ width: '100%', maxWidth: 360 }}>
      <ListItem>
        <ListItemAvatar>
          <CountryInfoStylComponent>
            <Avatar>
              <Icon status='death' />
            </Avatar>
          </CountryInfoStylComponent>
        </ListItemAvatar>
        <ListItemText
          primary={<CountryInfoItemText>Total Death</CountryInfoItemText>}
          secondary={countryPosition.TotalDeaths}
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <CountryInfoStylComponent>
            <Avatar>
              <Icon status='confirmed' />
            </Avatar>
          </CountryInfoStylComponent>
        </ListItemAvatar>
        <ListItemText
          primary={<CountryInfoItemText>Total Confirmed</CountryInfoItemText>}
          secondary={countryPosition.TotalConfirmed}
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <CountryInfoStylComponent>
            <Avatar>
              <Icon status='recovered' />
            </Avatar>
          </CountryInfoStylComponent>
        </ListItemAvatar>
        <ListItemText
          primary={<CountryInfoItemText>Total Recovered</CountryInfoItemText>}
          secondary={countryPosition.TotalRecovered}
        />
      </ListItem>
    </List>
  </div>
);

CountryInfo.propTypes = {
  countryPosition: PropTypes.shape({
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
  }),
};
CountryInfo.defaultProps = {
  countryPosition: {
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

export default CountryInfo;
