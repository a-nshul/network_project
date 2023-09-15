import React from 'react';
import logo from './logo.png';

const imageContainerStyle = {
  marginBottom: '20px',
};

const logoImageStyle = {
    width: '100px',
    height: 'auto',
   backgroundColor: 'white',
   marginLeft: '58px'
  };
  

const LogoImage = () => {
  return (
    <div style={imageContainerStyle}>
      <img src={logo} alt="Logo" style={logoImageStyle} />
    </div>
  );
};

export default LogoImage;

