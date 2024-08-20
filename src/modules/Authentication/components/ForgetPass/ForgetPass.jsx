import { useNavigate } from "react-router-dom";
import "../../../../App.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { UserUrls } from "../../../../BaseUrls/BaseUrls";

export default function ForgetPass() {
  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let submtion = async (data) => {
    try {
      let response = await axios.post(
        UserUrls.request,
        data
      );
      toast.success( response?.data?.message || "Your OTP is send to your email ");
      navigate("/resetpass");
      console.log(response);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="my-2">
        <h2> Forgot Your Password? </h2>
        <span className="text-dark">
          No worries! Please enter your email and we will send a password reset
          link
        </span>
      </div>
      <form className="p-1" onSubmit={handleSubmit(submtion)}>
        <div className="input-group flex-nowrap my-5">
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
        )}
        <button
          type="submit"
          className="btn btn-success d-block w-100 my-3 p-2"
        >
          Submit
        </button>
      </form>
    </>
  );
}
