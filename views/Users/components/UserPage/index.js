var html = require('choo/html')
const styles = require('../../../../styles')
const NavbarTop = require('../../../../components/NavbarTop')
const MobileNavMenuModal = require('../../../../components/NavbarTop/components/MobileNavMenuModal')
const Footer = require('../../../../components/Footer')
const AddFeatureBtn = require('../../../../components/AddFeatureBtn')
const AddLinkModal = require('../../../../components/AddLinkModal')
const AddListModal = require('../../../../components/AddListModal')


var TITLE = `nautilists - user`

module.exports = view

function view (state, emit) {
    
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  const {username} = state.params
  
  return html`
  <body class="${styles.body}" onload=${() => emit('USERS_SET_SELECTED', username)}>
  ${NavbarTop(state, emit)}
  <main class="${styles.main} flex flex-column items-center">
      ${Header(state,emit)}
  </main>
  ${Footer(state, emit)}
  ${MobileNavMenuModal(state, emit)}
  ${state.cache(AddFeatureBtn, 'AddFeatureBtn', state, emit).render()}
  ${AddLinkModal(state, emit)}
  ${AddListModal(state, emit)}
</body>
  `
}


function Header(state, emit){
    const {username, bio, emojis, selectedEmoji} = state.main.selected.user.profile;
    // const avatar = emojis[selectedEmoji]
    console.log(emojis, selectedEmoji)
    let avatar;
    if(emojis) {
        avatar = emojis[selectedEmoji]
    }
    
    return html`
        <header class="${styles.sectionmw7} h-auto outline mt4">
            <div class="w-100 flex flex-column flex-row items-center">
                <img class="ma0 pa0 dib h3 dropshadow ba bw1" src="/assets/${avatar}">
                <h1 class="ma0 pa0 pl3 f3 f2-ns">${username}</h1>
            </div>
            
            <p>${bio}</p>
        </header>
    `
}

