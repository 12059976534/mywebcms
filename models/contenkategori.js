'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contentkategori = sequelize.define('Contentkategori', {
    kategoriname: {
            type:DataTypes.STRING,
            unique: true
    }
  }, {});

  Contentkategori.associate = function(models) {
    Contentkategori.hasMany(models.Content,{as: 'content'})
  };

  return Contentkategori;
};  