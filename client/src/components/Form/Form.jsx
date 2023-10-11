import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import validate from './validation';
import style from "./Form.module.css";

export default function Form() {
  const [ dogAdd, setDogAdd ] = useState(false)
  const [ create, setCreate ] = useState(true)
  const navigate = useNavigate();
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
  const [error, setError] = useState({
    name: '',
    imagen: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    life_span: '',
    temperament: [],
  })
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setError(validate({
      ...formData, [name]: value
    }))
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
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
        setDogAdd(true)
        setCreate(false)
      } else {
        console.log('Error al crear el nuevo perro.');
      }
    } catch (error) {
      console.error('Error al enviar los datos al servidor:', error);
    }
  };
  const handleBackClick = () => {
    setDogAdd(false);
  };
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div>
      {dogAdd && 
      <div className={style.containerAdd}> 
        <h1 className={style.add}>New dog created successfully</h1>
        <h2 className={style.addH2}>Congratulations, now you can go back to Home and look for your new dog!</h2>
        <button onClick={() => {handleBackClick();  goBack()}} className={style.back}>
          BACK
        </button>
      </div>
      }
      {create &&  
      <div className={style.container}>
      <form onSubmit={handleSubmit} className={style.create}>
      <label>
        Name:
        <input
          className={style.input}
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder='Insert Name'
        />
        {error.name && <span>{error.name}</span>}
      </label>
      <label>
        Image:
        <input
          className={style.input}
          type="text"
          name="imagen"
          value={formData.imagen}
          onChange={handleChange}
          placeholder='Insert image URL'
        />
        {error.imagen && <span>{error.imagen}</span>}
      </label>
      <label>
        Minimun height:
        <input
          className={style.input}
          type="number"
          name="minHeight"
          value={formData.minHeight}
          onChange={handleChange}
          placeholder='Insert Minimum height'
        />
        
      </label>
      <label>
        Maximum height:
        <input
          className={style.input}
          type="number"
          name="maxHeight"
          value={formData.maxHeight}
          onChange={handleChange}
          placeholder='Insert Maximum height'
        />
        
      </label>
      <label>
        Minimum weight:
        <input
          className={style.input}
          type="number"
          name="minWeight"
          value={formData.minWeight}
          onChange={handleChange}
          placeholder='Insert Minimum weight'
        />
        {/* {error.minWeight && <span>{error.minWeight }</span>} */}
      </label>
      <label>
        Maximum weight:
        <input
          className={style.input}
          type="number"
          name="maxWeight"
          value={formData.maxWeight}
          onChange={handleChange}
          placeholder='Insert Maximum weight'
        />
        {/* {error.maxWeight && <span>{error.maxWeight }</span>} */}
      </label>
      <label>
        Years of life:
        <input
          className={style.input}
          type="number"
          name="life_span"
          value={formData.life_span}
          onChange={handleChange}
          placeholder='Insert Years of life'
        />
      </label>
      <label>
        Temperaments:
        <input
          className={style.input}
          type="text"
          name="temperament"
          value={formData.temperament}
          onChange={handleChange}
          placeholder='Insert Temperaments'
        />
      </label>
      <button type="submit" className={style.button}>Create Breed</button>
    </form>
    </div>
    }
    </div>
  );
}