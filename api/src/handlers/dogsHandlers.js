const {getDogs, getDetailDog, getDogsName, creatDog, dogsDataBase, deleteDog, getDogBreeds} = require ("../controllers/dogControllers")

const getDogsHandler = async(req, res) =>{
    try {
        const response = await getDogs()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
};

const getDogsIdHandler = async(req, res) =>{
    const {id} = req.params
    try {
        const response = await getDetailDog(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
};

const getDogsNameHandler = async(req, res) =>{
    const {name} = req.query    
    try {
        const response = await getDogsName(name)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({message: error.message})
    }
};

const postDogsHandler = async(req, res) =>{
    const perro = req.body
    try {
        const dog = await creatDog(perro)
        return res.status(201).json(dog)
    } catch (error) {
        return res.status(400).json(error.message)
    }
};

const getCreatedDogHandler = async(req, res) =>{
    try {
        const response = await dogsDataBase()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
};


const deleteDogsHandler = async(req, res) => {
    const {id} = req.params
    try {
        const request = await deleteDog(id)
        res.status(200).json(request)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
};

const putDogsHandler = async(req, res) => {
    const dog = req.body
    try {
        const request = await updateDog(dog)
        res.status(201).json(request)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
};

module.exports = {
    getDogsHandler, 
    getDogsIdHandler, 
    getDogsNameHandler, 
    getCreatedDogHandler, 
    postDogsHandler, 
    deleteDogsHandler, 
    putDogsHandler
};