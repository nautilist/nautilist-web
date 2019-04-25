const html = require('choo/html');
const styles = require('../../../../../styles')

function view(state, emit){
    if(state.modals.addSectionLinksModal.displayed === true){
        return html`
        <div class="${styles.modalContainer}" style="background:rgba(232, 253, 245, 1)">
            ${ModalHeader(state, emit)}
            ${ModalMain(state, emit)}           
        </div>
        `
    }
}


function ModalHeader(state, emit){
    return html`
    <header class="flex flex-row items-center justify-between w-100">
        <h2 class="ma0 pa0 pl2">Add Links to Section</h2>
        <button class="bn bg-navy pink bw2 pa2 h3 w3 f3 pointer" onclick=${() => emit('ADDSECTIONLINKSMODAL_TOGGLE')}>╳</button>
    </header>
    `
}

function ModalMain(state, emit){
    return html`
    <div class="w-100 h-100 bt bw1 b--black flex flex-row-ns flex-column overflow-y-scroll justify-center">
            
            <section class="w-50-ns w-100 h-100 pa2 pl4 pr4 bw1 br">
                
                <fieldset class="${styles.fieldset} mw0">
                    <legend class="${styles.legend}">Required: Step 1: Select Section</legend>
                    ${sectionSelectionList(state, emit)}
                </fieldset>

                <fieldset class="${styles.fieldset} mw0">
                    <legend class="${styles.legend}">Optional: Step 2: Select Links</legend>
                    ${linkSelectionList(state, emit)}
                </fieldset>
            </section>


            <section class="w-50-ns w-100 h-auto pa2 pl4 pr4">
                <div class="w-100 h-100">
                    ${EditForm(state, emit)}
                </div>
            </section>
        </div>
    `
}

function EditForm(state, emit){
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
            <legend class="${styles.legend}">Name</legend>
            <input value="${state.modals.addSectionLinksModal.url}" 
            onkeyup=${handleKeyUp(state,emit)} 
            name="url" 
            class="${styles.modalInput}" 
            type="text" 
            placeholder="e.g. https://itp.nyu.edu">
        </fieldset>
    `
}

function inputName(state, emit){
    return html`
        <fieldset class="${styles.fieldset}">
            <legend class="${styles.legend}">Name</legend>
            <input value="${state.modals.addSectionLinksModal.name}" 
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
            placeholder="A description to go with the magic">${state.modals.addSectionLinksModal.description}</textarea>
        </fieldset>
    `
}

function inputTags(state, emit){
    return html`
        <fieldset class="${styles.fieldset}">
            <legend class="${styles.legend}">Tags</legend>
            <input value="${state.modals.addSectionLinksModal.tags}" 
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
        // const formData = new FormData(e.currentTarget)
        emit('ADDSECTIONLINKSMODAL_SUBMIT')
    }
}

function handleKeyUp(state, emit){
    return e => {
        const val = e.target.value;
        const prop = e.target.name;
        emit('modal_handle_keyup', {modalName:'addSectionLinksModal', prop:prop, val:val})
    }
}

function sectionSelectionList(state, emit){
    const {selectedList} = state.modals.addSectionLinksModal;

    if(!Object.keys(selectedList).length > 0 ){
        return 'No list selected';
    }

    return html`
    <ul class="w-100 h4-ns h3 flex flex-column overflow-y-scroll list ma0 pt2 pb3 pl3 pr3">
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

    const selected = modals.addSectionLinksModal.selectedSection._id === _id ? 'bg-light-blue' : 'bg-white'

    name = name.length === 0 ? 'default' : name;
    return html`
    <li onclick=${toggleSectionSelect(_id, state, emit)} class="${selected} grow h3 w-100 pa1 ma0 f7 mt2 mb2 bg-white outline dropshadow" data-id=${_id}>
        <p class="ma0 pa0 f7 truncate b">${name}</p>
        <p class="ma0 pa0 f7 truncate">${description}</p>
    </li>
    `
}


function linkSelectionList(state, emit){
    const {links} = state.main

    return html`
    <ul class="w-100 vh-50-ns h3 flex flex-column overflow-y-scroll list ma0 pt2 pb3 pl3 pr3">
        ${LinkList(links.data, state, emit)}
    </ul>
    `
}

function LinkList(links, state, emit){
    return links.map(link => {
        return linkSelectCard(link, state, emit)
    })
}

function linkSelectCard(link, state, emit){
    const {name, description, _id} = link;
    const {modals} = state;

    const selected = modals.addSectionLinksModal.links.includes(_id) ? 'bg-light-green' : 'bg-white'

    return html`
    <li onclick=${toggleLinkSelect(_id, state, emit)} class="${selected} grow h3 w-100 pa1 ma0 f7 mt2 mb2 bg-white outline dropshadow" data-id=${_id}>
        <p class="ma0 pa0 f7 truncate b">${name}</p>
        <p class="ma0 pa0 f7 truncate">${description}</p>
    </li>
    `
}

function toggleLinkSelect(id, state, emit){
    return e => {
        emit('ADDSECTIONLINKSMODAL_LINKSELECT_TOGGLE', id);
    }
}


function toggleSectionSelect(id, state, emit){
    return e => {
        emit('ADDSECTIONLINKSMODAL_SECTIONSELECT_TOGGLE', id);
    }
}


module.exports = view