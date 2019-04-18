
var html = require('choo/html')
const styles = require('../../../styles')
const NavbarTop = require('../../../components/NavbarTop')
const MobileNavMenuModal = require('../../../components/NavbarTop/components/MobileNavMenuModal')
const Footer = require('../../../components/Footer')

module.exports = SignupPage;

function SignupPage(state, emit){
      
    return html`
    <body class="${styles.body}">
    ${NavbarTop(state, emit)}
    <main class="${styles.main} items-center">
        ${SignupForm(state, emit)}
    </main>
    ${Footer(state, emit)}
    ${MobileNavMenuModal(state, emit)}
  </body>
    `
}

function validateForm(formData) {
    const username = formData.get('username');
    const regex = /^[0-9a-zA-Z\_]+$/
    if (!regex.test(username)) {
      alert("username must be lowercase and not include \nspecial characters or spaces");
      return false;
    }
  }


function handleSubmit(state, emit){
    return e => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if(validateForm(formData) === false) return;
        emit('USER_SIGNUP', formData)
    }
}

function SignupForm(state, emit){
    return html`
    <section class="${styles.sectionmw7} items-center justify-center flex flex-column">
    <form class="mw6 w-100 flex flex-column items-center" onsubmit="${handleSubmit(state, emit)}">
        <h2 class="f5">Sign Up</h2>
        ${inputUsername()}
        ${inputEmail()}
        ${inputPass()}
        <input class="w-100 ba bw2 mw5 mb3 dropshadow h3 b--dark-pink dark-pink bg-white b" type="submit" value="Sign up">
    </form>
    <small>Already have an account? <a class="link black underline" href="/login">Log in</a></small>
    </section>
    `
}

function inputUsername(){
    return html`
    <fieldset class="w-100 mb3 bn">
    <legend>Username</legend>
    <input type="text" class="w-100 h3 dropshadow pa2 f4 bn bg-near-white" name="username" required>
    </fieldset>
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