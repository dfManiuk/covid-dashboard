import { Drawer, Icon, Link, List, ListItemIcon } from "@material-ui/core";

const SideNavigation = () => (
  <Drawer>
    <List>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Link key={1} component='nav'>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
      </Link>
    </List>
  </Drawer>
);

export default SideNavigation;
