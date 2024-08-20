import { useContext, useEffect, useState } from "react";
import img from "../../../../assets/4.png";
import img1 from "../../../../assets/8.svg";
import Header from "../../../Shared/Components/Header/Header";
import axios from "axios";
import { Button, Modal, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Authcontext } from "../../../../Context/Authcontext";
export default function RecipesList() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  let navigate = useNavigate();
  const [arrayofpages, setArrayofpages] = useState([]);
  const [tags, setTags] = useState([]);
  const [cats, setCats] = useState([]);
  const [recipesList, setRecipesList] = useState([]);
  const [name, setName] = useState("");
  const [catname, setCatname] = useState("");
  const [tagname, setTagname] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let { loginData } = useContext(Authcontext);

  let delete_recipe = async (id) => {
    console.log(id);
    try {
      let response = await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      handleClose();
      getRecipies_api();
      toast.success("Deleted Successfully ");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRecipies_api(1, 3, name, catname, tagname);
    getcatogories();
    get_tags();
  }, []);

  let getRecipies_api = async (
    pageno,
    pagesize,
    nameinput,
    catinput,
    taginput
  ) => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Recipe",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            pageSize: pagesize,
            pageNumber: pageno,
            name: nameinput,
            tagId: taginput,
            categoryId: catinput,
          },
        }
      );
      console.log(response);
      setRecipesList(response.data.data);
      setArrayofpages(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
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
  };

  let getbyname = (input) => {
    setName(input.target.value);
    getRecipies_api(1, 3, input.target.value, catname, tagname);
  };
  let getbytag = (input) => {
    setTagname(input.target.value);
    console.log(input);
    console.log(input.target.value);
    getRecipies_api(1, 3, name, catname, input.target.value);
  };
  let getbycat = (input) => {
    setCatname(input.target.value);
    console.log(input.target.value);
    getRecipies_api(1, 3, name, input.target.value, tagname);
    console.log(input);
    console.log(input.target.value);
  };
  let addtofavor = async (id) => {
    let response = await axios.post(
      `https://upskilling-egypt.com:3006/api/v1/userRecipe/`,{"recipeId":id},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );
    console.log(response);
  };

  return (
    <>
      <Header
        title={"Recipes Items"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={img}
      />
      <div className="recipes">
        <div className="title d-flex justify-content-between align-items-center p-2 my-2 ">
          <div className="title-info">
            <h5 className="m-0"> Recipe Table Details </h5>
            <p> You can check all details </p>
          </div>
          <button
            className="btn btn-outline-danger"
            onClick={() => navigate("/dashboard/RecipiesData")}
          >
            Add New Item{" "}
          </button>
        </div>
        <div className="row my-2 p-1">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search By Name... "
              onChange={getbyname}
            />
          </div>
          <div className="col-md-3">
            <select className="form-control" onChange={getbytag}>
              <option selected> Select New Tag </option>
              {tags.map((tag) => (
                <option value={tag.id} key={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <select className="form-control" onChange={getbycat}>
              <option selected> Select New Category </option>
              {cats.map((cat) => (
                <option value={cat.id} key={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Table bordered hover variant="" className="mb-2">
          <thead>
            <tr>
              <th>Item Name </th>
              <th>Image </th>
              <th>Price </th>
              <th>Description </th>
              <th>tag </th>
              <th>Actions </th>
            </tr>
          </thead>
          <tbody>
            {recipesList.map((recipe) => (
              <>
                <tr key={recipe.id}>
                  <td>{recipe.name} </td>
                  <td>
                    <img
                      src={`https://upskilling-egypt.com:3006/${recipe.imagePath}`}
                      alt="image"
                      style={{ width: "100px", height: "100px" }}
                    />
                  </td>
                  <td>{recipe.price} </td>
                  <td>{recipe.description} </td>
                  <td>{recipe.tag.name} </td>
                  <td style={{ cursor: "pointer" }}>
                    {loginData?.userGroup == "SuperAdmin" ? (
                      <>
                        <i className="fa fa-edit text-warning mx-3" />
                        <i
                          className="fa fa-trash text-danger"
                          onClick={handleShow}
                        />
                      </>
                    ) : (
                      <i
                        className="fa-solid fa-heart text-danger"
                        onClick={()=>addtofavor(recipe.id)}
                      ></i>
                    )}
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="d-flex justify-content-center my-2">
        <nav aria-label="Page navigation example" style={{ cursor: "pointer" }}>
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </a>
            </li>
            {arrayofpages.map((pageitem) => (
              <li
                className="page-item"
                key={pageitem}
                onClick={() => getRecipies_api(pageitem, 3)}
              >
                <a className="page-link">{pageitem}</a>
              </li>
            ))}
            <li className="page-item">
              <a className="page-link" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
