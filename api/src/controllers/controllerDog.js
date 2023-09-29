const axios = require('axios');
const { Dog, Temperament } = require('../db');
const { Op } = require('sequelize');
const {API_KEY} = process.env;
//require('dotenv').config();
///////// funcion que trae todos los perros
const getDogs = async () =>{
  let allDogs = []
  try {
    let {data} = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    const dogsApi = data.map((dog) => {
      return({
        id: dog.id,
        name: dog.name,
        imagen: dog.image?.url,
        altura: dog.height.metric,
        peso: dog.weight.metric,
        life_span: dog.life_span,
        temperament: dog?.temperament,
      })
    })
    const dogsDataBase = await Dog.findAll()
    allDogs = [...dogsDataBase, ...dogsApi]
    return allDogs
    } catch (error) {
      throw new Error(error.message)
      }
};
////////funcion que busca perros por id
const dogId = async (id) =>{
  try{
    const dogDataBase = await Dog.findByPk(id);
    if(dogDataBase){
      return dogDataBase
    } else{
      const foundDog = (await axios.get(`https://api.thedogapi.com/v1/breeds/${id}?api_key=${API_KEY}`)).data;
      if(foundDog){
        return foundDog
      } else{
        throw new Error("No se encontro el perro con el Id: ${id}")
      }
    }
  }catch (error) {
    throw new Error(error.message)
  }
};
//////////funcion que trae las razas de perros por nombre
const dogName = async (name) => {
  try {
    if(!name) throw new Error('No ha ingresado un nombre.')
      let nameDataBase = await Dog.findAll({
        where:{
          name:{
            [Op.iLike]: `%${name}%`,
          }
        }
      })
      let response = (await axios(`https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${API_KEY}`)).data
      let foundName = response.map((dog) => ({
        ...dog,
        name: dog.name
      }))
      if (!nameDataBase && !foundName) {
        throw new Error('No se encontró ningún perro con ese nombre.')
      }
      return dogsName = [...nameDataBase, ...foundName]
  } catch (error) {
    throw new Error(error.message)
    }
};
// //
// const createDog = async (req, res) => {
//   const { Nombre, Altura, Peso, Anios_de_vida, Temperamentos } = req.body;

//   try {
//     // Crea la raza de perro en la base de datos
//     const newDog = await Dog.create({
//       Nombre,
//       Altura,
//       Peso,
//       Anios_de_vida,
//     });

//     // Relaciona la raza de perro con los temperamentos asociados
//     if (Temperamentos && Temperamentos.length > 0) {
//       const temperaments = await Temperament.findAll({
//         where: {
//           Nombre: Temperamentos,
//         },
//       });

//       await newDog.setTemperaments(temperaments);
//     }

//     res.status(201).json({ message: 'Raza de perro creada exitosamente' });
//   } catch (error) {
//     console.error('Error al crear la raza de perro:', error);
//     res.status(500).json({ error: 'Hubo un error al crear la raza de perro.' });
//   }
// };

module.exports = {
  //createDog,
  //searchDogsByName,
  //dogDetail,
  getDogs,
  dogId,
  dogName,
};

/////////////////////

// const addDog = async(dog) =>{
//   if(!dog.name || !dog.imagen || !dog.peso || !dog.altura || !dog.life_span) throw new Error('Faltan datos')
//   try {
//       const newDog = await Dog.create(dog)

//       const temperamentsPk = dog.temperament.split(', ')
//       for (const pk of temperamentsPk){
//           const temp = await Temperament.findByPk(pk)
//           await newDog.addTemperament(temp)
//       }

//       newDog.temperamentPk = newDog.temperament

//       const temp = await newDog.getTemperaments();
//       const tempNames = temp.map(temp => temp.nombre);
//       newDog.temperament = tempNames.join(', ');
//       await newDog.save()

//       const allDogs = await Dog.findAll()

//       return allDogs
//   } catch (error) {
//       throw new Error('No se pudo crear el perro')
//   }
// }

// const getDogBreeds = async (req, res) => {
//     try {
      
//       const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${apikey}`);
  
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
// // //
// const searchDogsByName = async (name) => {
//     if(!name) throw new Error('No se ha pasado ningun nombre...')

//     try {
//         let apiResponse = await axios(`https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${apikey}`)
        
//         apiResponse = apiResponse.data
        
//         const imageRequests = apiResponse.map(async (e) => {
//             let imageId = e?.reference_image_id;
//             if(imageId) {
//                 let res = await axios(`https://api.thedogapi.com/v1/images/${imageId}`);
//                 return res.data.url;
//             }else return undefined
//         });
//         const imageResponses = await Promise.all(imageRequests);

//         let dbRespose = await Dog.findAll({
//             where:{
//                 name:{
//                     [Op.iLike]: `%${name}%`
//                 }
//             }
//         })
        
//         let result = apiResponse.map((dog, index) => ({
//             ...dog,
//             imagen: imageResponses[index],
//             peso: dog.weight?.metric,
//             altura: dog.height?.metric
//         }))

//         let allSearchedDogs = [...dbRespose, ...result]
//         if (allSearchedDogs.length === 0) {
//             throw new Error('No hay perros con ese nombre')
//         }
//         return allSearchedDogs
//     } catch (error) {
//         throw new Error(error)
//     }
// };
// const updateDog = async(dog) => {
//   if(!dog.name || !dog.imagen || !dog.peso || !dog.altura || !dog.life_span) throw new Error('Faltan datos')
//   try {
//       const updateDog = await Dog.findByPk(dog.id)
//       await updateDog.setTemperaments([])

//       const temperamentsPk = dog.temperament.split(', ')
//       for (const pk of temperamentsPk){
//           const temp = await Temperament.findByPk(pk)
//           await updateDog.addTemperament(temp)
//       }

      
//       const temperaments = await updateDog.getTemperaments();
//       const temperamentNames = temperaments.map(temp => temp.nombre);
//       updateDog.temperament = temperamentNames.join(', ');
      

//       updateDog.name = dog.name;
//       updateDog.imagen = dog.imagen;
//       updateDog.altura = dog.altura;
//       updateDog.peso = dog.peso;
//       updateDog.life_span = dog.life_span;
//       updateDog.temperamentPk = dog.temperament
      

//       await updateDog.save()


//       const allDogs = await Dog.findAll()

//       return allDogs
//   } catch (error) {
//       throw new Error('No se pudo editar el perro')
//   }
// }
// const deleteDog = async(id) => {
//   try {
//       const dog = await Dog.findByPk(id);

//       if(!dog) throw new Error('There is no dog with this id');

//       await dog.destroy();

//       return 'Dog successfully deleted'
//   } catch (error) {
//       throw new Error('There is no dog with this id')
//   }
// }
// // //
// const dbDogs = async() => {
//   try {
//       const dbDogs = await Dog.findAll();
//       return dbDogs.length > 0 ? dbDogs : [], console.log("Lo siento, parece que no has creado ningun perro...")
//   } catch (error) {
//       throw new Error(error)
//   }
// }

// module.exports = {
//   getAllDogs,
//   dbDogs,
//   searchDogsByName,
//   addDog,
//   getDetail,
//   updateDog,
//   getDogBreeds,
//   deleteDog
// };