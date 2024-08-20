import Header from "../../../Shared/Components/Header/Header";
import img from "../../../../assets/1.jpg";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Authcontext } from "../../../../Context/Authcontext";
export default function Home() {
  let { loginData } = useContext(Authcontext);
  let navigate = useNavigate();
  return (
    <>
      <Header
        title={"Welcome Upskilling "}
        description={
          "This is a welcoming screen for the entry of the application  you can now see the options"
        }
        imgUrl={img}
      />
      <div>
        <div
          className="d-flex justify-content-between p-5 align-items-center my-2"
          style={{ background: "#F0FFEF" }}
        >
          <div className="header-tile">
            <h4 className="m-2">
              Fill The <span style={{ color: "#009247" }}> Recipe </span>
            </h4>
            <p>
              You can now add your items that any user can order it from the
              Application and you can edit
            </p>
          </div>
          {loginData?.userGroup == "SuperAdmin" ? (
            <Button
              className="btn btn-success"
              onClick={() => navigate("/dashboard/RecipiesData")}
            >
              Fill Recipe <i className="fa fa-arrow-right mx-2" />{" "}
            </Button>
          ) : (
            <Button
              className="btn btn-success"
              onClick={() => navigate("/dashboard/reciepes")}
            >
              View All Recipes <i className="fa fa-arrow-right mx-2" />{" "}
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
