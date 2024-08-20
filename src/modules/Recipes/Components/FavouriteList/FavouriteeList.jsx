import React, { useEffect, useState } from "react";
import Header from "../../../Shared/Components/Header/Header";
import img from "../../../../assets/4.png";
import axios from "axios";
export default function FavouriteeList() {
  const [favorList, setfavorList] = useState([]);

const removefromfav = async (id)=>{
  let response = await axios.delete(`https://upskilling-egypt.com:3006/api/v1/userRecipe/${id}` , {
    headers:{
      Authorization:`Bearer ${localStorage.getItem('token')}`
    }
  })
  console.log(response);
  getfavourite();
}

  let getfavourite = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/userRecipe/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setfavorList(response.data.data);
      console.log(response.data.data)
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getfavourite();
  },[]);
  return (
    <>
      <Header
        title={"Favourite Items "}
        description={
          "You can now add your Items that any user can order it from the Application and you can edit"
        }
        imgUrl={img}
      />
      <div className="Favourite">
        <div className="row">
        {favorList.map((fav) => (
          <div className="col-md-3 overflow-hidden shadow m-4 pb-3" key={fav.id}>
          <img src={`https://upskilling-egypt.com:3006/${fav.recipe.imagePath}`} alt="favourite image " className='img-fluid w-100 ' style={{height:'200px'}}/> 
            <h2 style={{textOverflow:'ellipsis'}}>{fav.recipe.name}</h2>
            <p>{fav.recipe.description}</p>
            <button className="btn btn-outline-danger my-2" onClick={()=>removefromfav(fav.id)} >Remove from Favourite </button>
          </div>
        ))}
        </div>
      </div>
    </>
  );
}
