import { Link } from "react-router-dom";
import { useState } from "react";
import SearchBar from "../SearchBar/Searchbar";
import { useDispatch} from "react-redux";
import { clearDogs, allDogs } from "../../redux/actions";
import Filter from "./Filter";
import Form from "../Form/Form"
import style from "./Navbar.module.css";

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
    <div className={style.container}>
      <div className={style.navbar}>
        <Filter/>
        <SearchBar onSearch={onSearch}/>
        <div className={style.buttons}>
          <Link to="/home" onClick={()=>{clear()}}  >
            <button className={style.aboutButton}> HOME </button>
          </Link>
          <Link to="/form">
            <button className={style.aboutButton} >NEW DOG</button>
          </Link>
        </div>
      </div>

    </div>
  );
}