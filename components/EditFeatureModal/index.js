const html = require('choo/html');
const styles = require('../../styles')

function view(state, emit){
    if(state.modals.editFeatureModal.displayed === true){
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
        <h2 class="ma0 pa0 pl2">Edit Feature</h2>
        <button class="bn bg-navy pink bw2 pa2 h3 w3 f3 pointer" onclick=${() => emit('EDITFEATUREMODAL_TOGGLE')}>╳</button>
    </header>
    `
}

function ModalMain(state, emit){
    return html`
    <div class="w-100 h-100 bt bw1 b--black flex flex-row-ns flex-column overflow-y-scroll justify-center">
            <section class="${styles.sectionmw7}">
            ${EditForm(state, emit)}
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
    if(state.modals.editFeatureModal.prop !== 'links') return ''
    return html`
        <fieldset class="${styles.fieldset}">
            <legend class="${styles.legend}">URL</legend>
            <input value="${state.modals.editFeatureModal.url}" 
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
            <input value="${state.modals.editFeatureModal.name}" 
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
            placeholder="A description to go with the magic">${state.modals.editFeatureModal.description}</textarea>
        </fieldset>
    `
}

function inputTags(state, emit){
    return html`
        <fieldset class="${styles.fieldset}">
            <legend class="${styles.legend}">Tags</legend>
            <input value="${state.modals.editFeatureModal.tags}" 
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
        emit('EDITFEATUREMODAL_SUBMIT')
    }
}

function handleKeyUp(state, emit){
    return e => {
        const val = e.target.value;
        const prop = e.target.name;
        emit('modal_handle_keyup', {modalName:'editFeatureModal', prop:prop, val:val})
    }
}


module.exports = view