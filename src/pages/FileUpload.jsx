import React, { Component } from 'react';
import axios from 'axios';

class Fileupload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      selectValue: 'DEFAULT',
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault(); // Stop form submit
    if (!this.state.file) {
      alert('Please upload a image file');
    } else if (this.state.selectValue === 'DEFAULT') {
      alert('Please select album to upload to');
    } else {
      this.fileUpload(this.state.file, this.state.selectValue).then(
        (response) => {
          if (response.data.message === 'OK') {
            this.setState({
              file: null,
              selectValue: 'DEFAULT',
            });
            alert('File Uploaded');
          }
        }
      );
    }
  }
  onFileChange(e) {
    this.setState({ file: e.target.files[0] });
  }
  fileUpload(file, album) {
    const url = 'http://localhost:8888/photos';
    const formData = new FormData();
    formData.append('album', album);
    formData.append('documents', file);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    return axios.put(url, formData, config);
  }
  onSelectChange(e) {
    this.setState({ selectValue: e.target.value });
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h1>Image Upload</h1>
        <input type="file" onChange={this.onFileChange} accept="image/*" />
        <select
          id="lang"
          onChange={this.onSelectChange}
          value={this.state.selectValue}
        >
          <option disabled value="DEFAULT">
            {' '}
            -- select an album --{' '}
          </option>
          <option value="Travel">Travel</option>
          <option value="Personal">Personal</option>
          <option value="Food">Food</option>
          <option value="Nature">Nature</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit">Upload</button>
      </form>
    );
  }
}

export default Fileupload;
