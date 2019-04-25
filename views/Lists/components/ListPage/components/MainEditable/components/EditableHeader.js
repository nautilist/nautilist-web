var html = require('choo/html')
const styles = require('../../../../../../../styles')

module.exports = view;

function view(list, state, emit){
    const {name, description, ownerDetails} = list;
    const{followersDetails} = list;
    
    if(!followersDetails){
        return ''
    }

    const numFollowers = followersDetails.length
    state.listPage.name = name;
    state.listPage.description = description;
    return html`
        <header class="w-100 pa2 ba bw1 dropshadow">
            <p class="ma0 pa0 f7">${numFollowers} followers</p>
            <form class="ma0 pa0">
            <input name="name" onkeyup=${handleKeyUp(state, emit)} class="ma0 pa2 f3-ns f4 w-100  bg-near-white ba bw1 b--moon-gray" value=${state.listPage.name}>
            <p class="ma0 pa0 f7">by ${ownerDetails.username}</p>
            <textarea name="description" onkeyup=${handleKeyUp(state, emit)} class="mt2 pa2 f5-ns f6 w-100  bg-near-white ba bw1 b--moon-gray">${state.listPage.description}</textarea>
            </form>
        </header>
    `
}

function handleKeyUp(state, emit){
    return e => {
        const val = e.target.value;
        const prop = e.target.name;
        emit('listPage_handle_keyup', {prop:prop, val:val})
    }
}