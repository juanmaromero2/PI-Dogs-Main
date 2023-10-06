const axios = require('axios');
const { Temperament } = require('../db');
const { apikey } = process.env;

const getTemperaments = async (req, res) => {
      try {
        // Realizar una solicitud a la API para obtener todos los datos de las razas de perros
        const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${apikey}`);
        const dogBreeds = response.data;
    
        // Crear un conjunto para almacenar los temperamentos únicos
        const uniqueTemperaments = new Set();
    
        // Recorrer las razas de perros y extraer los temperamentos
        dogBreeds.forEach((breed) => {
          if (breed.temperament) {
            const breedTemperaments = breed.temperament.split(',').map((t) => t.trim());
            breedTemperaments.forEach((temperament) => {
              uniqueTemperaments.add(temperament);
            });
          }
        });
    
        // Convertir el conjunto de temperamentos a un array
        const temperamentsArray = Array.from(uniqueTemperaments);
    
        // Guardar los temperamentos en la base de datos
        await Temperament.bulkCreate(
          temperamentsArray.map((temperament) => ({
            Nombre: temperament,
          }))
        );
    
        console.log('Temperamentos guardados con éxito en la base de datos.');
      } catch (error) {
        console.error('Error al obtener y guardar los temperamentos:', error);
      }
    };
module.exports = {
  getTemperaments,
};
