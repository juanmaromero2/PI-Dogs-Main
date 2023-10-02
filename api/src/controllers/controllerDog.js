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
    const foundDog = (await axios.get(`https://api.thedogapi.com/v1/breeds/${id}?api_key=${API_KEY}`)).data;
    if(foundDog){
      return foundDog
    } else{
        throw new Error("No se encontro el perro con el Id: ${id}")
      }
  }catch (error) {
    throw new Error(error.message)
  }
};
// const dogId = async (id,source) => {
//   try {
//     const foundDog = source === "api"
//     ? (await axios.get(`https://api.thedogapi.com/v1/breeds/${id}?api_key=${API_KEY}`)).data
//     : await Dog.findByPk(id)
//     return foundDog
//   } catch (error) {
//     throw new Error(error.message)
//   }
// };
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
      const dogsName = [...nameDataBase, ...foundName]
      return dogsName
  } catch (error) {
    throw new Error(error.message)
    }
};
//////////funcion para crear un nuevo perro (post)
const dogCreated = async(dog) => {
  if (!dog.name || !dog.imagen || !dog.peso || !dog.altura || !dog.lifeSpan) throw new Error('Faltan datos')
  try {
    const newDog = await Dog.create(dog)
    const temperamentsArray = await dog.temperament.split(', ')
    for (const tempName of temperamentsArray){
      const temp = await Temperament.findOne({
        where: {
          nombre: tempName,
        },
      })
      if (temp) {
        await newDog.addTemperament(temp);
      }
    }
    const Temperaments = await newDog.getTemperaments()
    const temperamentName = Temperaments.map(temp => temp.nombre)
    newDog.temperament = temperamentName.join(', ')
    await newDog.save()
    const allDogs = await Dog.findAll()
    return allDogs
  } catch (error) {
    console.error("error al crear",error.message)
    throw new Error('No se pudo crear el perro')
  }
};

// const dogCreated = async (req, res) => {
//   const { imagen, name, altura, peso, lifeSpan, temperament } = req.body
//   try {
//     // Verifica que se proporcionen todos los datos necesarios
//     if (!imagen || !name || !altura || !peso || !lifeSpan || !temperament) throw new Error('Faltan datos')
//     // Divide los temperamentos proporcionados por coma y elimina espacios en blanco
//     const temperaments = temperament.split(',').map((temp) => temp.trim())
//     // Busca los temperamentos en la base de datos
//     const foundTemperaments = await Temperament.findAll({
//       where: {
//         Nombre: {
//           [Op.in]: temperaments, // Busca temperamentos cuyos nombres estén en la lista proporcionada
//         },
//       },
//     })
//     // Crea el nuevo perro en la base de datos
//     const newDog = await Dog.create({
//       imagen,
//       name,
//       altura,
//       peso,
//       lifeSpan,
//     })
//     // Relaciona el perro con los temperamentos encontrados
//     await newDog.setTemperaments(foundTemperaments)
//     console.log("creado exitosamente")
//     return newDog
//   } catch (error) {
//     console.error('Error al crear la raza de perro:', error)
//     throw new Error(error.message)
//   }
// };

module.exports = {
  getDogs,
  dogId,
  dogName,
  dogCreated
};

/////////////////////



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

// const getDetail = async (id) =>{
//   try {
//       const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${apikey}`);

//       const data = response.data;

//       let result = data.filter(dog => dog.id == id)
//       if(result.length > 0) return result[0]

//       throw new Error('No se encontro ese perro')

//   } catch (error) {
//       throw new Error(error.message)
//   }
// }
// const deleteDog = async(id) => {
//   try {
//       const dog = await Dog.findByPk(id);

//       if(!dog) throw new Error('No hay perros con este id');

//       await dog.destroy();

//       return 'Se ha borrado el perro'
//   } catch (error) {
//       throw new Error('No hay perros con ese id')
//   }
// }
// const dbDogs = async() => {
//   try {
//       const dbDogs = await Dog.findAll();
//       return dbDogs.length > 0 ? dbDogs : [], console.log("Lo siento, parece que no has creado ningun perro...")
//   } catch (error) {
//       throw new Error(error)
//   }
// }