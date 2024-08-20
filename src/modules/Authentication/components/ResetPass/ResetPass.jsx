import { useNavigate } from "react-router-dom";
import "../../../../App.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { UserUrls } from "../../../../BaseUrls/BaseUrls";
export default function ResetPass() {
  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let submtion = async (data) => {
    try {
      let response = await axios.post(
        UserUrls.reset,
        data
      );
      toast.success("Reset Password Successfully ");
      navigate("/login");
      console.log(data);
      console.log(response);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="my-1">
        <h2> Reset Password </h2>
        <span className="text-dark">
          Please Enter Your Otp or Check Your Inbox
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
            placeholder="Email "
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
            <i className="fa-solid fa-lock"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="OTP "
            aria-label="seed"
            aria-describedby="addon-wrapping"
            {...register("seed", {
              required: "seed is Required ",
            })}
          />
        </div>
        {errors.seed && (
          <p className="text-danger text-left">{errors.seed.message}</p>
        )}

        <div className="input-group flex-nowrap my-3">
          <span className="input-group-text" id="addon-wrapping">
            <i className="fa-solid fa-lock"></i>
          </span>
          <input
            type="password"
            className="form-control"
            placeholder="New Password "
            aria-label="password"
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
            placeholder="Confirm New Password"
            aria-label="ConfirmPassword"
            aria-describedby="addon-wrapping"
            {...register("confirmPassword", {
              required: "confirmPassword is Required ",
            })}
          />
        </div>
        {errors.password && (
          <p className="text-danger text-left">
            {errors.confirmPassword.message}
          </p>
        )}
        <button
          type="submit"
          className="btn btn-success d-block w-100 my-3 p-2"
        >
          Reset Password
        </button>
      </form>
    </>
  );
}
