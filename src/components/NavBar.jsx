import React from "react";
import * as ReactBootStrap from "react-bootstrap";
import '../../src/App.css';

function NavBar() {
  return (
    <div>
        <ReactBootStrap.Navbar variant="dark">
          <ReactBootStrap.Navbar.Brand href="#home">
              <img
              alt=""
              src="../static/asset1.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              />{' '}
              Notebeans • SFL
          </ReactBootStrap.Navbar.Brand>
        </ReactBootStrap.Navbar>
    </div>
  );
}

export default NavBar;