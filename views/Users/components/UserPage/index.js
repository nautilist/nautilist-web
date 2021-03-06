var html = require('choo/html')
const styles = require('../../../../styles')
const NavbarTop = require('../../../../components/NavbarTop')
const MobileNavMenuModal = require('../../../../components/NavbarTop/components/MobileNavMenuModal')
const Footer = require('../../../../components/Footer')
const AddFeatureBtn = require('../../../../components/AddFeatureBtn')
const AddLinkModal = require('../../../../components/AddLinkModal')
const AddListModal = require('../../../../components/AddListModal')

const ListTabView = require('./components/ListTabView')
const LinkTabView = require('./components/LinkTabView')
const ListFollowingTabView = require('./components/ListFollowingTabView')
const EditProfileModal = require('../../../../components/EditProfileModal')

var TITLE = `nautilists - user`

module.exports = view

function view(state, emit) {
    
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  
  return html`
    <body class="${styles.body}" onload=${() => emit('USERS_SET_SELECTED', state.params.username)}>
    ${NavbarTop(state, emit)}
    <main class="${styles.main} flex flex-column items-center pa2">
        ${Header(state,emit)}
        ${UserTabSelect(state, emit)}
        ${MainView(state, emit)}
    </main>
    ${Footer(state, emit)}
    ${MobileNavMenuModal(state, emit)}
    ${state.cache(AddFeatureBtn, 'AddFeatureBtn', state, emit).render()}
    ${AddLinkModal(state, emit)}
    ${AddListModal(state, emit)}
    ${EditProfileModal(state, emit)}
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
        <header class="${styles.sectionmw7} h-auto ba bw1 dropshadow mt4 pa2">
            <p class="pa0 ma0 w-100 tr">${EditProfileBtn(state, emit)}</p>    
            <div class="w-100 flex flex-column flex-row items-center pa2">
                <img class="ma0 pa0 dib h3 dropshadow ba bw1" src="/assets/${avatar}">
                <h1 class="ma0 pa0 pl3 f3 f2-ns">${username}</h1>
            </div>
            <p class="pa2">${bio}</p>
        </header>
    `
}


function MainView(state, emit){
    
    const {userPage} = state;
    switch(userPage.selectedTab){
        case('lists'):
            return ListTabView(state, emit)
        case('links'):
            return LinkTabView(state, emit)
        case('listsFollowing'):
            return ListFollowingTabView(state, emit)
        default:
            return ''

    }
}

function UserTabSelect(state, emit){

    function switchTab(tabName){
        return e => {
            emit('USERPAGE_SET_TAB', tabName)
        }
    }

    function highlightTab(tabName){
        if(state.userPage.selectedTab === tabName){
            switch(tabName){
                case 'lists':
                    return 'bg-light-green navy'
                case 'links':
                    return 'bg-light-pink navy'
                case 'listsFollowing':
                    return 'bg-light-blue navy'
                default:
                    return 'bg-pink navy'
            }
            
        } else {
            return 'bg-near-white navy'
        }
    }

    return html`
        <section class="${styles.sectionmw7} pa0 ma0 flex flex-column flex-row-ns mt4 justify-between-ns justify-start flex-wrap">
            <ul class="list pa0 pl0 flex flex-row ma0">
                <li class="pa0 mr2"><button class="f7 f6-ns pa2 dropshadow ba bw1 b--black ${highlightTab('lists')}" onclick=${switchTab('lists')}>lists</button></li>
                <li class="pa0 mr2"><button class="f7 f6-ns pa2 dropshadow ba bw1 b--black ${highlightTab('links')}" onclick=${switchTab('links')}>links</button></li>
            </ul>
            <ul class="list pa0 pl0 flex flex-row ma0">
            <li class="pa0 ml2-ns ml0 mt2 mt0-ns"><button class="f7 f6-ns pa2 dropshadow ba bw1 b--black ${highlightTab('listsFollowing')}" onclick=${switchTab('listsFollowing')}>lists I follow</button></li>
            </ul>
        </section>
    `
}

function EditProfileBtn(state, emit){
    const {authenticated, username} = state.user;
    
    if(authenticated && state.params.username === username){
        return html`
        <button class="bg-transparent bn f7 underline black" onclick=${()=> emit('EDITPROFILEMODAL_TOGGLE')}>edit profile</button>
        `
    }
}