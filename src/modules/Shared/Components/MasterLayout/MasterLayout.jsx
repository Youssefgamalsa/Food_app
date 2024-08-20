import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sideba from "../SideBar/Sidebar";
import { useContext } from "react";
import { Authcontext } from "../../../../Context/Authcontext";


export default function MasterLayout() {
  let{loginData } = useContext(Authcontext);

  return (
   
      <div className="d-flex">
        <div className=" p-0" style={{height:'100vh' }}>
          <Sideba />
        </div>
        <div className="w-100">
          <Navbar loginData={loginData}/>
          <Outlet />
        </div>
     
    </div>
  );
}
