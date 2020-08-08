import React from 'react';
import { APIURL } from '../App';

function parseUrl(url) {
  let newurl = APIURL + url.substring(url.indexOf('/photos/'));
  return newurl;
}

const Imagefigure = (props) => {
  var handleDelete = (image) => {
    if (window.confirm('Are you sure you want to delete ' + image.name + '?')) {
      props.deleteImage(image.album, image.name);
    }
  };

  return (
    <figure>
      <img src={parseUrl(props.image.raw)} alt={props.image.name}></img>
      <span
        className="remove-image"
        onClick={() => handleDelete(props.image)}
        href="#"
      >
        &#215;
      </span>
      <figcaption>
        <strong>{props.image.album}</strong>
      </figcaption>
      <figcaption>{props.image.name}</figcaption>
    </figure>
  );
};

export default Imagefigure;
