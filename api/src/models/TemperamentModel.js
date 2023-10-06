const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // Define el modelo Temperament
  sequelize.define('Temperament', {
    ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
