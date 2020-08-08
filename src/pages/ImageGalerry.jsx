import React, { Component } from 'react';
import axios from 'axios';
import Imagefigure from '../components/ImageFigure';
import { APIURL } from '../App.js';
import './ImageGallery.css';
import Aux from '../components/Auxiliary';

class Imagegallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      currentPage: 1,
      pageLimit: 10,
      imageCount: 15,
    };
  }

  componentDidMount() {
    this.getImages();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.currentPage !== this.state.currentPage ||
      prevState.pageLimit !== this.state.pageLimit
    ) {
      this.getImages();
    }
  }

  getImages() {
    const data = {
      skip: (this.state.currentPage - 1) * this.state.pageLimit,
      limit: this.state.pageLimit,
    };
    axios
      .post(APIURL + `/photos/list`, data)
      .then((res) => {
        this.setState({
          images: res.data.documents,
          imageCount: res.data.count,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteImage(album, filename) {
    axios
      .delete(APIURL + `/photos/` + album.toLowerCase() + '/' + filename, {})
      .then((res) => {
        if (res.data.message === 'OK') {
          console.log('Delete OK');
          this.getImages();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handlePageChange(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  handleLimitChange(event) {
    this.setState({
      currentPage: 1,
      pageLimit: Number(event.target.value),
    });
  }

  render() {
    const { imageCount, pageLimit } = this.state;

    //displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(imageCount / pageLimit); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number) => {
      return (
        <li
          className={`${this.state.currentPage === number ? 'active' : ''}`}
          key={number}
          id={number}
          onClick={this.handlePageChange.bind(this)}
        >
          {number}
        </li>
      );
    });

    //displaying page limit selector
    const pageLimitSelect = (
      <div className="pagelimit">
        Show &nbsp;
        <select
          id="pageLimit"
          onChange={this.handleLimitChange.bind(this)}
          value={this.state.pageLimit}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="250">250</option>
          <option value="500">500</option>
        </select>
        &nbsp; images
      </div>
    );

    return (
      <Aux>
        <h1>Image Gallery</h1>
        {pageLimitSelect}
        <div className="imagegallery">
          {this.state.images.map((image) => (
            <Imagefigure
              image={image}
              key={image.id}
              deleteImage={this.deleteImage.bind(this)}
            />
          ))}
        </div>
        <ul id="page-numbers">{renderPageNumbers}</ul>
      </Aux>
    );
  }
}

export default Imagegallery;
