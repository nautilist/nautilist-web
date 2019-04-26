var html = require('choo/html')
const UsersPage = require('./components/UsersPage')
const UserPage = require('./components/UserPage')

var TITLE = 'nautilists - user'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  // return html`
  // <body onload=${() => emit('USERS_FIND')}>
  //   ${state.route}
  // </body>
  // `
  switch(state.route){
    case 'users':
        return UsersPage(state, emit);
    case 'users/:username':
        return UserPage(state, emit);
    default:
        return html`<body>nothing found</body>`
  }
}

