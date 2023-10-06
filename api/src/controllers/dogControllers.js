const axios = require('axios');
const { Dog } = require('../db');
const { Op } = require('sequelize');
const { API_KEY } = process.env;

const getDogs = async () =>{
  let allDogs = []
  try {
      let {data} = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)

      const apiDogs = data.map((dog) => {
        if(dog.reference_image_id === 'B12uzg9V7' || dog.reference_image_id === '_Qf9nfRzL'|| dog.reference_image_id === 'HkC31gcNm'){
            dog.reference_image_id = 'H1oLMe94m';
        }

        if(dog.temperament === undefined){
          dog.temperament = "Manija"
        };
          return({
                      id: dog.id,
                      name: dog.name,
                      imagen: `https://cdn2.thedogapi.com/images/${dog?.reference_image_id}.jpg`,
                      height: dog.height?.metric,
                      weight: dog.weight?.metric === 'NaN' ? '10 - 15' : dog.weight.metric,
                      life_span: dog?.life_span,
                      breed_for: dog?.bred_for,
                      breed_group: dog?.breed_group,
                      origin: dog?.origin,
                      temperament: dog?.temperament,
          })
      })

      const dbDogs = await Dog.findAll()
      
      allDogs = [...dbDogs, ...apiDogs].sort((a, b) => a.name.localeCompare(b.name))

      return allDogs

  } catch (error) {
      throw new Error(error.message)
  }
} 

const getDetail = async (id) =>{
    try {
      if(id.length > 3){
        let allDogs = await getAllDogs();

        let resultado = allDogs.filter((dog) => dog.id === id);
      
        if(resultado.length){
          const formattedDog = {
            id: resultado[0].id,
            name: resultado[0].name,
            imagen: resultado[0].imagen,
            height: resultado[0].altura,
            weight: resultado[0].peso,
            life_span: resultado[0].life_span,
            temperament: resultado[0].temperament,
          }
          return formattedDog
        }

      } else{
        const response = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}?api_key=${API_KEY}`);
        const dogData = response.data;

        if(dogData.temperament === undefined){
          dogData.temperament = "Manija"
        };
      
        const formattedDog = {
            id: dogData.id,
            name: dogData.name,
            imagen: `https://cdn2.thedogapi.com/images/${dogData.reference_image_id}.jpg`,
            height: dogData.height.metric,
            weight: dogData.weight.metric === 'NaN' ? '10 - 15' : dogData.weight.metric,
            life_span: dogData.life_span,
            breed_for: dogData.bred_for,
            breed_group: dogData.breed_group,
            origin: dogData.origin,
            temperament: dogData?.temperament,
          };
          
          return formattedDog;
      }

    } catch (error) {
        throw new Error(error.message)
    }
}

const addDog = async(dog) =>{
  if(!dog.name || !dog.imagen || !dog.peso || !dog.altura || !dog.life_span || !dog.temperament) throw new Error('Faltan datos')
  
  try {
      const newDog = await Dog.create({
        imagen: dog.imagen,
        name: dog.name,
        altura: dog.altura,
        peso: dog.peso,
        life_span: dog.life_span,
        temperament: dog.temperament,
      });
    
      await newDog.save()

      const allDogs = await Dog.findAll()
      console.log(allDogs)
      return allDogs
  } catch (error) {
      throw new Error('No se pudo crear el perro')
  }
}

const getDogBreeds = async (req, res) => {
    try {
      
      const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
  
      const dogData = response.data;
  
      const seenBreeds = {};
      
      // Mapea los datos y extrae solo la información necesaria
      const breeds = dogData.reduce((accumulator, dog) => {
        const breed = dog.breed_group;
  
        // Verifica si ya hemos visto esta raza antes
        if (!seenBreeds[breed]) {
          seenBreeds[breed] = true;
  
          // Agrega la raza al arreglo resultante
          accumulator.push({
            breed: breed,
          });
        }
  
        return accumulator;
      }, []);
  
      // Responde con el arreglo de razas de perro
      res.json(breeds);
  
    } catch (error) {
      console.error('Error al obtener las razas de perro desde la API:', error);
      res.status(500).json({ error: 'Hubo un error al obtener las razas de perro.' });
    }
  };
// //
const searchDogsByName = async (name) => {
    if(!name) throw new Error('No se ha pasado ningun nombre...')

    try {
        let apiResponse = await axios(`https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${API_KEY}`)
        
        apiResponse = apiResponse.data
        const imageRequests = apiResponse.map(async (e) => {
            let imageId = e?.reference_image_id;
            if(imageId) {
                let res = await axios(`https://api.thedogapi.com/v1/images/${imageId}`);
                return res.data.url;
            }else return undefined
        });
        const imageResponses = await Promise.all(imageRequests);

        let dbRespose = await Dog.findAll({
            where:{
                name:{
                    [Op.iLike]: `%${name}%`
                }
            }
        })

        let result = apiResponse.map((dog, index) => ({
    
            ...dog,
            imagen: imageResponses[index],
            origin: dog?.origin,
            height: dog.height.metric,
            weight: dog.weight.metric === 'NaN' ? '10 - 15' : dog.weight.metric,
        }))

        let allSearchedDogs = [...dbRespose, ...result]
        if (allSearchedDogs.length === 0) {
            throw new Error('No hay perros con ese nombre')
        }
        return allSearchedDogs
        
    } catch (error) {
        throw new Error(error)
    }
};
const deleteDog = async(id) => {
  try {
      const dog = await Dog.findByPk(id);

      if(!dog) throw new Error('No hay perros con este id');

      await dog.destroy();

      return 'Se ha borrado el perro'
  } catch (error) {
      throw new Error('No hay perros con ese id')
  }
}
// //
const dbDogs = async() => {
  try {
      const dbDogs = await Dog.findAll();
      return dbDogs.length > 0 ? dbDogs : [], console.log("Lo siento, parece que no has creado ningun perro...")
  } catch (error) {
      throw new Error(error)
  }
}

module.exports = {
  getDogs,
  dbDogs,
  searchDogsByName,
  addDog,
  getDetail,
  getDogBreeds,
  deleteDog
};
