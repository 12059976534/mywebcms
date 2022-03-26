'use strict';
module.exports = (sequelize, DataTypes) => {
  const Content = sequelize.define('Content', {
    title: DataTypes.STRING,
    deskripsi: DataTypes.TEXT,
    thumbnail: DataTypes.STRING,
    ContentkategoriId:DataTypes.INTEGER,
    UserId:DataTypes.INTEGER
  }, {});

  // Content.associate = function(models) {
  //   Content.hasMany(models.Media)
  // };
   
  Content.associate = function(models) {
    Content.belongsTo(models.Contentkategori, {foreignKey: 'ContentkategoriId', as: 'kategori'})
  };

  Content.associate = function(models) {
    Content.belongsTo(models.User, {foreignKey: 'UserId', as: 'user'})
  };

  return Content;
};  