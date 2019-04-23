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
      ${UserTabSelect(state, emit)}
      ${MainView(state, emit)}
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


function MainView(state, emit){
    
    const {userPage} = state;
    switch(userPage.selectedTab){
        case('lists'):
            return ListTabView(state, emit)
            break;
        case('links'):
            return LinkTabView(state, emit)
            break;
        case('listsFollowing'):
            return ListFollowingTabView(state, emit)
            break;
        default:
            break;

    }
}

function UserTabSelect(state, emit){

    function switchTab(tabName){
        return e => {
            emit('USERPAGE_SET_TAB', tabName)
        }
    }

    return html`
        <section class="${styles.sectionmw7} outline flex flex-column flex-row-ns">
            <ul class="list pa0 pl0 flex flex-row">
                <li class="pa0"><button onclick=${switchTab('lists')}>lists</button></li>
                <li class="pa0"><button onclick=${switchTab('links')}>links</button></li>
            </ul>
            <ul class="list pl0 dn">
                <li></li>
                <li></li>
            </ul>
        </section>
    `
}

function ListTabView(state, emit){
    return html`
    <section class="${styles.sectionmw7}">
    list
    </section>
    `
}

function LinkTabView(state, emit){
    return html`
    <section class="${styles.sectionmw7}">
    link
    </section>
    `
}

function ListFollowingTabView(state, emit){
    return html`
    <section class="${styles.sectionmw7}">
    listFollowing
    </section>
    `
}
