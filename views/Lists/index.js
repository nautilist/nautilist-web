var html = require('choo/html')
const styles = require('../../styles')
const NavbarTop = require('../../components/NavbarTop')
const Footer = require('../../components/Footer')
const MobileNavMenuModal = require('../../components/NavbarTop/components/MobileNavMenuModal')
const AddFeatureBtn = require('../../components/AddFeatureBtn')

const ListsPage = require('./components/ListsPage')
const ListPage = require('./components/ListPage')

var TITLE = 'nautilists - lists'

module.exports = view

function view (state, emit) {
    if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  
    switch(state.route){
      case 'lists':
          return ListsPage(state, emit);
          break;
      case 'lists/:_id':
          return ListPage(state, emit);
          break;
      default:
          return html`<body>nothing found</body>`
    }
  }
  
