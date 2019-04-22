var html = require('choo/html')
const styles = require('../../styles')
const Footer = require('../../components/Footer')
const AddFeatureBtn = require('../../components/AddFeatureBtn')
var TITLE = 'nautilists - Getting Started'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="${styles.body}">
      ${state.cache(AddFeatureBtn, 'AddFeatureBtn', state, emit).render()}
    </body>
  `
}
