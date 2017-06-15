'use strict';
module.exports = function (sequelize, DataTypes) {
  const Message = sequelize.define('Message', {
    content: DataTypes.TEXT
  });
  return Message;
};
