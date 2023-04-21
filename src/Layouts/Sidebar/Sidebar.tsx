import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "../../Assets/styles/css/Sidebar.css"
import { Link } from "react-router-dom";


function Sidebar() {
  return (
    <div>
      <button className="btn btn-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
        </svg>
      </button>

      <div className="offcanvas offcanvas-start text-bg-dark min-vw-25" tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header">
          <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <svg className="bi pe-none me-2" width="40" height="32"></svg>
            <span className="fs-4">Customer</span>
          </a>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <hr />
        <div className="offcanvas-body">
          <div className="d-flex flex-column flex-shrink-0 px-5 py-3">
            <ul className="nav nav-pills flex-column mb-auto">
              <li className="h4">
                <Link to="/" className="nav-link text-white">
                  Dashboard
                </Link>
              </li>
              <li className="px-2 h5">
                <button className="btn btn-toggle d-inline-flex align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
                  <div className="h4">Customer</div>
                </button>
                <div className="collapse" id="orders-collapse">
                  <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    <li><Link to="/AddCustomer" className="nav-link link-body-emphasis d-inline-flex text-decoration-none rounded">Add Customer</Link></li>
                    <li><Link to="/ViewCustomer" className="nav-link link-body-emphasis d-inline-flex text-decoration-none rounded">View Customers</Link></li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar