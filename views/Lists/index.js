var html = require('choo/html')
const styles = require('../../styles')
var TITLE = 'nautilists - lists'

module.exports = view

function view (state, emit) {
    if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  
    switch(state.route){
      case 'lists':
          return ListsPage(state, emit);
          break;
      case 'lists/:username':
          return ListPage(state, emit);
          break;
      default:
          return html`<body>nothing found</body>`
    }
  }
  
  
  function ListsPage(state, emit){
  
      return html`
          <body class="${styles.body}">
              Lists Page!
          </body>
      `
  }
  
  function ListPage(state, emit){
      
      return html`
          <body class="${styles.body}">
              List Page!
          </body>
      `
  }
  