var html = require('choo/html')
const styles = require('../../styles')
const NavbarTop = require('../../components/NavbarTop')
const MobileNavMenuModal = require('../../components/NavbarTop/components/MobileNavMenuModal')
const Footer = require('../../components/Footer')
const AddFeatureBtn = require('../../components/AddFeatureBtn')
const AddLinkModal = require('../../components/AddLinkModal')
const AddListModal = require('../../components/AddListModal')

const LinkCards = require('../../components/Cards/LinkCards');
const UserCards = require('../../components/Cards/UserCards');
const ListCards = require('../../components/Cards/ListCards');

// const BrowseCategoriesSection = require('./components/BrowseCategoriesSection')

var TITLE = 'nautilists - search'

module.exports = view

function view (state, emit) {
    if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
    
  return html`
  <body class="${styles.body}" onload=${() => emit('NAVSEARCH_FIND', 'p5')}>
  ${NavbarTop(state, emit)}
  <main class="${styles.main}">
  <section class="w-100 mt4">
    <h2 class="f3 tc lh-title">Search results for: ${state.search.searchTerm}</h2>
    </section>
      ${showLists(state, emit)}
      ${showLinks(state, emit)}
      ${showUsers(state, emit)}
  </main>
  ${Footer(state, emit)}
  ${MobileNavMenuModal(state, emit)}
  ${state.cache(AddFeatureBtn, 'AddFeatureBtn', state, emit).render()}
  ${AddLinkModal(state, emit)}
  ${AddListModal(state, emit)}
</body>
  `
}

function showLinks(state, emit){
  const {links} = state.main;
  let cards;
  if(links.data.length <= 0){
    cards = html`<p class="w-100 tc">no links yet</p>`
  } else {
    cards = LinkCards(links.data);
  }
  

  return html`
  <section class="w-100 mt4">
    <h2 class="f3 tc lh-title">Links</h2>
    <div class="mw9 center ph3-ns h-100">
    ${cards}
    </div>
  </section>
  `
}


function showLists(state, emit){
  const {lists} = state.main;
  let cards;
  if(lists.data.length <= 0){
    cards = html`<p class="w-100 tc">no lists yet</p>`
  } else {
    cards = ListCards(lists.data);
  }
  

  return html`
  <section class="w-100 mt4">
    <h2 class="f3 tc lh-title">Lists</h2>
    <div class="mw9 center ph3-ns h-100">
    ${cards}
    </div>
  </section>
  `
}

function showUsers(state, emit){
  const {users} = state.main;
  let cards;
  if(users.data.length <= 0){
    cards = html`<p class="w-100 tc">no users yet</p>`
  }
  else {
    cards = UserCards(users.data, state, emit);
  }
  

  return html`
  <section class="w-100 mt4">
    <h2 class="f3 tc lh-title">Contributors</h2>
    <div class="mw9 center ph3-ns h-100 overflow-scroll-x">
      ${cards}
    </div>
  </section>
  `
}

