const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Patient = sequelize.define('Patient', {
  MedecinResponsable: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ID: {
    type: DataTypes.INTEGER,
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
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Dosage: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Prescription;
