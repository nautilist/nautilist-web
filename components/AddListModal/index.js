const html = require('choo/html');
const styles = require('../../styles')

function AddListModal(state, emit){
    if(state.modals.addListModal.displayed === true){
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
        <h2 class="ma0 pa0 pl2">Add List</h2>
        <button class="bn bg-navy pink bw2 pa2 h3 w3 f3 pointer" onclick=${() => emit('ADDLISTMODAL_TOGGLE')}>╳</button>
    </header>
    `
}

function ModalMain(state, emit){
    return html`
    <div class="w-100 h-auto outline flex flex-row-ns flex-column flex-grow-1">
        <section class="w-third-ns w-100 h-100 outline pa2">
            <div class="w-100 h-100 outline overflow-y-scroll">
                ${linkSelectionList(state, emit)}
            </div>
        </section>
        <section class="w-two-thirds-ns w-100 h-100 outline pa2 pl4 pr4">
            <div class="w-100 h-100">
                ${AddListForm()}
            </div>
        </section>
    </div>
    `
}

function AddListForm(){
    return html`
        <form>
            ${inputName()}
            ${inputDescription()}
            ${inputTags()}
            ${inputSubmit()}
        </form>
    `
}

function inputName(){
    return html`
        <fieldset class="${styles.fieldset}">
            <legend class="${styles.legend}">Name</legend>
            <input class="${styles.modalInput}" type="text" placeholder="Magical List Name">
        </fieldset>
    `
}

function inputDescription(){
    return html`
        <fieldset class="${styles.fieldset}">
            <legend class="${styles.legend}">Description</legend>
            <textarea class="${styles.modalInput}" placeholder="A description to go with the magic"></textarea>
        </fieldset>
    `
}

function inputTags(){
    return html`
        <fieldset class="${styles.fieldset}">
            <legend class="${styles.legend}">Tags</legend>
            <input class="${styles.modalInput}" type="text" placeholder="creative, coding, javascript">
        </fieldset>
    `
}

function inputSubmit(){
    return html`
        <div class="w-100 mt4 flex flex-row justify-end">
            <input class="${styles.submitButton}" type="submit" value="Submit">
        </div>
    `
}

function linkSelectionList(state, emit){
    const {links} = state.main

    return html`
    <ul class="w-100 h-100 list ma0 pt0 pb3 pl3 pr3">
        ${LinkList(links.data)}
    </ul>
    `
}

function LinkList(links){
    return links.map(link => {
        return linkSelectCard(link)
    })
}

function linkSelectCard(link){
    const {name, description, _id} = link;
    return html`
    <li class="h3 w-100 pa0 ma0 f7 mt2 mb2 outline dropshadow" data-id=${_id}>
        <p class="ma0 f7">${name}</p>
        <p class="ma0 f7 truncate">${description}</p>
    </li>
    `
}


module.exports = AddListModal