const html = require('choo/html');
const styles = require('../../../styles');
module.exports = AuthBtn

function AuthBtn(state, emit){
    const{user} = state;

    switch(user.authenticated){
        case true:
            return isAuthd(state, emit)
        default:
            return notAuthd(state, emit)
    }

}

function logoutBtn(state, emit){
    function handleClick(e){
        emit('NAVMODAL_CLOSE');
        emit('USER_LOGOUT')
    }

    return html`
        <button class="pointer bn bg-transparent" onclick=${handleClick}>log out</button>
    `
}

function isAuthd(state, emit){
    const {user} = state;
    const {username} = user;

    function navigateTo(e){
        emit('NAVMODAL_CLOSE');
        emit('USERS_SET_SELECTED', username)
        emit('pushState', `/users/${username}`)
    }

    return html`
        <div>
            <p>Hello <button onclick=${navigateTo} class="bn bg-transparent b underline">${username}</button> · ${logoutBtn(state,emit)}</p>
        </div>
    `
}

function notAuthd(state, emit){

    function handleClose(e){
        emit('NAVMODAL_CLOSE');
    }

    return html`
    <div>
        <p onclick=${handleClose}><a class="${styles.aTag}" href="/login">login</a> · <a class="${styles.aTag}" href="/signup">sign up</a></p>
    </div>
    `
}