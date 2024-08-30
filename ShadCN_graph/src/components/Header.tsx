// Header.tsx
import React from 'react';
import '../css/Header.css';
import Logo from "../assets/logo.png";

const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="header_title">
        <p>VOICE TRAINING</p>
        </div>
      <div className="user-info">
        <img src={Logo} alt="Decorative background" className="header-right-image" />
      </div>
    </div>
  );
};

export default Header;
