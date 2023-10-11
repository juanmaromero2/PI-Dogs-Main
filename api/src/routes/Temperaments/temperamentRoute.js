const express = require("express");
const router = express.Router();
const {getTemperamentsHandler} = require("../../handlers/temperamentsHandler");

router.get('/', getTemperamentsHandler);

module.exports = router;