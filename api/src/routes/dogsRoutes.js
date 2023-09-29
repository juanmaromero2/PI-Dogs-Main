const {getDogsHandler,getDogsId,getDogsCreat,getDogsName,postDogs,deleteDogsId,putDogsUpdate} = require("../handlers/dogshandler");
const {Router} = require("express");

const dogsRouter = Router();

///aca tendria que poner la ruta y llamar al handler : dogsRouter.get('/', "handler")

dogsRouter.get('/', getDogsHandler);

dogsRouter.get('/:id', getDogsId);

dogsRouter.get('/name', getDogsName);

//dogsRouter.post('/dogs', postDogs);

//dogsRouter.delete('/:id', deleteDogsId);

//dogsRouter.put('/update', putDogsUpdate);

//dogsRouter.get('/creat', getDogsCreat);
module.exports = dogsRouter;