import { Outlet } from "react-router-dom";
import logo from "../../../../assets/4 3.png";

export default function Authlayout() {
  return (
    <div className="auth-container">
      <div className="container-fluid up_container">
        <div className="row justify-content-center align-items-center vh-100 up ">
          <div className="col-lg-5 bg-white p-5 ">
            <img src={logo} alt="food-logo" className="w-50" />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
