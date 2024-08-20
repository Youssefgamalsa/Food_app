import { useContext } from "react";
import { Authcontext } from "../../../../Context/Authcontext";

export default function Navbar() {
  let { loginData } = useContext(Authcontext);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item ms-auto">{loginData?.userName}</li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
