'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Bar = app.model.define('bar', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: STRING,
      allowNull: false
    },
    created_at: DATE,
    updated_at: DATE,
  });
  return Bar;
};