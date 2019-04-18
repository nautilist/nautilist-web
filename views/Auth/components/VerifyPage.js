var html = require('choo/html')
const styles = require('../../../styles')
const NavbarTop = require('../../../components/NavbarTop')
const MobileNavMenuModal = require('../../../components/NavbarTop/components/MobileNavMenuModal')
const Footer = require('../../../components/Footer')

module.exports = VerifyPage;

function VerifyPage(state, emit){
      
    return html`
    <body class="${styles.body}" onload=${() => triggerVerify(state, emit)}>
    ${NavbarTop(state, emit)}
    <main class="${styles.main} items-center">
        ${LoginForm(state, emit)}
    </main>
    ${Footer(state, emit)}
    ${MobileNavMenuModal(state, emit)}
  </body>
    `
}

function triggerVerify(state, emit){
    if(state.query.hasOwnProperty('token')){
        console.log("has token yes!")
        emit('USER_SENDVERIFICATIONTOKEN');
    }
}

function handleSubmit(state, emit){
    return e => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        emit('USER_LOGIN', formData)
    }
}


function LoginForm(state, emit){
    return html`
    <section class="${styles.sectionmw7} items-center justify-center flex flex-column">
    <form class="mw6 w-100 flex flex-column items-center" onsubmit="${handleSubmit(state, emit)}">
        <h2 class="f5">Log In</h2>
        ${inputEmail()}
        ${inputPass()}
        <input class="w-100 ba bw2 mw5 mb3 dropshadow h3 b--dark-pink dark-pink bg-white b" type="submit" value="Log In">
    </form>
    <small>Don't have an account? <a class="link black underline" href="/signup">Sign up!</a></small>
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

function inputPass(){
    return html`
    <fieldset class="w-100 mb4 bn">
    <legend>Password</legend>
    <input type="password" class="w-100 h3 dropshadow pa2 f4 bn bg-near-white" name="password" required>
    <a class="link black underline f7 b" href="/reset">I forgot my password 😬</a>
    </fieldset>
    `
}

