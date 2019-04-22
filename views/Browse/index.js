var html = require('choo/html')
const styles = require('../../styles')
const NavbarTop = require('../../components/NavbarTop')
const MobileNavMenuModal = require('../../components/NavbarTop/components/MobileNavMenuModal')
const Footer = require('../../components/Footer')
const AddFeatureBtn = require('../../components/AddFeatureBtn')
const AddLinkModal = require('../../components/AddLinkModal')
const AddListModal = require('../../components/AddListModal')

const BrowseCategoriesSection = require('./components/BrowseCategoriesSection')

var TITLE = 'nautilists - browse'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
  <body class="${styles.body}">
  ${NavbarTop(state, emit)}
  <main class="${styles.main}">
      ${BrowseCategoriesSection(state, emit)}
  </main>
  ${Footer(state, emit)}
  ${MobileNavMenuModal(state, emit)}
  ${state.cache(AddFeatureBtn, 'AddFeatureBtn', state, emit).render()}
  ${AddLinkModal(state, emit)}
  ${AddListModal(state, emit)}
</body>
  `
}
