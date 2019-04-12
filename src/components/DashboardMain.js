import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import NodeStatus from './NodeStatus'

class DashboardMain extends Component {

  constructor(props) {
    super(props)
    console.log(props)
    // this.state = {
    //   ...props,
    // }
  }

  render() {
    const nodeUrl = `${this.props.baseUrl}host/`
    return (
      <div>
        <Grid container spacing={24}>
          {
            this.props.servers.map((server, i) => {
              console.log(server)
              return (
                <Grid key={i} item xs={12} >
                  <NodeStatus
                    nodeUrl={`${nodeUrl}${server}/`}
                    nodeName={server}></NodeStatus>
                </Grid>
              )
            })
          }


          {/* <Grid item xs={6}>
            <NodeStatus nodeUrl="http://192.168.99.101:19999" nodeName="host-1"></NodeStatus>
          </Grid> */}
          {/* <Grid item xs={6}>
            <NodeStatus nodeUrl="http://192.168.99.100:19999" nodeName="master-server"></NodeStatus>
          </Grid>
          <Grid item xs={6}>
            <NodeStatus nodeUrl="http://192.168.99.101:19999" nodeName="host-1"></NodeStatus>
          </Grid> */}
        </Grid>
      </div >
    )
  }
}

DashboardMain.propTypes = {
  baseUrl: PropTypes.string,
  servers: PropTypes.array
}

export default DashboardMain;