'use strict';

const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class UserController extends Controller {

  // 全部查找
  async index() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    ctx.body = await ctx.model.User.findAll(query);
  }

  // 查找一个
  async show() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    ctx.body = await ctx.model.User.findOne({
      where:{
        id: id,
      }
    });
  }
  
  // 添加
  async create() {
    const ctx = this.ctx;
    let { name, age } = ctx.request.query;
    age = toInt(age);
    const user = await ctx.model.User.create({ name, age });
    ctx.status = 201;
    ctx.body = user;
  }

  // 更新
  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const user = await ctx.model.User.findOne({
      where: {
        id: id,
      }
    });
    if (!user) {
      ctx.status = 404;
      return;
    }

    let { name, age } = ctx.request.query;
    age = toInt(age);
    await user.update({ name, age });
    ctx.body = user;
  }

  // 删除
  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const user = await ctx.model.User.findOne({
      where: {
        id: id,
      }
    });
    if (!user) {
      ctx.status = 404;
      return;
    }

    await user.destroy();
    ctx.status = 200;
    ctx.body = `id为${id}的user已删除`;
  }
}

module.exports = UserController;