import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  card: {
    width: "100%",
    height: "100%",
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
};


class ServerDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleClose = () => {
    this.props.onClose();
  };

  render() {
    return (
      <div>
        <Dialog
          fullScreen
          open={this.props.open}
          onClose={this.handleClose}
        >
          <AppBar className={""}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Card className={"classes.card"} style={styles.card}>
            <CardMedia component="iframe"
              height="100%"
              src={this.props.nodeURL}
            />
          </Card>
        </Dialog>
      </div>
    )
  }
}

export default ServerDetail