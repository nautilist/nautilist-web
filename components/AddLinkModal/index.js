const html = require('choo/html');
const styles = require('../../styles')

function AddLinkModal(state, emit){
    if(state.modals.addLinkModal.displayed === true){
        return html`
        <div class="${styles.modalContainer}" style="background:rgba(232, 253, 245)">
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
    <div class="w-100 h-100 bt bw1 b--black flex flex-row-ns flex-column overflow-y-scroll">
            <section class="w-50-ns w-100 h-100 pa2 pl4 pr4 bw1 br">
                <fieldset class="${styles.fieldset} mw0">
                    <legend class="${styles.legend}">Optional: Step 1: Select List</legend>
                    ${listSelectionList(state, emit)}
                </fieldset>
                <fieldset class="${styles.fieldset} mw0">
                    <legend class="${styles.legend}">Optional: Step 2: Select Section</legend>
                    ${sectionSelectionList(state, emit)}
                </fieldset>
            </section>
            <section class="w-50-ns w-100 h-auto pa2 pl4 pr4">
                <div class="w-100 h-100">
                    ${AddListForm(state, emit)}
                </div>
            </section>
        </div>
    `
}

function AddListForm(state, emit){
    return html`
        <form id="AddListForm" onsubmit=${handleSubmit(state, emit)}>
            ${inputUrl(state, emit)}
            ${inputName(state, emit)}
            ${inputDescription(state, emit)}
            ${inputTags(state, emit)}
            ${inputSubmit(state, emit)}
        </form>
    `
}

function inputUrl(state, emit){
    return html`
        <fieldset class="${styles.fieldset}">
            <legend class="${styles.legend}">URL</legend>
            <input value="${state.modals.addLinkModal.url}" 
                onkeyup=${handleKeyUp(state,emit)} 
                name="url" 
                class="${styles.modalInput}" 
                type="text" 
                placeholder="https://itp.nyu.edu">
        </fieldset>
    `
}

function inputName(state, emit){
    return html`
        <fieldset class="${styles.fieldset}">
            <legend class="${styles.legend}">Name</legend>
            <input value="${state.modals.addLinkModal.name}" 
            onkeyup=${handleKeyUp(state,emit)} 
            name="name" 
            class="${styles.modalInput}" 
            type="text" 
            placeholder="e.g. Title of URL">
        </fieldset>
    `
}

function inputDescription(state, emit){
    return html`
        <fieldset class="${styles.fieldset}">
            <legend class="${styles.legend}">Description</legend>
            <textarea onkeyup=${handleKeyUp(state,emit)} 
            name="description" 
            class="${styles.modalInput}" 
            placeholder="A description to go with the magic">${state.modals.addLinkModal.description}</textarea>
        </fieldset>
    `
}

function inputTags(state, emit){
    return html`
        <fieldset class="${styles.fieldset}">
            <legend class="${styles.legend}">Tags</legend>
            <input value="${state.modals.addLinkModal.tags}" 
            onkeyup=${handleKeyUp(state,emit)} 
            name="tags" 
            class="${styles.modalInput}" 
            type="text" 
            placeholder="creative, coding, javascript">
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

function handleSubmit(state, emit){
    return e => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        emit('ADDLINKMODAL_SUBMIT', formData)
    }
}

function handleKeyUp(state, emit){
    return e => {
        const val = e.target.value;
        const prop = e.target.name;
        emit('modal_handle_keyup', {modalName:'addLinkModal', prop:prop, val:val})
    }
}

function listSelectionList(state, emit){
    const {lists} = state.main

    return html`
    <ul class="w-100 vh-50-ns h3 flex flex-column overflow-y-scroll list ma0 pt2 pb3 pl3 pr3">
        ${UserLists(lists.data, state, emit)}
    </ul>
    `
}


function sectionSelectionList(state, emit){
    const {selectedList} = state.modals.addLinkModal;

    if(!Object.keys(selectedList).length > 0 ){
        return 'No list selected';
    }

    return html`
    <ul class="w-100 vh-50-ns h3 flex flex-column overflow-y-scroll list ma0 pt2 pb3 pl3 pr3">
        ${listSections(selectedList.sections, state, emit)}
    </ul>
    `
}

function listSections(sections, state, emit){
    return sections.map(section => {
        return sectionSelectCard(section, state, emit)
    })
}

function sectionSelectCard(section, state, emit){
    let {name, description, _id} = section;
    const {modals} = state;

    const selected = modals.addLinkModal.selectedSection._id === _id ? 'bg-light-blue' : 'bg-white'

    name = name.length === 0 ? 'default' : name;
    return html`
    <li onclick=${toggleSectionSelect(_id, state, emit)} class="${selected} grow h3 w-100 pa1 ma0 f7 mt2 mb2 bg-white outline dropshadow" data-id=${_id}>
        <p class="ma0 pa0 f7 truncate b">${name}</p>
        <p class="ma0 pa0 f7 truncate">${description}</p>
    </li>
    `
}


function listSelectCard(list, state, emit){
    const {name, description, _id} = list;
    const {modals} = state;

    const selected = modals.addLinkModal.selectedList._id === _id ? 'bg-yellow' : 'bg-white'

    return html`
    <li onclick=${toggleListSelect(_id, state, emit)} class="${selected} grow h3 w-100 pa1 ma0 f7 mt2 mb2 bg-white outline dropshadow" data-id=${_id}>
        <p class="ma0 pa0 f7 truncate b">${name}</p>
        <p class="ma0 pa0 f7 truncate">${description}</p>
    </li>
    `
}



function UserLists(lists, state, emit){
    return lists.map(list => {
        return listSelectCard(list, state, emit)
    })
}

function toggleListSelect(id, state, emit){
    return e => {
        emit('ADDLINKMODAL_LISTSELECT_TOGGLE', id);
    }
}

function toggleSectionSelect(id, state, emit){
    return e => {
        emit('ADDLINKMODAL_SECTIONSELECT_TOGGLE', id);
    }
}




module.exports = AddLinkModal