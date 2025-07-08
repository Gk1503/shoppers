import { useEffect, useState } from "react";
import "../headder2/head.css";
import apiConfig from "../../../utils/apiConfig";
import { getCategory } from "../../../utils/constant";

function Head2() {
  // usestate categorylist
  const [categorylist, setcategorlist] = useState([]);

  //useeffect

  useEffect(() => {
    apiConfig
      .get(getCategory)
      .then((response) => {
        if (response.status === 200) {
          console.log("Category List", JSON.stringify(response.data));
          setcategorlist(response.data);
        } else {
          setcategorlist([]);
        }
      })
      .catch((error) => {
        console.error(
          "Category Not Found",
          error.response?.data || error.message
        );
      });
  }, []);

  return (
    <>
      <div id="head2">
        {categorylist.map((item) => {
          return <div id="men">{item?.categoryName}</div>;
        })}
        {/* <div id="men">MEN</div>
        <div id="women">WOMEN</div>
        <div id="kids">KIDS</div>
        <div id="beauty">BEAUTY</div>
        <div id="watches">WATCHES</div>
        <div id="gifts">GIFTS</div>
        <div id="brands">BRANDS</div>
        <div id="homestop">HOMESTOP</div>
        <div id="stylehub">STYLE HUB</div>
        <div id="bara">BARGA%NS</div>
        <div id="luxe">LUXE</div> */}
      </div>
    </>
  );
}
export default Head2;
