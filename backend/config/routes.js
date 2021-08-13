const admin = require('./admin')

module.exports = app => {
  // rotas de autenticação
  app.post('/signup', app.api.user.save)
  app.post('/signin', app.api.auth.signin)
  app.post('/validateToken', app.api.auth.validateToken)

  // -----------------------------------------------------------
  // rotas de usuario
  app.route('/users').all(app.config.passport.autenticate())
    .get(admin(app.api.user.get))
    .post(admin(app.api.user.save))
  // usuarios por id
  app.route('/users/:id').all(app.config.passport.autenticate())
    .get(admin(app.api.user.getByID))
    .put(admin(app.api.user.save))
    .delete(admin(app.api.user.remove))
  
  // -----------------------------------------------------------
  // rotas de categorias
  app.route('/categories').all(app.config.passport.autenticate())
    .get(admin(app.api.category.get))
    .post(admin(app.api.category.save))
  // categorias em arvore
  app.route('/categories/tree').all(app.config.passport.autenticate())
    .get(app.api.category.getTree)
  // categorias por id
  app.route('/categories/:id').all(app.config.passport.autenticate())
    .get(app.api.category.getByID)
    .put(admin(app.api.category.save))
    .delete(admin(app.api.category.remove))

  // -----------------------------------------------------------
  // rotas de artigos
  app.route('/articles').all(app.config.passport.autenticate())
    .get(admin(app.api.article.get))
    .post(admin(app.api.article.save))
  // artigos por id
  app.route('/articles/:id').all(app.config.passport.autenticate())
    .get(app.api.article.getByID)
    .put(admin(app.api.article.save))
    .delete(admin(app.api.article.remove))
  // artigos por categoria
  app.route('/categories/:id/articles').all(app.config.passport.autenticate())
    .get(app.api.article.getByCategory)

  // -----------------------------------------------------------
  // rota de estatisticas
  app.route('/stats').all(app.config.passport.autenticate())
    .get(app.api.stat.get)
}