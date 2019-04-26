const html = require('choo/html')
const styles = require('../../styles');
const AuthBtn = require('./components/AuthBtn')
const LogoMain = require('./components/LogoMain')
const MobileNav = require('./components/MobileNav')
const SearchInput = require('./components/SearchInput')
const BrowseBtn = require('./components/BrowseBtn')

module.exports = NavbarTop

let styles_navLeft = `dn f7 flex-ns flex-row list pa0 pa2 ma0 w-two-thirds-ns w-100 items-center`
let styles_navRight = `dn f7 flex-ns flex-row justify-end items-center list pa0 pa2 ma0 w-third-ns w-100`
let styles_logoContainer = `dn w3 flex-ns flex-column items-left justify-center`
let styles_searchContainer = `dn h-100 w-100 flex-ns`


function NavbarTop(state, emit){
    return html`
    <nav class="${styles.navbarTop}">
            <ul class="${styles_navLeft}">
                <li class="${styles_logoContainer}">
                    ${LogoMain()}
                </li>
                <li class="${styles_searchContainer} mw6">
                    ${SearchInput(state, emit)}
                </li>
                <li class="pl3">
                    ${BrowseBtn(state, emit)}
                </li>
            </ul>
            <ul class="${styles_navRight}">
                <li>${AuthBtn(state, emit)}</li>
            </ul>
            <!-- mobile -->
            ${MobileNav(state, emit)}
    </nav>
    `
}

