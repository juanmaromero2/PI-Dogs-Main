const { Router } = require('express');
// Importar todos los routers;
const dogsRouter = require("./routes/dogsRoutes");
const temperamentsRouter = require("./routes/temperamentsRoutes")

const mainRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
mainRouter.use('/dogs', dogsRouter);

mainRouter.use('/temperaments', temperamentsRouter);

module.exports = mainRouter;