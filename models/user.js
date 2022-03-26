'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    imageprofile: DataTypes.STRING,
    pekrjaan_jabatan: DataTypes.STRING,
    // contentid: DataTypes.INTEGER,
  }, {});

  User.associate = function(models) {
    User.hasMany(models.Content,{as: 'content'})
  };

  // Media.associate = function(models) {
  //   Media.belongsTo(models.Content, {foreignKey: 'contentid'})
  // };
  return User;
};
