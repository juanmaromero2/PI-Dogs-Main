const express = require("express");
const {getTemperaments} = require("../handlers/temperamentshandler");
const {Router} = require("express");

const temperamentsRouter = Router();

temperamentsRouter.get('/temperaments', getTemperaments);

module.exports = temperamentsRouter;