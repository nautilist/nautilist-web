var html = require('choo/html')
const styles = require('../../styles')
const NavbarTop = require('../../components/NavbarTop')
const MobileNavMenuModal = require('../../components/NavbarTop/components/MobileNavMenuModal')
const Footer = require('../../components/Footer')


var TITLE = 'nautilists - user'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  switch(state.route){
    case 'users':
        return UsersPage(state, emit);
        break;
    case 'users/:username':
        return UserPage(state, emit);
        break;
    default:
        return html`<body>nothing found</body>`
  }
}


function UsersPage(state, emit){

    return html`
    <body class="${styles.body}">
            ${NavbarTop(state, emit)}
            <main class="${styles.main}">
                
            </main>
            ${Footer(state, emit)}
            ${MobileNavMenuModal(state, emit)}
        </body>
    `
}

function UserPage(state, emit){
    
    return html`
        <body class="${styles.body}">
            ${NavbarTop(state, emit)}
            <main class="${styles.main}">
                
            </main>
            ${Footer(state, emit)}
            ${MobileNavMenuModal(state, emit)}
        </body>
    `
}

