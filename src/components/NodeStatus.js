import React, { Component } from 'react'
import ServerDetail from './ServerDetail'

const style1 = {
  'width': '100%',
  'textAlign': 'center',
  'display': 'inline-block'
};

const style2 = {
  'width': '100%',
  'textAlign': 'center',
  'display': 'inline-block'
}

const style3 = {
  'width': '100%',
  'textAlign': 'center',
  'display': 'inline-block'
}

const style4 = {
  'width': '100%',
  'align': 'center',
  'display': 'inline-block'
}

class NodeSatus extends Component {

  constructor(props) {
    super(props);
    console.log("");
    this.state = {
      open: false,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {

    const nodeURL = this.props.nodeUrl;

    return (
      <div className="NodeStatus">
        <div style={style1}>
          <div style={style2}>
            <a href="#" onClick={this.handleClickOpen}>
              <b>{this.props.nodeName}</b>
            </a>
          </div>
          <div style={style3}>
            <div style={style4}>
              <br/>
              <div data-netdata="system.net"
                data-host={nodeURL}
                data-chart-library="dygraph"
                data-width="35%"
                data-height="150px"
                data-after="-300"
                data-dt-element-name="time202"
              ></div>
              <div data-netdata="system.cpu"
                data-host={nodeURL}
                data-chart-library="dygraph"
                data-width="50%"
                data-height="150px"
                data-after="-300"
                data-dt-element-name="time205"
              ></div>
              <div data-netdata="system.ram"
                data-host={nodeURL}
                data-chart-library="easypiechart"
                data-dimensions="used|buffers|active|wired"
                data-width="10%"
                data-height="150px"
                data-after="-300"
                data-points="-300"
                data-easypiechart-max-value="100"
                data-units="%"
                data-append-options="percentage"
                data-dt-element-name="time601"
              ></div>
            </div>
          </div>
        </div>
        <ServerDetail 
          nodeURL={nodeURL}
          open={this.state.open}
          onClose={this.handleClose}></ServerDetail>
      </div>
    )
  }
}

export default NodeSatus