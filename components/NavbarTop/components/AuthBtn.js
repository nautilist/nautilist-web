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
    return html`
        <button class="pointer bn bg-transparent" onclick=${()=> emit('USER_LOGOUT')}>log out</button>
    `
}

function isAuthd(state, emit){
    const {user} = state;
    const {username} = user;

    function navigateTo(e){
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
    return html`
    <div>
        <p><a class="${styles.aTag}" href="/login">login</a> · <a class="${styles.aTag}" href="/signup">sign up</a></p>
    </div>
    `
}