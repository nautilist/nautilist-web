var html = require('choo/html')
const styles = require('../../../../styles')
const NavbarTop = require('../../../../components/NavbarTop')
const MobileNavMenuModal = require('../../../../components/NavbarTop/components/MobileNavMenuModal')
const Footer = require('../../../../components/Footer')
const AddFeatureBtn = require('../../../../components/AddFeatureBtn')
const AddLinkModal = require('../../../../components/AddLinkModal')
const AddListModal = require('../../../../components/AddListModal')

const MainEditable = require('./components/MainEditable')
const MainPublic = require('./components/MainPublic')

var TITLE = 'nautilists - list'

module.exports = view

function view (state, emit) {
    if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
    const {_id} = state.params
    
    function init(){
        emit('LISTS_GET', _id)
    }

  return html`
  <body class="${styles.body}" onload=${() => init()}>
  ${NavbarTop(state, emit)}
  <main class="${styles.main}">
      <section class="w-100 flex flex-column items-center mt4">
        ${goBackBtn(state, emit)}
        ${PublicToolBar(state, emit)}
        ${EditingToolBar(state, emit)}
        ${MainView(state, emit)}
      </section>
  </main>
  ${Footer(state, emit)}
  ${MobileNavMenuModal(state, emit)}
  ${state.cache(AddFeatureBtn, 'AddFeatureBtn', state, emit).render()}
  ${AddLinkModal(state, emit)}
  ${AddListModal(state, emit)}
</body>
  `
}

function goBackBtn(state, emit){

    function navigateBack(e){
        history.go(-1)
    }
    
    return html`
    <section class="${styles.sectionmw7}">
        <button class="bg-transparent f7 bn" onclick=${navigateBack}>← <span class="underline">Go back</span></button>
    </section>
    `
}


function MainView(state, emit){
    const {lists} = state.main.selected;
    
    if(!Object.keys(lists) > 0){
        return ''
    }

   switch(state.listPage.editable){
       case true:
        return MainEditable(lists);
        break;
       case false:
        return MainPublic(lists);
        break;
       default:
        break
   }
}

function ToggleEditableBtn(state, emit){
    return html`
    <button class="pa2 ba bw1 b--pink bg-near-white dropshadow" onclick=${() => emit('LISTPAGE_TOGGLE_EDITABLE')}>Edit List</button>
    `
}

function EditableState(state, emit){
    const {editable} = state.listPage;
    if(!editable === true){
        return ''
    }
    return html`
        <p class="ml3-ns ma0 pa0">now in edit mode ✨</p>
    `
}

function EditingToolBar(state, emit){
    if(!state.listPage.canEdit){
        return ''
    }
    return html`
        <section class="${styles.sectionmw7} flex flex-row-ns mt4 items-center">
            ${ToggleEditableBtn(state, emit)}
            ${EditableState(state, emit)}
        </section>
    `
}



function PublicToolBar(state, emit){
    return html`
        <section class="${styles.sectionmw7} flex flex-row-ns mt3 items-center">
            ${FollowListBtn(state, emit)}
            ${RemixListBtn(state, emit)}
        </section>
    `
}

function RemixListBtn(state, emit){
    return html`
    <button class="mr2-ns ma0 pa2 bg-near-white dropshadow bg-purple light-green">Remix</button>
    `
}

function FollowListBtn(state, emit){
    const {_id} = state.user
    const {followers} = state.main.selected.lists
    function triggerFollow(e){
        emit('LISTPAGE_FOLLOW')
    }
    function triggerUnFollow(e){
        emit('LISTPAGE_UNFOLLOW')
    }

    const isFollowing = followers ? followers.includes(_id) : ''

    if(isFollowing === true){
        return html`
            <button onclick=${triggerUnFollow} class="mr2-ns ma0 pa2 bg-near-white dropshadow bg-yellow navy">Unfollow</button>
            `    
    }

    return html`
    <button onclick=${triggerFollow} class="mr2-ns ma0 pa2 bg-near-white dropshadow bg-yellow navy">Follow</button>
    `
}