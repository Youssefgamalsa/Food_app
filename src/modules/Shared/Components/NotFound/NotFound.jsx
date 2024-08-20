import "../../../../App.css";
import logo from "../../../../assets/Group (1).svg";
import img from "../../../../assets/5.png";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="notFound ">
      <div className="logo mb-5">
        <img src={logo} alt="" />
      </div>
      <div className="content">
        <div className="text">
          <h2> Oops </h2>
          <h4> Page not found </h4>
          <p className="mb-4">
            This Page doesn’t exist or was removed! We suggest you back to home.
          </p>
          <Link to={'dashboard'} className="btn btn-success" style={{ padding: "10px 90px ", fontWeight:'700' , fontSize:'16px' }}>
            <i
              className="fa-solid fa-arrow-left d-inline-block "
              style={{ margin: "0px 10px ", width:'19.01px' }}
            ></i>{" "}
            Back to <br /> Home 
          </Link>
        </div>
        <div className="image">
          <img src={img} style={{ width: "90%" }} alt="img " />
        </div>
      </div>
    </div>
  );
}
