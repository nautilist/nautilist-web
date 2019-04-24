var css = require('sheetify')
var choo = require('choo')

css('tachyons')

var app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
} else {
  app.use(require('choo-service-worker')())
}

// app.use(require('./stores/clicks'))
app.use(require('./stores/api'))
app.use(require('./stores/main'))
app.use(require('./stores/user'))
app.use(require('./stores/userPage'))
app.use(require('./stores/modals'))
app.use(require('./stores/listPage'))

app.route('/', require('./views/Home'))
app.route('/login', require('./views/Auth'))
app.route('/verify', require('./views/Auth'))
app.route('/verifyRedirect', require('./views/Auth'))
app.route('/reset', require('./views/Auth'))
app.route('/signup', require('./views/Auth'))


app.route('/browse', require('./views/Browse'))

app.route('/users', require('./views/Users'))
app.route('/users/:username', require('./views/Users'))

app.route('/links', require('./views/Links'))
app.route('/links/:_id', require('./views/Links'))

app.route('/lists', require('./views/Lists'))
app.route('/lists/:_id', require('./views/Lists'))

app.route('/*', require('./views/404'))

module.exports = app.mount('body')
