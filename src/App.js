import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import FaUpload from 'react-icons/lib/fa/upload';
import FaBarChart from 'react-icons/lib/fa/bar-chart';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="nav-bar">
          <h1 className="nav-bar-logo">EatWell</h1>
          <a className="nav-bar-button" title="Upload"><FaUpload/></a>
          <a className="nav-bar-button" title="Analyse"><FaBarChart/></a>
        </div>
        <Router>
          <Route path="/" exact>
            <div>
            </div>
          </Route>
        </Router>
      </div>
    );
  }
}

export default App;
