import Header from "../../../Shared/Components/Header/Header";
import img from "../../../../assets/4.png";
import img1 from "../../../../assets/3.png";
import img2 from "../../../../assets/1.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Table } from "react-bootstrap";
import { toast } from "react-toastify";
export default function Users() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [usersList, setUsersList] = useState([]);
  const [show, setShow] = useState(false);
  const [arrayofpages, setArrayofpages] = useState([]);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    getusers_api( 1 , 50 );
  }, []);
  let getusers_api = async (pageno ,pagesize) => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            pageSize: pagesize,
            pageNumber: pageno,
          },
        }
      );
      console.log(response);
      setUsersList(response.data.data);
      setArrayofpages(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
    } catch (error) {
      console.log(error);
    }
  };

  let delete_users = async (id) => {
    try {
      let response = await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
   
      toast.success("Deleted Successfully ");
      getusers_api();
      handleClose();

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Header
        title={"Users List "}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={img}
      />
      <div className="Users p-2">
        <Table bordered hover variant="secondary">
          <thead>
            <tr>
              <th>name </th>
              <th>image </th>
              <th>email </th>
              <th>country </th>
              <th>creation Date </th>
              <th>phoneNumber </th>
              <th>Actions </th>
            </tr>
          </thead>
          <tbody>
            {usersList.map((user) => (
              <>
              <tr key={user.id}>
                <td> {user.userName} </td>
                <td>
                  <img
                    src={`https://upskilling-egypt.com:3006/${user.imagePath}`}
                    className="w-25"
                    alt="Image User"
                  />
                </td>
                <td>{user.email}</td>
                <td>{user.country}</td>
                <td>{user.creationDate}</td>
                <td>{user.phoneNumber}</td>
                <td style={{ cursor: "pointer" }}>
                  <i className="fa fa-edit text-warning mx-2"></i>
                  <i className="fa fa-trash text-danger" onClick={handleShow}></i>
                </td>
              </tr>
              <Modal show={show} onHide={handleClose} className="text-center">
              <Modal.Header closeButton>
                <Modal.Title>
                  <img
                    src={img2}
                    alt="Image"
                    className="mb-2 w-75 m-auto"
                  />
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h2> Delete This User </h2>
                <p>
                  are you sure you want to delete this item ?<br /> if you
                  are sure just click on delete it
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="btn btn-outline-danger"
                  onClick={() => delete_users(user.id)}
                >
                  Delete This Item
                </Button>
              </Modal.Footer>
            </Modal>
            </>
            ))}
          </tbody>
        </Table>
         <div className="d-flex justify-content-center my-2">
        <nav aria-label="Page navigation example" style={{cursor:'pointer'}}>
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
                onClick={() => getusers_api(pageitem, 50)}
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
    </>
  );
}
