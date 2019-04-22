var html = require('choo/html')
const styles = require('../../styles')
const NavbarTop = require('../../components/NavbarTop')
const MobileNavMenuModal = require('../../components/NavbarTop/components/MobileNavMenuModal')
const Footer = require('../../components/Footer')

var TITLE = 'nautilists - home'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
  <body class="${styles.body}">
  ${NavbarTop(state, emit)}
  <main class="${styles.main}">
      ${HomeHeader(state, emit)}
  </main>
  ${Footer(state, emit)}
  ${MobileNavMenuModal(state, emit)}
</body>
  `
}


function HomeHeader(state, emit){
  //<div style="background:url(http://mrmrs.github.io/photos/display.jpg) no-repeat center right;background-size: cover;" class="dtc v-mid cover ph3 ph4-m ph5-l">
  //<h1 class="f2 f-subheadline-l measure lh-title fw9">A Night Taking Photos at San Francisco’s Spooky Ruins of the Sutro Baths</h1>
  // <h2 class="f6 fw6 black">A story by Nancy Drew</h2>
  return html`
  <header class="vh-100 bg-light-pink dt w-100 bg-washed-red">
      <div class="dtc v-mid cover ph3 ph4-m ph5-l">
      ${headerMain(state, emit)}
    </div>
  </header>
  `
}

function headerMain(state, emit){

  function goToBrowse(e){
    emit('BROWSE_FIND')
    emit('pushState','/browse')
  }

  return html`
  <div class="w-100 flex flex-row-ns flex-column items-center">
    <section class="w-50-ns w-100 flex flex-column h-100 justify-center pa3 pr4 pb5 pb0-ns">
      <h2 class="tl-ns tc b f2-ns f4 ma0 f-subheadline-l measure lh-title"><span class="f2-ns ma0 pa0">Welcome to </span><br><span class="dark-pink">Nautilists</span></h2>
      <h3 class="tl-ns tc f3-ns f5 mt1">Pick-and-mix lists for all occasions</h3>
      <p class="f6">Nautilists are easy, pick-and-pix lists. In an effort to support open education, nautilists makes it easy to curate and share lists that inspire creativity and learning.</p>
      <div class="w-100 mt4 flex flex-row justify-start-ns justify-center">
        <h2 class="ma0">→ <button class="black bn bg-transparent underline" onclick=${goToBrowse}>Get Started</button></h2>
        <img class="pl2 h2" src="/assets/2728.png">
      </div>
    </section>
    <section class="dropshadow bg-white bn h-100 pa3-ns pt3 pb3 w-50-ns w-100 flex flex-row-ns flex-column ba-ns bw1-ns dropshadow-ns b--dark-pink ml3-ns">
      <div class="justify-between w-third-ns w-100 h-100 tc flex flex-column items-center">
        <h4 class="ma0">Add links</h4>
        <img class="h3 w3" src="/assets/1F517.png">
        <p class="f6 ma0 pa2 tl">Add your favorite links from across the web.</p>
      </div>
      <div class="justify-between w-third-ns w-100 h-100 tc flex flex-column items-center">
        <h4 class="ma0">Mix 'em up</h4>
        <img class="h3 w3" src="/assets/1F4A5.png">
        <p class="f6 ma0 pa2 tl">Pick-and-mix links and lists for all to see.</p>
      </div>
      <div class="justify-between w-third-ns w-100 h-100 tc flex flex-column items-center">
        <h4 class="ma0">Collaborate</h4>
        <img class="h3 w3" src="/assets/1F3D3.png">
        <p class="f6 ma0 pa2 tl">Build with buddies on collaborative lists.</p>
      </div>
    </section>
  </div>
  `
}

