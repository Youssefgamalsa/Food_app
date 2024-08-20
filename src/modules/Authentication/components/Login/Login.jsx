import { Link, useNavigate } from "react-router-dom";
import "../../../../App.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Authcontext } from "../../../../Context/Authcontext";
import { UserUrls } from "../../../../BaseUrls/BaseUrls";

export default function Login() {
  const [isPasswordVisibile, setIsPasswordVisibile] = useState(false);
  let { saveData } = useContext(Authcontext);
  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let submtion = async (data) => {
    try {
      let response = await axios.post(UserUrls.login, data);
      toast.success("Login successfully");
      navigate("/dashboard");
      console.log(response);
      localStorage.setItem("token", response.data.token);
      saveData();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  });
  return (
    <>
      <div className="my-1">
        <h2> Login </h2>
        <span className="text-dark">
          Welocome Back ! please enter Your Details
        </span>
      </div>
      <form className="p-1" onSubmit={handleSubmit(submtion)}>
        <div className="input-group flex-nowrap my-3">
          <span className="input-group-text" id="addon-wrapping">
            <i className="fa-solid fa-envelope"></i>
          </span>
          <input
            type="email"
            className="form-control"
            placeholder="Enter Your Email "
            aria-label="email"
            aria-describedby="addon-wrapping"
            {...register("email", {
              required: "Email is Required ",
              pattern: {
                value: "",
                message: "Email should be valid Email ",
              },
            })}
          />
        </div>
        {errors.email && (
          <p className="text-danger text-left"> {errors.email.message}</p>
        )}{" "}
        <div className="input-group flex-nowrap my-3">
          <span className="input-group-text" id="addon-wrapping">
            <i className="fa-solid fa-lock"></i>
          </span>
          <input
            type={isPasswordVisibile ? "text" : "password"}
            className="form-control"
            placeholder="Enter Your Password "
            aria-label="password"
            aria-describedby="addon-wrapping"
            {...register("password", {
              required: "Password is Required ",
            })}
          />
          <button
            onClick={() => setIsPasswordVisibile(!isPasswordVisibile)}
            type="button"
            className="input-group-text"
            id="addon-wrapping"
          >
            <i
              className={`fa ${isPasswordVisibile ? "fa-eye-slash" : "fa-eye"}`}
            ></i>
          </button>
        </div>
        {errors.password && (
          <p className="text-danger text-left">{errors.password.message}</p>
        )}
        <div className="links d-flex justify-content-between align-items-center my-4">
          <Link to="/register" className="text-dark">
            {" "}
            Register Now ?
          </Link>
          <Link to="/forgetpass" className="text-success">
            {" "}
            Forget password ?
          </Link>
        </div>
        <button
          type="submit"
          className="btn btn-success d-block w-100 my-3 p-2"
        >
          Login
        </button>
      </form>
    </>
  );
}
