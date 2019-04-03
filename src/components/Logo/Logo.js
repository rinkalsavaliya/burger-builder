import React from 'react';

import logoImage from '../../assets/images/logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={logoImage} alt="MyBurger" />
    </div>
);

export default logo;
