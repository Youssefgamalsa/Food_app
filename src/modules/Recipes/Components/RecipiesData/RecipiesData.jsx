import { Button } from "react-bootstrap";
// import img from "../../../../assets/4.png";
// import Header from "../../../Shared/Components/Header/Header";
import { useForm } from "react-hook-form";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Authcontext } from "../../../../Context/Authcontext";

export default function RecipiesData() {
  let { loginData } = useContext(Authcontext);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [tags, setTags] = useState([]);
  const [cats, setCats] = useState([]);
  const navigate = useNavigate();

  let {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm();

  let apeend_to_From_Data = (data) => {
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("price", data.price);
    formdata.append("description", data.description);
    formdata.append("tagId", data.tagId);
    formdata.append("recipeImage", data.recipeImage[0]);
    formdata.append("categoriesIds", data.categoriesIds);
    return formdata;
  };
  let send_api = async (data) => {
    console.log(data);
    let form_data = apeend_to_From_Data(data);
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Recipe",
        form_data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      toast.success("Recipe Has Created Successfully");
      navigate("/dashboard/reciepes");
      localStorage.removeItem("recipe-data");
    } catch (error) {
      console.log(error);
    }
  };

  let getcatogories = async () => {
    let response = await axios.get(
      "https://upskilling-egypt.com:3006/api/v1/Category",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setCats(response.data.data);
  };
  let get_tags = async () => {
    let response = await axios.get(
      "https://upskilling-egypt.com:3006/api/v1/Tag",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setTags(response.data);
    console.log(response.data);
  };
  useEffect(() => {
    async function getRecipe_data() {
      await get_tags();
      await getcatogories();
      const objec = JSON.parse(localStorage.getItem("recipe-data"));
      reset(objec);
    }
    getRecipe_data();
    if (loginData.userGroup != "SuperAdmin") {
      navigate("/dashboard");
    }
  }, []);

  useEffect(() => {
    const beforeUnload = () => {
      localStorage.setItem("recipe-data", JSON.stringify(getValues()));
      console.log(getValues());
    };
    return () => {
      window.addEventListener("beforeunload", beforeUnload);
    };
  }, []);
  return (
    <>
      <div className="recipes_Data">
        <div>
          <div
            className="d-flex justify-content-between p-5 align-items-center "
            style={{ background: "#F0FFEF" }}
          >
            <div className="header-tile">
              <h4 className="m-2">
                Fill The <span style={{ color: "#009247" }}> Recipe </span>
              </h4>
              <p>
                You can now add your items that any user can order it from the
                Application and you can edit
              </p>
            </div>
            <Button
              className="btn btn-success"
              onClick={() => navigate("/dashboard/reciepes")}
            >
              View All Recipes <i className="fa fa-arrow-right mx-2" />{" "}
            </Button>
          </div>
        </div>

        <form className="my-2 p-5" onSubmit={handleSubmit(send_api)}>
          <div className="input-group flex-nowrap my-3">
            <input
              type="text"
              className="form-control"
              placeholder="Recipe Name "
              aria-label="Recipe_name"
              aria-describedby="addon-wrapping"
              {...register("name", {
                required: "Recipe name is Required ",
              })}
            />
          </div>
          <select
            className="form-select form-control input-group flex-wrap my-3"
            aria-label="Default select example"
            {...register("tagId", {
              required: "Tag Name is Required ",
            })}
          >
            {tags.map((tag) => (
              <option value={tag.id} key={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
          <div className="input-group flex-nowrap my-3">
            <input
              type="number"
              className="form-control"
              placeholder=" Price "
              aria-label="Recipe_name"
              aria-describedby="addon-wrapping"
              {...register("price", {
                required: "price is Required ",
              })}
            />
          </div>
          <div>
            <textarea
              className="form-control flex-nowrap my-3 w-100"
              placeholder="Description"
              {...register("description", {
                required: "description is required ",
              })}
            ></textarea>
          </div>
          <select
            className="form-select form-control  my-3"
            aria-label="Default select example"
            {...register("categoriesIds")}
          >
            {cats.map((cat) => (
              <option value={cat.id} key={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <div className="mb-3">
            <input
              type="file"
              className="form-control"
              aria-label="file example"
              required
              {...register("recipeImage", {
                required: "Recipe image is Required ",
              })}
            />
          </div>
          <div className="buttons d-flex justify-content-end my-3">
            <button
              className="btn btn-dark mx-3"
              type="button"
              onClick={() => (
                navigate(-1), localStorage.removeItem("recipe-data")
              )}
            >
              {" "}
              Cancel
            </button>
            <button className="btn btn-success" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
/*

let file = new FileReader();
file.readAsDataURL(data.recipeImage.files[0]);
file.onload = function () {
   file.result;
};
*/
