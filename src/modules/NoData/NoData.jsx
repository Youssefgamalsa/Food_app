import img1 from "../../assets/8.svg";
export default function NoData() {
  return (
    <div className="NoData text-center ">
      <img src={img1} alt="img_Nodata" className="my-2" />
      <h4 className="mb-0"> Nodata </h4>
      <p style={{ color: "#494949" }}>
        are you sure you want to delete this item ?<br/> if you are sure just click
        on delete it
      </p>
    </div>
  );
}
