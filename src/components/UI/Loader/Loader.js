import React from 'react';

import loaderImage from '../../../assets/images/loading_brown.gif';
import classes from './Loader.module.css';

const loader = (props) => (
  <div className={classes.Loader}>
    <img src={loaderImage} alt='loading...' />
  </div>
);

export default loader;
