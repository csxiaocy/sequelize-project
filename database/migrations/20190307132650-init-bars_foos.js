'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 bars foos 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, BOOLEAN, NOW } = Sequelize;
    await queryInterface.createTable('bars', {
      id: { type: INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: STRING, allowNull: false },
      created_at: DATE,
      updated_at: DATE,
    });
    await queryInterface.createTable('foos', {
      flag: { type: BOOLEAN, allowNull: false, defaultValue: true },
      mydate: { type: DATE, defaultValue: NOW },
      title: { type: STRING, allowNull: true },
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      bar_id: {
        type: INTEGER, references: { model: 'bars', key: 'id' },
        onUpdate: 'CASCADE', onDelete: 'CASCADE',
      },
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('foos');
    await queryInterface.dropTable('bars');
  },
};