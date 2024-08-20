import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Authlayout from "./modules/Shared/Components/Autholayout/Authlayout";
import NotFound from "./modules/Shared/Components/NotFound/NotFound";
import Login from "./modules/Authentication/components/Login/Login";
import Register from "./modules/Authentication/components/Register/Register";
import ResetPass from "./modules/Authentication/components/ResetPass/ResetPass";
import ForgetPass from "./modules/Authentication/components/ForgetPass/ForgetPass";
import MasterLayout from "./modules/Shared/Components/MasterLayout/MasterLayout";
import Home from "./modules/Home/components/Home/Home";
import CategoriesList from "./modules/Categories/components/CategoriesList/CategoriesList";
import RecipesList from "./modules/Recipes/Components/RecipesList/RecipesList";
import Users from "./modules/Users/Components/User/Users";
import { ToastContainer } from "react-toastify";
import ProtectedRoutes from "./modules/Shared/Components/ProtectedRoutes/ProtectedRoutes";
import RecipiesData from "./modules/Recipes/Components/RecipiesData/RecipiesData";
import Verify_Acount from "./modules/Authentication/components/Verify_Account/Verify_Acount";
// import { useContext, useEffect } from "react";
// import { Authcontext } from "./Context/Authcontext";
import FavouriteeList from "./modules/Recipes/Components/FavouriteList/FavouriteeList";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Authlayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "resetpass", element: <ResetPass /> },
        { path: "forgetpass", element: <ForgetPass /> },
        { path: "verify-account", element: <Verify_Acount /> },
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoutes>
          {" "}
          <MasterLayout />{" "}
        </ProtectedRoutes>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "categories", element: <CategoriesList /> },
        { path: "reciepes", element: <RecipesList /> },
        { path: "favourites", element: <FavouriteeList /> },
        { path: "users", element: <Users /> },
        { path: "RecipiesData", element: <RecipiesData /> },
      ],
    },
  ]);
 
  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
