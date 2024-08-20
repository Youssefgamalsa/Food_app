import { Link, useNavigate } from "react-router-dom";
import "../../../../App.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { UserUrls } from "../../../../BaseUrls/BaseUrls";

export default function Register() {
  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let append_to_form_data = (data) => {
    let formdata = new FormData();
    formdata.append("userName", data.userName);
    formdata.append("email", data.email);
    formdata.append("phoneNumber", data.phoneNumber);
    formdata.append("country", data.country);
    formdata.append("password", data.password);
    formdata.append("confirmPassword", data.confirmPassword);
    formdata.append("profileImage", data.profileImage[0]);
    return formdata;
  };
  let submtion = async (data) => {
    let form_data = append_to_form_data(data);
    try {
      let response = await axios.post(
        UserUrls.register,
        form_data
      );
      toast.success(response.data.message);
      navigate('/verify-account');
      console.log(response);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="my-1">
        <h2> Register </h2>
        <span className="text-dark">
          Welcome Back! Please enter your details
        </span>
      </div>
      <form className="p-1" onSubmit={handleSubmit(submtion)}>
        <div className="p-3 form_register">
          <div className="input-group flex-nowrap my-3">
            <span className="input-group-text" id="addon-wrapping">
              <i className="fa-solid fa-envelope"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="UserName "
              aria-label="email"
              aria-describedby="addon-wrapping"
              {...register("userName", {
                required: "UserName is Required ",
                pattern: {
                  value: "",
                  message: "UserName should be valid Email ",
                },
              })}
            />
          </div>
          {errors.UserName && (
            <p className="text-danger text-left">{errors.UserName.message}</p>
          )}
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
            <p className="text-danger text-left">{errors.email.message}</p>
          )}

          <div className="input-group flex-nowrap my-3">
            <span className="input-group-text" id="addon-wrapping">
              <i className="fa-solid fa-envelope"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Phone number "
              aria-label="email"
              aria-describedby="addon-wrapping"
              {...register("phoneNumber", {
                required: "phoneNumber is Required ",
              })}
            />
          </div>
          {errors.phoneNumber && (
            <p className="text-danger text-left">
              {errors.phoneNumber.message}
            </p>
          )}

          <div className="input-group flex-nowrap my-3">
            <span className="input-group-text" id="addon-wrapping">
              <i className="fa-solid fa-lock"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Country "
              aria-label="country"
              aria-describedby="addon-wrapping"
              {...register("country", {
                required: "country  is Required ",
              })}
            />
          </div>
          {errors.country && (
            <p className="text-danger text-left">{errors.country.message}</p>
          )}

          <div className="input-group flex-nowrap my-3">
            <span className="input-group-text" id="addon-wrapping">
              <i className="fa-solid fa-lock"></i>
            </span>
            <input
              type="Password"
              className="form-control"
              placeholder="Password "
              aria-label="Password"
              aria-describedby="addon-wrapping"
              {...register("password", {
                required: "Password is Required ",
              })}
            />
          </div>
          {errors.password && (
            <p className="text-danger text-left">{errors.password.message}</p>
          )}
          <div className="input-group flex-nowrap my-3">
            <span className="input-group-text" id="addon-wrapping">
              <i className="fa-solid fa-lock"></i>
            </span>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password  "
              aria-label="Confirm Password"
              aria-describedby="addon-wrapping"
              {...register("confirmPassword", {
                required: "confirmPassword is Required ",
              })}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-danger text-left">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <input
          type="file"
          className="form-control"
          {...register("profileImage", {
            required: "profileImage is required ",
          })}
        />
        <button
          type="submit"
          className="btn btn-success d-block w-100 my-3 p-2"
        >
          Register
        </button>
      </form>

      <div className="link d-flex justify-content-end">
        <Link to="/login" className="text-success">
          {" "}
          Login now ?
        </Link>
      </div>
    </>
  );
}
