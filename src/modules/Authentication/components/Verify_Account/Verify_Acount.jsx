import axios from "axios";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserUrls } from "../../../../BaseUrls/BaseUrls";

export default function Verify_Acount() {
  let navigate =  useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let submtion = async (data) => {
    try {
      let response = await axios.put(
        UserUrls.verify,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Verifyied Account successfully");
      navigate("/login");
      console.log(response);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <div className="my-1">
        <h2> Verify </h2>
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
            type="number"
            className="form-control"
            placeholder="code "
            aria-label="code"
            aria-describedby="addon-wrapping"
            {...register("code", {
              required: "code is Required ",
            })}
          />
        </div>
        {errors.code && (
          <p className="text-danger text-left">{errors.code.message}</p>
        )}
        <button
          type="submit"
          className="btn btn-success d-block w-100 my-3 p-2"
        >
          Verify Acount
        </button>
      </form>
    </div>
  );
}
