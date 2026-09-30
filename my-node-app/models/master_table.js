'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Master_table extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Master_table.init({
    fieldName: DataTypes.STRING,
    fieldType: DataTypes.STRING,
    fieldValue: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Master_table',
  });
  return Master_table;
};