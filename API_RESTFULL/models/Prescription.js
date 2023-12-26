const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Patient = sequelize.define('Patient', {
  MedecinResponsable: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ID: {
    type: DataTypes.INT,
    allowNull: false,
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateDeLordonnance: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  MedicamentPrescrit: {
    type: DataTypes.STRING,
  },
  DuréeDuTraitement: {
    type: DataTypes.INT,
    allowNull: false,
  },
  Dosage: {
    type: DataTypes.INT,
    allowNull: false,
  },
});

module.exports = Patient;
