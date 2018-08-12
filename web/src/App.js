import React, { Component } from 'react';
import Navbar from './Navbar/Navbar.js'
import Main from './Main.js'

class App extends Component {
  
  constructor(){
    super();
    this.state = {};
  }
  
  /**
   * Main component which is subdivided in 2 main components.
   * @returns {*}
   */
  render() {
    return (
      <div>
        <Navbar />
        <Main />
      </div>
    );
  }
}

export default App;
