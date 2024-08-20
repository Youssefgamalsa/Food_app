import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Authcontext } from "../../../../Context/Authcontext";

export default function ProtectedRoutes({ children }) {
  let { loginData } = useContext(Authcontext);
  if (localStorage.getItem("token") || loginData) return children;
  else return <Navigate to={"/login"} />;
}
