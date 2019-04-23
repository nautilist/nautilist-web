var html = require('choo/html')
const styles = require('../../styles')
const NavbarTop = require('../../components/NavbarTop')
const Footer = require('../../components/Footer')
const MobileNavMenuModal = require('../../components/NavbarTop/components/MobileNavMenuModal')
const AddFeatureBtn = require('../../components/AddFeatureBtn')

var TITLE = 'nautilists - Link'

module.exports = LinkPage
  
function LinkPage(state, emit){

    return html`
    <body class="${styles.body}">
        ${NavbarTop(state, emit)}
        <main class="${styles.main}">
            
        </main>
        ${Footer(state, emit)}
        ${MobileNavMenuModal(state, emit)}
    </body>
    `
}

