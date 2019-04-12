import React, { Component } from 'react'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Filter1 from '@material-ui/icons/Filter1';
import Filter2 from '@material-ui/icons/Filter2';
import Filter3 from '@material-ui/icons/Filter3';
import Filter4 from '@material-ui/icons/Filter4';
import Filter5 from '@material-ui/icons/Filter5';


const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    minWidth: "180px",
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
    fontSize: ".8em",
    marginLeft: 0,
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  chip: {
    margin: theme.spacing.unit - 5,
    fontSize: ".8em",
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ...props,
      nodeAddress: "",
      open: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.onServerUpdated = this.onServerUpdated.bind(this);
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  onServerUpdated = (serverData) => {
    this.props.onSeverListUpdated(serverData);
  }

  getIcon = (index) => {
    const value = index + 1;
    if (value % 2 === 0) {
      return <Filter2 />
    } else if (value % 3 === 0) {
      return <Filter3 />
    } else if (value % 4 === 0) {
      return <Filter4 />
    } else if (value % 5 === 0) {
      return <Filter5 />
    }
    return <Filter1 />
  }

  handleDelete = node => () => {
    if (!!node) {
      this.setState(state => {
        const serverData = [...state.servers];
        const nodeToDelete = serverData.indexOf(node);
        serverData.splice(nodeToDelete, 1);
        this.onServerUpdated(serverData);
        return { servers: serverData };
      });
    }
  };

  handleChange(event) {
    this.setState({ nodeAddress: event.target.value });
  }

  keyPress = (e) => {
    if (e.keyCode === 13 || e.key === "Enter") {
      const nodeAddress = e.target.value;
      if (!!nodeAddress) {
        this.setState(state => {
          const serverData = [...state.servers];
          // const nodeToAdd = { address: nodeAddress };
          serverData.push(nodeAddress);
          this.onServerUpdated(serverData);
          return {
            nodeAddress: "",
            servers: serverData
          };
        });

      }
    }
  }

  render() {
    const { classes, clusters } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <div>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
              // className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
            </div>
            <div>
              <Typography className={classes.title} variant="h5" color="inherit" noWrap>
                <a href='#' onClick={() => this.props.onReset()}>
                  Monitoring Dashboard
              </a>
              </Typography>
            </div>
            <div className={classes.search}>
              <InputBase
                placeholder="node-address"
                value={this.state.nodeAddress}
                onChange={this.handleChange}
                onKeyPress={this.keyPress}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            <div>
              {this.state.servers.map((s, i) => {
                return (
                  <Chip
                    key={i}
                    label={s}
                    onDelete={this.handleDelete(s)}
                    className={classes.chip}
                  />
                );
              })}
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}>
          <div>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {
              clusters.map((item, index) => (
                <ListItem button key={item.name} onClick={() => this.props.onClusterSelected(item)}>
                  <ListItemIcon>{this.getIcon(index)}</ListItemIcon>
                  {item.name}
                </ListItem>
              ))
            }
          </List>
        </Drawer>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
