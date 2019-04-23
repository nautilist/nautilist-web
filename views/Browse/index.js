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

const BrowseCategoriesSection = require('./components/BrowseCategoriesSection')

var TITLE = 'nautilists - browse'

module.exports = view

function view (state, emit) {
    if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
  <body class="${styles.body}" onload=${() => emit('BROWSE_FIND')}>
  ${NavbarTop(state, emit)}
  <main class="${styles.main}">
      ${BrowseCategoriesSection(state, emit)}
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
    <h2 class="f3 tc lh-title">Recent Links</h2>
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
    <h2 class="f3 tc lh-title">Recent Lists</h2>
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
    <h2 class="f3 tc lh-title">New Contributors</h2>
    <div class="mw9 center ph3-ns h-100 overflow-scroll-x">
      ${cards}
    </div>
  </section>
  `
}

