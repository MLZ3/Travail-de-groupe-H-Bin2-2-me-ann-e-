const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const RendezVous = sequelize.define('RendezVous', {
   ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
    dateHeure: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  typeRendezVous: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  etatRendezVous: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = RendezVous;
