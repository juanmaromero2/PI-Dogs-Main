const {getTemperament} = require("../controllers/controllerTemper");

const getTemperaments = async(req, res) =>{
    try{
        const response = await getTemperament(req, res);
        return res.status(200).json(response)
    } catch(error){
        return res.status(400).json(error.message)
    }
};

module.exports = {getTemperaments}