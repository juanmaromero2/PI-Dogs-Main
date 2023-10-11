const {getTemperaments} = require("../controllers/tempControllers");

const getTemperamentsHandler = async(req, res) =>{
    try{
        const response = await getTemperaments();
        return res.status(200).json(response)
    } catch(error){
        return res.status(400).json(error.message)
    }
};

module.exports = {getTemperamentsHandler};