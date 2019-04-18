const html = require('choo/html')
const styles = require('../../styles');

module.exports = NavbarTop

let navLeft = `f7 flex flex-row list pa0 pa2 ma0 w-two-thirds-ns w-100 items-center`
let navRight = `f7 flex flex-row justify-end items-center list pa0 pa2 ma0 w-third-ns w-100`
function NavbarTop(state, emit){
    return html`
    <nav class="${styles.navbarTop}">
        <ul class="${navLeft}">
            <li class="w3 flex flex-column items-left justify-center">
                <img class="w-100" src="/assets/logo-n.png">
            </li>
            <li class="flex-grow-1 flex flex-row pl3 mw6 h-100">
                <div class="dropshadow f3 pa1 bl bt bb bg-white bw1 b--dark-pink">🔎</div>
                <input type="search" placeholder="search" class="h-100 dropshadow pl2 ba bw1 bg-white f6  b--dark-pink w-100 h-100">
            </li>
            <li class="pl3">browse</li>
        </ul>
        <ul class="${navRight}">
            <li>login | sign up</li>
        </ul>
    </nav>
    `
}