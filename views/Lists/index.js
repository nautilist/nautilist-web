var html = require('choo/html')
const styles = require('../../styles')
const NavbarTop = require('../../components/NavbarTop')
const Footer = require('../../components/Footer')
const MobileNavMenuModal = require('../../components/NavbarTop/components/MobileNavMenuModal')
const AddFeatureBtn = require('../../components/AddFeatureBtn')

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
            ${NavbarTop(state, emit)}
            <main class="${styles.main}">
                
            </main>
            ${Footer(state, emit)}
            ${MobileNavMenuModal(state, emit)}
        </body>
      `
  }
  
  function ListPage(state, emit){
      
      return html`
      <body class="${styles.body}">
      ${NavbarTop(state, emit)}
      <main class="${styles.main}">
          
      </main>
      ${Footer(state, emit)}
      ${MobileNavMenuModal(state, emit)}
      ${state.cache(AddFeatureBtn, 'AddFeatureBtn', state, emit).render()}
  </body>
      `
  }
  