const express = require("express");
const router = express.Router();
const tempControlller = require("../../controllers/tempControllers");

router.get('/', async(req, res) =>{
    try{
        const response = await tempControlller.getTemperaments();
        return res.status(200).json(response)
    } catch(error){
        return res.status(400).json(error.message)
    }
})
module.exports = router;