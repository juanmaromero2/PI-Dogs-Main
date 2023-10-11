import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./Detail.module.css";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState({});

  useEffect(() => {
    axios(`http://localhost:3001/dogs/${id}`).then(
      ({ data }) => {
        if (data.name) {
          setCharacter(data);
        } else {
          alert("No hay personajes con ese ID");
        }
      }
    );
    return setCharacter({});
  }, [id]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className={style.component}>
        <div className={style.image}>
          <img src={character.imagen} alt={character.name}></img>
        </div>
        <div className={style.info}>
          <h1 className={style.name}>{character.name ? character.name : null}</h1>
          <p className={style.title}>ID:
            <span className={style.data}> {character.id}</span>
          </p>
          <p className={style.title}>Height:
            <span className={style.data}> {character.height}</span>
          </p>
          <p className={style.title}>Weight:
            <span className={style.data}> {character.weight}</span>
          </p>
          <p className={style.title}>Temperaments:
            <span className={style.data}> {character.temperament ? character.temperament : null}</span>
          </p>
          {character.breed_for ? <p className={style.title}>Trained To:
            <span className={style.data}> {character.breed_for ? character.breed_for : null}</span>
          </p> : null}
          <p className={style.title}>Life Expectancy:
            <span className={style.data}> {character.life_span}</span>
          </p>
          {character.origin ? <p className={style.title}>Origin:
            <span className={style.data}> {character.origin ? character.origin : null}</span>
          </p> : null}
        </div>
    </div>
      <button onClick={goBack} className={style.back}> BACK </button>
    </div>
  );
}