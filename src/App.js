import React, { Component } from 'react';
import './App.css';
import Fileupload from './pages/FileUpload';
import Imagegallery from './pages/ImageGalerry';
export const APIURL = 'https://ekspress.herokuapp.com';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Fileupload />
        <Imagegallery />
      </div>
    );
  }
}

export default App;
