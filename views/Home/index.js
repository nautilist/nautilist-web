var html = require('choo/html')
const styles = require('../../styles')

var TITLE = 'nautilists - home'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="${styles.body}">
      
    </body>
  `
}
