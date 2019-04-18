const html = require('choo/html');
const styles = require('../../styles')

function AddLinkModal(state, emit){
    if(state.modals.addLinkModal.displayed === true){
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
        <h2 class="ma0 pa0 pl2">Add Link</h2>
        <button class="bn bg-navy pink bw2 pa2 h3 w3 f3 pointer" onclick=${() => emit('ADDLINKMODAL_TOGGLE')}>╳</button>
    </header>
    `
}

function ModalMain(state, emit){
    return html`
        <div class="${styles.sectionmw7}">
            <p>hello</p>
        </div>
    `
}


module.exports = AddLinkModal