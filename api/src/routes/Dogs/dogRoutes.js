const {getDogsHandler, getDogsIdHandler, getDogsNameHandler, getCreatedDogHandler, postDogsHandler, deleteDogsHandler, putDogsHandler} = require("../../handlers/dogsHandlers");
const router = require("express").Router();

router.get('/', getDogsHandler);

router.get('/:id', getDogsIdHandler);

router.get('/s/name', getDogsNameHandler);

router.get('/created', getCreatedDogHandler);

router.post('/', postDogsHandler);

router.delete('/:id', deleteDogsHandler);

router.put('/update', putDogsHandler);

module.exports = router;