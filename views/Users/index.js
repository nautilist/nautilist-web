var html = require('choo/html')
const styles = require('../../styles')
const NavbarTop = require('../../components/NavbarTop')
const MobileNavMenuModal = require('../../components/NavbarTop/components/MobileNavMenuModal')

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
        <footer class=${styles.footer}>footer</footer>
    </body>
    `
}

function UserPage(state, emit){
    
    return html`
        <body class="${styles.body}">
            ${NavbarTop(state, emit)}
            <main class="${styles.main}">
                <div class="outline h4 bg-moon-gray mt2 mb2"></div>
                <div class="outline h4 bg-moon-gray mt2 mb2"></div>
                <div class="outline h4 bg-moon-gray mt2 mb2"></div>
                <div class="outline h4 bg-moon-gray mt2 mb2"></div>
            </main>
            <footer class=${styles.footer}>footer</footer>
            ${MobileNavMenuModal(state, emit)}
        </body>
    `
}

