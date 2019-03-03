'use strict';

const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class MulController extends Controller {

  // 多表查询
  async check() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    ctx.body = await ctx.model.Foo.findOne({
      attributes: ['flag', 'myDate', 'title'],
      include: [{
        model: ctx.model.Bar,
        attributes: ['name'],
      }],
      where: {
        id: id
      }
    });
  };
}

module.exports = MulController;