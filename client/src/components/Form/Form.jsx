import React, { useState } from 'react';
import style from "./Form.module.css";
import axios from 'axios';
import { Link } from "react-router-dom";

export default function Form() {
  const [ dogAdd, setDogAdd ] = useState(false)
  const [ create, setCreate ] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    imagen: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    life_span: '',
    temperament: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Realiza las validaciones aquí antes de enviar los datos al servidor
    if (!formData.name || !formData.temperament) {
      alert('Por favor, complete los campos obligatorios.');
      return;
    }
    try {
        let newDog = {
          name: formData.name,
          imagen: formData.imagen,
          peso: `${formData.minWeight} - ${formData.maxWeight}`,
          altura: `${formData.minHeight} - ${formData.maxHeight}`,
          life_span: formData.life_span,
          temperament: formData.temperament
        }
      const response = await axios.post('http://localhost:3001/dogs/', newDog)

      if (response) {
        // La solicitud se completó con éxito
       
        setDogAdd(true)
        setCreate(false)
      } else {
        // Hubo un error en la solicitud
        console.log('Hubo un error al crear la raza de perro.');
      }
    } catch (error) {
      console.error('Error al enviar los datos al servidor:', error);
      console.log('Hubo un error al crear la raza de perro.');
    }
  };

  const handleBackClick = () => {
    // Cuando se hace clic en el botón "BACK", ocultar el mensaje.
    setDogAdd(false);
  };

  return (
    <>
      {dogAdd && 
      <div className={style.containerAdd}> 
        <h1 className={style.add}>Perro Agregado!</h1>
        <h2 className={style.addH2}>Felicidades, ahora puedes volver a Home <br></br>y buscar a tu perro por nombre!</h2>
        <Link to="/home" className={style.back}>
        <button onClick={handleBackClick}>
          BACK
        </button>
        </Link>
      </div>
      }
  {create &&  
  <div className={style.container}>
    <form onSubmit={handleSubmit} className={style.create}>
      <label>
        Nombre:
        <input
          className={style.input}
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder='Inserte Nombre'
        />
      </label>
      <label>
        Imagen:
        <input
        className={style.input}
          type="text"
          name="imagen"
          value={formData.imagen}
          onChange={handleChange}
          placeholder='Inserte URL de imagen'
        />
      </label>
      <label>
        Altura Mínima:
        <input
        className={style.input}
          type="number"
          name="minHeight"
          value={formData.minHeight}
          onChange={handleChange}
          placeholder='Inserte Altura Minima'
        />
      </label>
      <label>
        Altura Máxima:
        <input
        className={style.input}
          type="number"
          name="maxHeight"
          value={formData.maxHeight}
          onChange={handleChange}
          placeholder='Inserte Altura Maxima'
        />
      </label>
      <label>
        Peso Mínimo:
        <input
        className={style.input}
          type="number"
          name="minWeight"
          value={formData.minWeight}
          onChange={handleChange}
          placeholder='Inserte Peso Minimo'
        />
      </label>
      <label>
        Peso Máximo:
        <input
        className={style.input}
          type="number"
          name="maxWeight"
          value={formData.maxWeight}
          onChange={handleChange}
          placeholder='Inserte Peso Maximo'
        />
      </label>
      <label>
        Años de Vida:
        <input
        className={style.input}
          type="number"
          name="life_span"
          value={formData.life_span}
          onChange={handleChange}
          placeholder='Inserte Años de Vida'
        />
      </label>
      <label>
        Temperamentos (separados por coma):
        <input
        className={style.input}
          type="text"
          name="temperament"
          value={formData.temperament}
          onChange={handleChange}
          placeholder='Inserte Temperamentos'
        />
      </label>
      <button type="submit" className={style.button}>Crear Raza</button>
    </form>
    </div>
    }
    </>
  );
}