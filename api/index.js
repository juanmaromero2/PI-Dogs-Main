const server = require('./app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: false }).then(() => { //  CAMBIAR EL FORCE A FALSE CUANDO QUIERA QUE SE GUARDEN LOS DATOS EN LA BASE DE DATOS
  server.listen(3001, () => {
    console.log('listening at 3001'); // eslint-disable-line no-console
  });
});