'use strict';

module.exports = app => {
  const { BOOLEAN, STRING, NOW, INTEGER, DATE } = app.Sequelize;

  const Foo = app.model.define('foo', {
    flag: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    mydate: {
      type: DATE,
      defaultValue: NOW
    },
    title: {
      type: STRING,
      allowNull: true,
    },
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bar_id: { // 外键
      type: INTEGER,
      references: {
        model: app.model.Bar,
        key: 'id'
      }
    },
    created_at: DATE,
    updated_at: DATE,
  });

  Foo.associate = () => {
    Foo.belongsTo(app.model.Bar, { foreignKey: 'bar_id' });
  };

  return Foo;
};