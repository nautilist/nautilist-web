var html = require('choo/html')
const styles = require('../../styles')
const NavbarTop = require('../../components/NavbarTop')
const MobileNavMenuModal = require('../../components/NavbarTop/components/MobileNavMenuModal')
const Footer = require('../../components/Footer')

var TITLE = 'nautilists - browse'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

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
