import React from "react";
import "../Searchbar/search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";


function SearchBar(){
    return(
        <>
        <div class="container">
  {/* <div class="row justify-content-center"> */}
    <div class="col-md-8">
      <div class="search-container">
        <input type="text" class="form-control search-input" placeholder="What are you looking for?"/>
        <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
      </div>
    </div>
  {/* </div> */}
</div> 


        </>


    );


}
export default SearchBar;