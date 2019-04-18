var html = require('choo/html')
const styles = require('../../../styles')
const NavbarTop = require('../../../components/NavbarTop')
const MobileNavMenuModal = require('../../../components/NavbarTop/components/MobileNavMenuModal')
const Footer = require('../../../components/Footer')

module.exports = ResetPasswordPage;

function ResetPasswordPage(state, emit){
    let currentForm;
    if(state.query.hasOwnProperty('token')){
        currentForm = ResetFormPassword(state, emit)
    } else {
        currentForm = ResetFormEmail(state, emit)
    }
    return html`
    <body class="${styles.body}">
    ${NavbarTop(state, emit)}
    <main class="${styles.main} items-center">
        ${currentForm}
    </main>
    ${Footer(state, emit)}
    ${MobileNavMenuModal(state, emit)}
    </body>
    `
}

function handleSubmitEmail(state, emit){
    return e => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        emit('USER_SENDRESETPASSWORD', formData)
    }
}

function handleSubmitPassword(state, emit){
    return e => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        emit('USER_RESETPASSWORD', formData)
    }
}

function ResetFormEmail(state, emit){
    return html`
    <section class="${styles.sectionmw7} items-center justify-center flex flex-column">
    <form class="mw6 w-100 flex flex-column items-center" onsubmit="${handleSubmitEmail(state, emit)}">
        <h2 class="f5">Reset Your Password</h2>
        ${inputEmail()}
        <input class="w-100 ba bw2 mw5 mb3 dropshadow h3 b--dark-pink dark-pink bg-white b" type="submit" value="Send Reset Request">
    </form>
    </section>
    `
}

function ResetFormPassword(state, emit){
    return html`
    <section class="${styles.sectionmw7} items-center justify-center flex flex-column">
    <form class="mw6 w-100 flex flex-column items-center" onsubmit="${handleSubmitPassword(state, emit)}">
        <h2 class="f5">New Password</h2>
        ${inputPassword()}
        <input class="w-100 ba bw2 mw5 mb3 dropshadow h3 b--dark-pink dark-pink bg-white b" type="submit" value="Send Reset Request">
    </form>
    </section>
    `
}

function inputEmail(){
    return html`
    <fieldset class="w-100 mb3 bn">
    <legend>Email</legend>
    <input type="email" class="w-100 h3 dropshadow pa2 f4 bn bg-near-white" name="email" required>
    </fieldset>
    `
}

function inputPassword(){
    return html`
    <fieldset class="w-100 mb3 bn">
    <legend>New Password</legend>
    <input type="password" class="w-100 h3 dropshadow pa2 f4 bn bg-near-white" name="password" required>
    </fieldset>
    `
}

