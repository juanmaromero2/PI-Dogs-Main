const axios = require('axios');
const { Dog } = require('../db');
const { Op } = require('sequelize');
const { API_KEY } = process.env;
///controller que trae todos los perros
const getDogs = async () =>{
  let allDogs = []
  try {
      let {data} = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
      const dogsApi = data.map((dog) => {
        if(dog.reference_image_id === 'B12uzg9V7' || dog.reference_image_id === '_Qf9nfRzL'|| dog.reference_image_id === 'HkC31gcNm'){
          dog.reference_image_id = 'H1oLMe94m';
        }
        if(dog.temperament === undefined){
          dog.temperament = "Perro amigable"
        }
        return({
          id: dog.id,
          name: dog.name,
          imagen: `https://cdn2.thedogapi.com/images/${dog?.reference_image_id}.jpg`,
          height: dog.height?.metric,
          weight: dog.weight?.metric,// === 'NaN' ? '10 - 15' : dog.weight.metric,
          life_span: dog?.life_span,
          breed_for: dog?.bred_for,
          breed_group: dog?.breed_group,
          origin: dog?.origin,
          temperament: dog?.temperament,
        })
      })
      const dogsDataBase = await Dog.findAll()
      allDogs = [...dogsDataBase, ...dogsApi].sort((a, b) => a.name.localeCompare(b.name))
      return allDogs
  } catch (error) {
      throw new Error(error.message)
  }
};
///controller que busca por id
const getDetailDog = async (id) =>{
  try {
    if(id.length > 3){
      let allDogs = await getDogs();
      let result = allDogs.filter((dog) => dog.id === id);
      if(result.length){
        const formattedDog = {
          id: result[0].id,
          name: result[0].name,
          imagen: result[0].imagen,
          height: result[0].altura,
          weight: result[0].peso,
          life_span: result[0].life_span,
          temperament: result[0].temperament,
        }
        return formattedDog
      }
    } else{
      const dogData = (await axios.get(`https://api.thedogapi.com/v1/breeds/${id}?api_key=${API_KEY}`)).data
      if(dogData.temperament === undefined){
        dogData.temperament = "Perro amigable"
      }
      const formattedDog = {
        id: dogData.id,
        name: dogData.name,
        imagen: `https://cdn2.thedogapi.com/images/${dogData.reference_image_id}.jpg`,
        height: dogData.height.metric,
        weight: dogData.weight.metric,// === 'NaN' ? '10 - 15' : dogData.weight.metric,
        life_span: dogData.life_span,
        breed_for: dogData.bred_for,
        breed_group: dogData.breed_group,
        origin: dogData.origin,
        temperament: dogData?.temperament,
      }
      return formattedDog;
    }
  } catch (error) {
      throw new Error(error.message)
    }
};
///controller que busca perros por nombre
const getDogsName = async (name) => {
  if(!name) throw new Error('Ingrese un nombre')
  try {
    let apiResponse = (await axios(`https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${API_KEY}`)).data
    const imageRequests = apiResponse.map(async (element) => {
      let imageId = element?.reference_image_id
      if(imageId) {
        let res = await axios(`https://api.thedogapi.com/v1/images/${imageId}`)
        return res.data.url
      }else return undefined
      })
    const imageResponses = await Promise.all(imageRequests)
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
      weight: dog.weight.metric,// === 'NaN' ? '10 - 15' : dog.weight.metric,
    }))
    let allSearchDogs = [...dbRespose, ...result]
    if (allSearchDogs.length === 0) {
      throw new Error('No se encontraron perros con el nombre ingresado')
    }
    return allSearchDogs
  } catch (error) {
    throw new Error(error)
  }
};
///controller para crear un perro
const creatDog = async(dog) =>{
  if(!dog.name || !dog.imagen || !dog.peso || !dog.altura || !dog.life_span || !dog.temperament) throw new Error('Complete todos los datos')
  try {
    const newDog = await Dog.create({
      imagen: dog.imagen,
      name: dog.name,
      altura: dog.altura,
      peso: dog.peso,
      life_span: dog.life_span,
      temperament: dog.temperament,
    })
    await newDog.save()
    const allDogs = await Dog.findAll()
    return allDogs
  } catch (error) {
    throw new Error('Error al crear un nuevo perro')
  }
};
///controller que busca en la base de datos
const dogsDataBase = async() => {
  try {
    const dogsDataBase = await Dog.findAll()
    return dogsDataBase.length > 0 ? dogsDataBase : []
  } catch (error) {
    throw new Error(error)
  }
};
/// controller para borrar un perro
const deleteDog = async(id) => {
  try {
    const dog = await Dog.findByPk(id);
    if(!dog) throw new Error('No se encontraron perros');
    await dog.destroy();
    return 'Perro eliminado con éxito'
  } catch (error) {
    throw new Error('No se encontraron perros')
  }
};

// const getDogBreeds = async (req, res) => {
//     try {
      
//       const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
  
//       const dogData = response.data;
  
//       const seenBreeds = {};
      
//       // Mapea los datos y extrae solo la información necesaria
//       const breeds = dogData.reduce((accumulator, dog) => {
//         const breed = dog.breed_group;
  
//         // Verifica si ya hemos visto esta raza antes
//         if (!seenBreeds[breed]) {
//           seenBreeds[breed] = true;
  
//           // Agrega la raza al arreglo resultante
//           accumulator.push({
//             breed: breed,
//           });
//         }
  
//         return accumulator;
//       }, []);
  
//       // Responde con el arreglo de razas de perro
//       res.json(breeds);
  
//     } catch (error) {
//       console.error('Error al obtener las razas de perro desde la API:', error);
//       res.status(500).json({ error: 'Hubo un error al obtener las razas de perro.' });
//     }
//   };

module.exports = {
  getDogs,
  getDetailDog,
  getDogsName,
  creatDog,
  dogsDataBase,
  deleteDog,
  //getDogBreeds,
};