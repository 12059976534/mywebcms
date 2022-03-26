'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    rolename: DataTypes.STRING,
    // contentid: DataTypes.INTEGER,
  }, {});

  // Media.associate = function(models) {
  //   Media.belongsTo(models.Content, {foreignKey: 'contentid'})
  // };
  return Role;
};
