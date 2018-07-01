import React, { Component, Fragment } from 'react';
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
          <a className="nav-bar-button" title="Analyse" onClick={this.analyse.bind(this)}><FaBarChart/></a>
        </div>
        <Router>
          <div className="page">
            <Route path="/" exact>
              <div className="snap-your-meal">
                <h2>Snap your meal to see if it's</h2>
                <div className="thumbs-up-or-down">
                  <FaThumbsUp className="thumbs-up"/>
                  <div className="thumbs-or">Or</div>
                  <FaThumbsDown className="thumbs-down"/>
                </div>
              </div>
            </Route>
            <label className="image-placeholder" style={this.imageWrapperStyle()}>
              {this.imageUploader()}
            </label>
          </div>
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
    return <Fragment>
      <input type="file" onInput={this.imageChosen.bind(this)}/>
      <FaUpload/>
    </Fragment>;
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
  async analyse() {
    console.log('sent')
    console.log(await visionApi(this.state.imageFile))
  }
}

export default App;


function encodeBase64(file){
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      const base64 = dataUrl.split(',').pop();
      resolve(base64);
    };
    reader.readAsDataURL(file);
  });
}
async function visionApi(file){
  const API_KEY = 'AIzaSyCBIGRgOtzjIXxjRTCjUXqu92sSJy0ol8c';
  const encoded = await encodeBase64(file);
  console.log(encoded)
  const response = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`, {
    method: 'POST',
    cors: true,
    body: JSON.stringify({
      requests: [
        {
          image: {
            content: encoded,
          },
          features: [
            { type: 'LABEL_DETECTION' },
          ],
        },
      ],
    }),
  });
  return response.json();
}
