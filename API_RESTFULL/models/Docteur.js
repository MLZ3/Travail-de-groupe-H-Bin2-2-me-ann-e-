const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Docteur = sequelize.define('Docteur', {
  nom: {
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

module.exports = Docteur;
