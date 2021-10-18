import './SidePanel.scss';
import { Box, Collapse, ListItem, ListItemText, MenuItem, MenuList } from "@material-ui/core";
import { useState } from "react";
import { FixedSizeList } from "react-window";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import Portal from "../Portal/Portal";

const MODAL_SELECTOR = '#root';

const useStyles = makeStyles(() => ({
  listSize: {
    "&::-webkit-scrollbar": { width: 7 },
    "&::-webkit-scrollbar-track": { boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)` },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "darkgrey",
      outline: `1px solid slategrey`,
    },
  },
  listItem: {
    "&:hover": {
      backgroundColor: "slategrey",
      color: "white",
      "& .MuiListItemIcon-root": { color: "white" },
    },
  },
}));

const SidePanel = ({ handleItemClick, handleClickMainPage, handleClickCountries }) => {
  const [open, setOpen] = useState(true);
  const { countriesInfo } = useSelector((state) => state.covid);
  const classes = useStyles();

  const handleClick = () => {
    setOpen(!open);
  };

  const renderRow = () => countriesInfo.map((item) => (
    <ListItem className={`${classes.listItem}`} key={Math.random().toString()} onClick={() => handleItemClick(item)}>
      <ListItemText className='side-panel__list__item' primary={`${item.name}`} />
    </ListItem>
  ));

  const panelBody = (
    <div className='side-panel__content'>
      <div className='side-panel__ref'>
        <div className='side-panel__global'>
          <p>COVID - 2019</p>
          <MenuList>
            <MenuItem onClick={handleClickMainPage}>World wide</MenuItem>
            <MenuItem onClick={handleClick}>Country wide
              {!open
                ? <ExpandLess className='side-panel__expand' />
                : <ExpandMore className='side-panel__expand' />}
            </MenuItem>
            <Collapse in={!open} timeout='auto' unmountOnExit>
              <Box
                sx={{ width: '100%', height: 400, maxWidth: 240 }}
                className='side-panel__box'
              >
                <FixedSizeList
                  className={`${classes.listSize} side-panel__list scrollbar-thin`}
                  height={400}
                  width={240}
                  itemSize={46}
                  itemCount={1}
                  overscanCount={1}
                >
                  {renderRow}
                </FixedSizeList>
              </Box>
            </Collapse>
            <MenuItem onClick={handleClickCountries}>Countries</MenuItem>
          </MenuList>
        </div>
      </div>
    </div>
  );

  return (Portal(
    panelBody, MODAL_SELECTOR,
  ));
};

export default SidePanel;
