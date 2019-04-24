const html = require('choo/html');
const styles = require('../../styles')

function EditProfileModal(state, emit){
    if(state.modals.editProfileModal.displayed === true){
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
        <h2 class="ma0 pa0 pl2">Edit Profile</h2>
        <button class="bn bg-navy pink bw2 pa2 h3 w3 f3 pointer" onclick=${() => emit('EDITPROFILEMODAL_TOGGLE')}>╳</button>
    </header>
    `
}

function ModalMain(state, emit){
    return html`
    <div class="w-100 h-100 bt bw1 b--black flex flex-row-ns flex-column overflow-y-scroll justify-center">
        <section class="${styles.sectionmw7}">
        ${EditProfileForm(state, emit)}
        </section>
    </div>
    `
}

function EditProfileForm(state, emit){
    return html`
        <form id="EditProfileModalForm" onsubmit=${handleSubmit(state, emit)}>
            ${inputEmojiSelect(state, emit)}
            ${inputBio(state, emit)}
            ${inputSubmit(state, emit)}
        </form>
    `
}

// onchange=${changeImage}
function inputEmojiSelect(state, emit){
    const {profile} = state.main.selected.user;

    function changeImage(e){
        emit('EDITPROFILEMODAL_UPDATE_EMOJI', e.target.value)
    }

    return html`
        <fieldset class="${styles.fieldset}">
            <legend class="${styles.legend}">Profile Photo</legend>
            <select class="w4" name="selectedEmoji" onchange=${changeImage}>
            ${profile.emojis.map( (emoji, idx) => {
              const emojiname = emoji.split('-')[0].toLowerCase()
              if(idx == profile.selectedEmoji ){
                return html`<option value="${idx}" selected>${emojiname}</option>`
              }
              return html`
                <option value="${idx}">${emojiname}</option>
              `
            })}
          </select>
        </fieldset>
    `
}

function inputBio(state, emit){

    return html`
        <fieldset class="${styles.fieldset}">
            <legend class="${styles.legend}">Bio</legend>
            <textarea onkeyup=${handleKeyUp(state,emit)} name="bio" class="${styles.modalInput}" type="text" placeholder="short bio">${state.main.selected.user.profile.bio}</textarea>
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
        emit('EDITPROFILEMODAL_SUBMIT', formData)
    }
}

function handleKeyUp(state, emit){
    return e => {
        const val = e.target.value;
        const prop = e.target.name;
        emit('modal_handle_keyup', {modalName:'editProfileModal', prop:prop, val:val})
    }
}


module.exports = EditProfileModal