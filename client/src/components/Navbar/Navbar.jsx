import { Link } from "react-router-dom";
import { useState } from "react";
import SearchBar from "../SearchBar/Searchbar";
//import style from "./Navbar.module.css";
//import Logo from "../../assets/logo.png";
import { useDispatch} from "react-redux";
import { clearDogs, allDogs } from "../../redux/actions";
//import Filter from "./filter";
import Form from "../Form/Form"

export default function Navbar({ onSearch }) {
  const dispatch = useDispatch();
  const [isFormVisible, setIsFormVisible] = useState(false);

function clear(){
  dispatch(clearDogs())
  dispatch(allDogs()) 
}

function toggleFormVisibility() {
  setIsFormVisible(!isFormVisible);
}
  return (
    <div>
    <div >
      <div >
        <Link to="/home" onClick={() => {clear()}}>
        {/* <img src={Logo}></img> */}
        </Link>
      </div>
      {/* <Filter/> */}
      <SearchBar onSearch={onSearch} />
      <div >
        <Link to="/home" onClick={()=>{clear()}}  >
          <h3>
            RESET
          </h3>
        </Link>
        <div onClick={toggleFormVisibility} >
            <h3>CREATE</h3>
          </div>
        </div>
      </div>
      {isFormVisible && <Form />}
    </div>
  );
}