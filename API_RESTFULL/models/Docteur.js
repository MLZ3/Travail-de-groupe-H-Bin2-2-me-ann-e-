const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const docteur = sequelize.define('docteur', {
  nom: {
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
  numéroDeLicence: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  specialitéMedical: {
    type: DataTypes.TEXT,
  },
  HoraireDeTravail: {
    type: DataTypes.STRING,
  },
  listeDesPatients: {
    type: DataTypes.STRING,
  },
});

module.exports = docteur;
