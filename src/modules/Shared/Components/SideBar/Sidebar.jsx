import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import img from "../../../../assets/3.png";
import { useContext, useState } from "react";
import "../../../../App.css";
import { Authcontext } from "../../../../Context/Authcontext";
export default function Sideba() {
  let { loginData } = useContext(Authcontext);

  const [iscollapse, setIscollapse] = useState(false);
  let hide_collapse = () => {
    setIscollapse(!iscollapse);
  };
  return (
    <Sidebar collapsed={iscollapse} className="sidebar_collapse">
      <Menu className="p-0">
        <MenuItem
          style={{ width: "80%", margin: "20px auto", padding: "5px 20px" }}
          onClick={hide_collapse}
          icon={<img src={img} alt="logo-img" />}
        ></MenuItem>
        <MenuItem
          icon={<i className="fa fa-home" />}
          component={<Link to="/dashboard" />}
        >
          Home
        </MenuItem>

        {loginData?.userGroup == "SuperAdmin" ? (
          <MenuItem
            icon={<i className="fa-solid fa-users"></i>}
            component={<Link to="users" />}
          >
            Users
          </MenuItem>
        ) : (
          ""
        )}
        {loginData?.userGroup != "SuperAdmin" ? (
          <MenuItem
            icon={<i className="fa-solid fa-heart"></i>}
            component={<Link to="favourites" />}
          >
            favourites
          </MenuItem>
        ) : (
          ""
        )}

        <MenuItem
          icon={<i className="fa-solid fa-house"></i>}
          component={<Link to="reciepes" />}
        >
          {" "}
          Recipes{" "}
        </MenuItem>
        {loginData?.userGroup == "SuperAdmin" ? (
          <MenuItem
            icon={<i className="fa-solid fa-list"></i>}
            component={<Link to="categories" />}
          >
            categories
          </MenuItem>
        ) : (
          ""
        )}
        {loginData?.userGroup == "SuperAdmin" ? (
          <MenuItem
            icon={<i className="fa-solid fa-arrow-right"></i>}
            component={<Link to="/forgetpass" />}
          >
            Logout{" "}
          </MenuItem>
        ) : (
          ""
        )}
      </Menu>
    </Sidebar>
  );
}
