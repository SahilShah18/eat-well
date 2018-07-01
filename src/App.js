import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import FaUpload from 'react-icons/lib/fa/upload';
import FaBarChart from 'react-icons/lib/fa/bar-chart';
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up';
import FaThumbsDown from 'react-icons/lib/fa/thumbs-down';

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
            <div className="page snap-your-meal">
              <h2>Snap your meal to see if it's</h2>
              <div className="thumbs-up-or-down">
                <FaThumbsUp className="thumbs-up"/>
                <div className="thumbs-or">Or</div>
                <FaThumbsDown className="thumbs-down"/>
              </div>
              <label className="image-placeholder" style={this.imageWrapperStyle()}>
                {this.imageUploader()}
              </label>
            </div>
          </Route>
        </Router>
      </div>
    );
  }
  constructor(props) {
    super(props);
    this.state = {
      imageFile: null,
      imageObjectUrl: null,
    };
  }
  imageUploader(){
    if(this.state.imageFile){
      return;
    }
    return [
      <input type="file" onInput={this.imageChosen.bind(this)}/>,
      <FaUpload/>,
    ];
  }
  imageChosen(event) {
    const imageFile = event.target.files[0];
    this.setState({
      imageFile,
      imageObjectUrl: URL.createObjectURL(imageFile),
    });
  }
  imageWrapperStyle() {
    if(!this.state.imageFile){
      return;
    }
    return {
      backgroundImage: `url(${this.state.imageObjectUrl})`,
    };
  }
}

export default App;
