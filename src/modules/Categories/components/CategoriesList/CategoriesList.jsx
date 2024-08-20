import Header from "../../../Shared/Components/Header/Header";
import img from "../../../../assets/4.png";
import img1 from "../../../../assets/8.svg";
import { Button, Modal, Table } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import NoData from "../../../NoData/NoData";
import { useForm } from "react-hook-form";
import { Authcontext } from "../../../../Context/Authcontext";
import { useNavigate } from "react-router-dom";
import { catUrls } from "../../../../BaseUrls/BaseUrls";
export default function CategoriesList() {
  let navigate = useNavigate();
  let {loginData} = useContext(Authcontext);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [categoryList, setCategoryList] = useState([]);
  const [show, setShow] = useState(false);
  const [arrayofpages, setArrayofpages] = useState([]);
  const [name , setName ] = useState("") ; 
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showmodal2, setShowmodal2] = useState(false);

  const handleClose1 = () => setShowmodal2(false);
  const handleShow1 = () => setShowmodal2(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let create_category = async (data) => {
    try {
      let response = await axios.post(
        catUrls.addcat,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      getcategory_api();
      toast.success("Created Successfully ");
    } catch (error) {
      console.log(error);
    }
  };

  let delete_category = async (id) => {
    console.log(id);
    try {
      let response = await axios.delete(
        catUrls.deletecat(id),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      getcategory_api();
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getcategory_api(1, 3 , "");
    if (loginData.userGroup != "SuperAdmin") {
      navigate("/dashboard");
    }
  }, []);
  const getbyname = (input)=>{ 
    setName(input.target.value);
    getcategory_api(1 , 3 , input.target.value );
  }
  let getcategory_api = async (pageno, pagesize , name ) => {
    try {
      let response = await axios.get(
        catUrls.getlist,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            pageSize: pagesize,
            pageNumber: pageno,
            name:name
          },
        }
      );
      console.log(response);
      setCategoryList(response.data.data);
      setArrayofpages(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
      console.log(arrayofpages);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header
        title={"Categories Items "}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={img}
      />
      <div className="Categories">
        <div className="title p-3 d-flex justify-content-between align-items-center">
          <div className="title-info">
            <h5 className="m-0 text-black"> Categories Items </h5>
            <span className="text-dark">
              You can now add your items that any user can order it from <br />
              the Application and you can edit
            </span>
          </div>
          <button
            className="btn btn-success p-1 d-inline-block"
            onClick={handleShow1}
          >
            Add New Category
          </button>
        </div>
        <Modal show={showmodal2} onHide={handleClose1}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit(create_category)}>
              <input
                type="text"
                className="form-control my-2"
                placeholder="Category Name  "
                aria-label="Category_Name"
                aria-describedby="addon-wrapping"
                {...register("name", { required: "Category Name Is Required" })}
              />
              <div className="text-right">
                <Button
                  variant="primary"
                  onClick={handleClose1}
                  type="submit"
                  className="d-inline-block"
                >
                  Create Category
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
        {categoryList.length > 0 ? (
          <div className="p-2">
          <input type="text" className="form-control mb-4" placeholder="Search By Name... " onChange={getbyname}/>
            <Table bordered hover variant="white">
              <thead>
                <tr>
                  <th>Id </th>
                  <th>Name </th>
                  <th>Craetion Date </th>
                  <th>Actions </th>
                </tr>
              </thead>
              <tbody>
                {categoryList.map((cat) => (
                  <>
                    <tr key={cat.id}>
                      <td>{cat.id} </td>
                      <td>{cat.name} </td>
                      <td>{cat.creationDate} </td>
                      <td style={{ cursor: "pointer" }}>
                        <i className="fa fa-edit text-warning mx-3" />
                        <i
                          className="fa fa-trash text-danger"
                          onClick={handleShow}
                        />
                      </td>
                    </tr>
                    <Modal
                      show={show}
                      onHide={handleClose}
                      className="text-center"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>
                          <img
                            src={img1}
                            alt="Image"
                            className="mb-2 w-75 m-auto"
                          />
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <h2> Delete This Category </h2>
                        <p>
                          are you sure you want to delete this item ?<br /> if
                          you are sure just click on delete it
                        </p>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="btn btn-outline-danger"
                          onClick={() => delete_category(cat.id)}
                        >
                          Delete This Item
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </>
                ))}
              </tbody>
            </Table>
            <div className="d-flex justify-content-center">
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link"  aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                      <span className="sr-only">Previous</span>
                    </a>
                  </li>
                  {arrayofpages.map((pageitem) => (
                    <li
                      className="page-item"
                      key={pageitem}
                      onClick={() => getcategory_api( pageitem , 3)}
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
          </div>
        ) : (
          <NoData />
        )}
      </div>
    </>
  );
}
