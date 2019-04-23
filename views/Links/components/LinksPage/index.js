var html = require('choo/html')
const styles = require('../../../../styles')
const NavbarTop = require('../../../../components/NavbarTop')
const MobileNavMenuModal = require('../../../../components/NavbarTop/components/MobileNavMenuModal')
const Footer = require('../../../../components/Footer')
const AddFeatureBtn = require('../../../../components/AddFeatureBtn')
const AddLinkModal = require('../../../../components/AddLinkModal')
const AddListModal = require('../../../../components/AddListModal')
const LoadMoreBtn = require('../../../../components/LoadMoreBtn');

const LinkCards = require('../../../../components/Cards/LinkCards');

var TITLE = 'nautilists - links'

module.exports = view

function view (state, emit) {
    if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
  <body class="${styles.body}" onload=${() => emit('LINKS_FIND')}>
  ${NavbarTop(state, emit)}
  <main class="${styles.main}">
      ${showLinks(state, emit)}
      ${LoadMoreBtn('LINKS_FIND_MORE', state, emit)}
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


