const html = require('choo/html')
const styles = require('../../../styles')
const LogoMain = require('./LogoMain');

module.exports = MobileNav

function mobileNavMenuBtn(state, emit){
    return html`
        <button class="bn bg-transparent pointer underline" onclick=${() => emit('NAVMODAL_TOGGLE')}>menu</button>
    `
}

function MobileNav(state, emit){
    

    return html`
    <ul class="list pa2 ma0 f7 w-100 h-100 dn-ns flex flex-row justify-between">
        <li class="h-100 w3">
            ${LogoMain()}
        </li>
        <li>
            <p>nautilists</p>
        </li>
        <li class="h-100 flex flex-column justify-center">
            ${mobileNavMenuBtn(state, emit)}
        </li>
    </ul>
    `
}