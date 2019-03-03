'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/user', controller.users.index);
  router.get('/finduser/:id', controller.users.show);
  router.get('/add', controller.users.create);
  router.get('/update/:id', controller.users.update);
  router.get('/delete/:id', controller.users.destroy);
  router.get('/mulcheck/:id', controller.multi.check);
};
