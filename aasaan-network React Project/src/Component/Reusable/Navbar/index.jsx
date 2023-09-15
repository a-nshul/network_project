import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import LogoImage from "../../../static/image/logoImage"; // Update this import path
import { message } from 'antd';
const navbarStyle = {
  backgroundColor: '#e0e0e0', // Set the background color of the navbar to #e0e0e0
  padding: '10px', // Adjust the padding as needed
};

const buttonStyle = {
  backgroundColor: 'black',
  color: 'white', // Set the text color to white
};

const logout = () => {
  // window.location.reload();
  message.error("We can't logging out now. will come very soon! ");
};
const NavBar = () => {
  return (
    <div style={navbarStyle}>
      <nav>
        <div>
          <a>
            <LogoImage />
          </a>
          <div style={{ position: 'relative' }}>
            <Dropdown style={{ position: 'absolute', top: '-50px', right: '30px' }}>
              <Dropdown.Toggle style={buttonStyle}>
                <i className="fa fa-user" aria-hidden="true"></i>
              </Dropdown.Toggle>
              {/* <hr className="full-line" /> */}
              <Dropdown.Menu>
                <Dropdown.Item href="#"onClick={logout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
