const { DataTypes } = require('sequelize');
const sequelize = require('./your-sequelize-instance');

const RendezVous = sequelize.define('RendezVous', {
   ID: {
    type: DataTypes.INT,
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
