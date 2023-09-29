const {getDogs, dogId, dogName} = require("../controllers/controllerDog");
/// handler que trae todos los perros
const getDogsHandler = async(req, res) =>{
    try {
        const response = await getDogs(req, res)
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
};
/// handler que busca perros por id
const getDogsId = async(req, res) =>{
    const {id} = req.params
    try {
        const response = await dogId(id)
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
};
///handler que busca perros por nombre
const getDogsName = async(req, res) =>{
    const {name} = req.query
    try {
        const response = await dogName(name)
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
};
/// handler que crea un perro
const postDogs =  async(req, res) =>{
    const perro = req.body
    try {
        const dog = await dogsController.addDog(perro)
        return res.status(201).json(dog)
    } catch (error) {
        return res.status(400).json(error.message)
    }
};
// const getDogsCreat = async(req, res) =>{
//     try {
//         const response = await dogsController.getCreated()
//         return res.status(200).json(response)
//     } catch (error) {
//         return res.status(400).json({error: error.message})
//     }
// };

// const deleteDogsId = async(req, res) => {
//     const {id} = req.params
//     try {
//         const request = await dogsController.deleteDog(id)
//         res.status(200).json(request)
//     } catch (error) {
//         res.status(404).json({message: error.message})
//     }
// };

// const putDogsUpdate = async(req, res) => {
//     const dog = req.body
//     try {
//         const request = await dogsController.updateDog(dog)
//         res.status(201).json(request)
//     } catch (error) {
//         res.status(400).json({message: error.message})
//     }
// };

module.exports = {
    getDogsHandler,
    getDogsId,
    getDogsName,
    postDogs,
}