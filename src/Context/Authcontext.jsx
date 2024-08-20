import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const Authcontext = createContext();

export default function AuthcontextProvier({children}) {
  const [loginData, setLoginData] = useState(
    JSON.parse(localStorage.getItem("loginData"))
  );
  let saveData = () => {
    let decode_token = localStorage.getItem("token");
    let encode_token = jwtDecode(decode_token);
    setLoginData(encode_token);
    localStorage.setItem("loginData", JSON.stringify(loginData));
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {

      saveData();
    }
  },[]);
  return (
    <Authcontext.Provider value={{ loginData, saveData }}>
      {children}
    </Authcontext.Provider>
  );
}
