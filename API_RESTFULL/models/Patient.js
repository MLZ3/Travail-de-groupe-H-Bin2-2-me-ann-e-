const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Patient = sequelize.define('Patient', {
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
  dateDeNaissance: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  sexe: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  groupeSanguin: {
    type: DataTypes.STRING,
  },
  historiqueMedical: {
    type: DataTypes.TEXT,
  },
  allergies: {
    type: DataTypes.TEXT,
  },
  listeMedicamentsEnCours: {
    type: DataTypes.TEXT,
  },
});

module.exports = Patient;
