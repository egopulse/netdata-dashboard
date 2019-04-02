import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import NodeStatus from './NodeStatus'

class CoursesList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      ...props,
    }
  }

  render() {
    return (
      <div>
        <Grid container spacing={24}>
          {
            this.props.servers.map(server => {
              console.log(server)
              return (
                <Grid key={server.address} item xs={12} >
                  <NodeStatus
                    nodeUrl={server.address}
                    nodeName={server.name ? server.name : server.address}></NodeStatus>
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
export default CoursesList;