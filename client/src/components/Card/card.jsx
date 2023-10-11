import { Link } from "react-router-dom";
import style from "./Card.module.css";

export default function Card(props) {
  const { id, name, weight, image, temperament } = props;
  let newTemp = temperament?.length > 0 ? temperament.split(', ') : 'unkown';
  let shortTemp = newTemp[0];
  return (
    <div className={style.component}>
      <div className={style.image}>
        <img src={image} alt={name} />
      </div>
      <div className={style.dataContainer}>
        <h2 className={style.name}> {name} </h2>
        <h2> Weight: {weight} </h2>
        <h2> Temperament: {shortTemp} </h2>
      </div>
      <Link to={`/detail/${id}`}>
        <button className={style.masInfo}> DETAIL </button>
      </Link>
    </div>
  );
};