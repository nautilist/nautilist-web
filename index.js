var css = require('sheetify')
var choo = require('choo')

css('tachyons')

var app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
} else {
  app.use(require('choo-service-worker')())
}

app.use(require('./stores/clicks'))

app.route('/', require('./views/Home'))
app.route('/users', require('./views/Users'))
app.route('/users/:username', require('./views/Users'))

app.route('/lists', require('./views/Lists'))
app.route('/lists/:id', require('./views/Lists'))

app.route('/*', require('./views/404'))

module.exports = app.mount('body')
