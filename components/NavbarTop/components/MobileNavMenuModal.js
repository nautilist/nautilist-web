const html = require('choo/html');
const styles = require('../../../styles')
const AuthBtn = require('./AuthBtn')
const SearchInput = require('./SearchInput')
const BrowseBtn = require('./BrowseBtn')

function MobileNavMenuModal(state, emit){
    if(state.modals.nav.displayed === true){
        return html`
        <div class="${styles.modalContainer}" style="background:rgba(232, 253, 245, 0.95)">
            ${ModalHeader(state, emit)}
            ${ModalMain(state, emit)}
        </div>
        `
    }
}


function ModalHeader(state, emit){
    return html`
    <header class="flex flex-row items-center justify-between w-100">
        <h2 class="ma0 pa0 pl2">menu</h2>
        <button class="bn bg-navy pink bw2 pa2 h3 w3 f3 pointer" onclick=${() => emit('NAVMODAL_TOGGLE')}>╳</button>
    </header>
    `
}

function ModalMain(state, emit){
    return html`
        <ul class="pa2-ns pa4 list flex flex-column items-center justify-start w-100 h-100">
            <li class="w-100 h3 tc mt4">${AuthBtn(state, emit)}</li>    
            <li class="w-100 h2 mt4 flex flex-row justify-center">${SearchInput(state, emit)}</li>    
            <li class="w-100 h3 tc mt4">${BrowseBtn(state, emit)}</li>
        </ul>
    `
}


module.exports = MobileNavMenuModal