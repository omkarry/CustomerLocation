import { AppContext } from "../../App";
import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "../../Assets/styles/css/Header.css"
import Sidebar from "../Sidebar/Sidebar";

function Header() {
  const { profile } = React.useContext(AppContext);

  return (
    <header className="p-3 mb-3 border-bottom">
      <div className="container-fluid">
        <div className="d-flex flex-wrap align-items-center justify-content-between justify-content-lg-between">
          <Sidebar />
          <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
          <span className="fs-4">Customer</span>
          </a>

          <div className="dropdown text-end">
            <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
            </a>
            <ul className="dropdown-menu text-small">
              <li><a className="dropdown-item" href="#">{profile.name}</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#">Sign out</a></li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header