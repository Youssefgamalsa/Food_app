import '../../../../App.css'


export default function Header({ title , description , imgUrl }) {
  return (
    <div className="header p-3">
      <div className="text  text-white">
        <h1>{title} </h1>
        <p>
         {description}
        </p>
      </div>
      <diV className="image d-flex justify-content-center">
      <img src={imgUrl} alt="img" style={{width:'300px' , height:'200px'}}/>
      </diV>
    </div>
  );
}
