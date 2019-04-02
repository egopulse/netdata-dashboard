import React, { Component } from 'react'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

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
    };
    this.handleChange = this.handleChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.onServerUpdated = this.onServerUpdated.bind(this);
  }

  onServerUpdated = (serverData) => {
    this.props.onSeverListUpdated(serverData);
  }

  handleDelete = node => () => {
    if (!!node.address) {
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
          const nodeToAdd = { address: nodeAddress };
          serverData.push(nodeToAdd);
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
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <div>
              <Typography className={classes.title} variant="h4" color="inherit" noWrap>
                <a href={'#'} onClick={()=>this.props.onReset()}>
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
              {this.state.servers.map(s => {
                return (
                  <Chip
                    key={s.address}
                    label={s.address}
                    onDelete={this.handleDelete(s)}
                    className={classes.chip}
                  />
                );
              })}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
