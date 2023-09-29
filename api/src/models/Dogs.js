const { DataTypes} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    imagen: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    altura: {
      type: DataTypes.DECIMAL
    },
    peso: {
      type: DataTypes.DECIMAL
    },
    lifeSpan: {
      type: DataTypes.INTEGER
    }
  });
};
