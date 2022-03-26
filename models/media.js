'use strict';
module.exports = (sequelize, DataTypes) => {
  const Media = sequelize.define('Media', {
    url: DataTypes.STRING,
    // contentid: DataTypes.INTEGER,
  }, {});

  // Media.associate = function(models) {
  //   Media.belongsTo(models.Content, {foreignKey: 'contentid'})
  // };
  return Media;
};
