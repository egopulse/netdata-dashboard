import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar'
import DashboardMain from './components/DashboardMain'
import config from 'Config'
console.log(config)

const SERVER_KEY = "servers"
const RESET_KEY = "reset"

/**
 * ["http://192.168.99.100:19999"]
 */
function getServers() {
  const serverString = localStorage.getItem(SERVER_KEY);
  const flag = localStorage.getItem(RESET_KEY);

  if (!flag) {
    return config.clusters ? config.clusters[0].servers : [];
  }
  if (!!flag && !!serverString) {
    return JSON.parse(serverString);
  }
  return [];
}

function saveServers(serverData) {
  localStorage.setItem(SERVER_KEY, JSON.stringify(serverData));
  localStorage.setItem(RESET_KEY, "updated");
}

function resetFlag() {
  localStorage.removeItem(RESET_KEY)
}

class App extends Component {

  constructor() {
    super()
    this.state = {
      servers: getServers()
    };
    this.onSeverListUpdated = this.onSeverListUpdated.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  onSeverListUpdated = (serverData) => {
    saveServers(serverData)
    this.setState({ servers: serverData });
    window.location.reload();
    // window.NETDATA.start();
  }

  onReset = () => {
    resetFlag();
    window.location.reload();
  }

  render() {
    return (
      <div>
        <NavBar servers={this.state.servers}
          onReset={this.onReset}
          onSeverListUpdated={this.onSeverListUpdated}></NavBar>
        <DashboardMain servers={this.state.servers}></DashboardMain>
      </div>
    );
  }
}

export default App;
