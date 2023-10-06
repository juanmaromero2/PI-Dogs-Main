const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // Define el modelo Dog
  sequelize.define('Dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    altura: {
      type: DataTypes.STRING,
    },
    peso: {
      type: DataTypes.STRING,
    },
    life_span: {
      type: DataTypes.STRING,
    },
    temperament:{
      type: DataTypes.STRING,
      allowNull: false
    },
    temperamentPk:{
      type: DataTypes.TEXT,
      allowNull: true,
    }
  });
};
