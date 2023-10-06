import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { filterTemperaments, orderDogs, dogByName, dogById, allDogs, allTemperaments, clearDogs } from "../../redux/actions";
//import style from "./SearchBar.module.css";
import searchIcon from "../../assets/search.png";

export default function SearchBar() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const order = useSelector((state) => state.orderAndFilter.order)

  function HandleChange(e) {
    e.preventDefault();

    let input = e.target.value;

    setName(input);
  }

  const onSearch = async(event) =>{
    clearDogs()
    if(name.length > 3){
      await dispatch(dogByName(name))
      dispatch(orderDogs(order))
    } else{
      dispatch(clearDogs())
      dispatch(dogById(name))
    }
    dispatch(filterTemperaments('All'))
}

  return (
    <div >
      <input
        
        type="search"
        placeholder="Ingrese un Nombre"
        value={name}
        onChange={HandleChange}
      />
      <button  onClick={() => onSearch(name)}>
        {/* <img src={searchIcon} /> */}
      </button>
    </div>
  );
}