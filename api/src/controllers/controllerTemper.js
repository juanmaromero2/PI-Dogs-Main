const axios = require('axios');
const { Temperament } = require('../db');
const {API_KEY} = process.env;
require('dotenv').config();

const getTemperament = async () => {
  try {
    const dogs = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data
    // Crear un conjunto para almacenar los temperamentos únicos
    const dogTemperament = new Set()
    // Recorrer las razas de perros y extraer los temperamentos
    dogs.forEach((perro) => {
      if (perro.temperament) {
        const dogsTemperaments = perro.temperament.split(',').map((temp) => temp.trim())
        dogsTemperaments.forEach((temperament) => {
          dogTemperament.add(temperament)
        })
      }
    })
    // Convertir el conjunto de temperamentos a un array
    const allTemperaments = Array.from(dogTemperament)
    // Guardar los temperamentos en la base de datos
    await Temperament.bulkCreate(
      allTemperaments.map((temperament) => ({
        Nombre: temperament,
      }))
    )
    console.log('Los temperamentos han sido guardados en la base de datos.')
  } catch (error) {
    console.error('Error al obtener y guardar los temperamentos:', error);
    throw new Error(error.message)
    }
};

module.exports = {
  getTemperament,
};