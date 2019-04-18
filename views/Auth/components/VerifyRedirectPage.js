var html = require('choo/html')
const styles = require('../../../styles')
const NavbarTop = require('../../../components/NavbarTop')
const MobileNavMenuModal = require('../../../components/NavbarTop/components/MobileNavMenuModal')
const Footer = require('../../../components/Footer')

module.exports = VerifyRedirectPage;

function VerifyRedirectPage(state, emit){
      
    return html`
    <body class="${styles.body}">
    ${NavbarTop(state, emit)}
    <main class="${styles.main} items-center">
        ${MessageArea()}
    </main>
    ${Footer(state, emit)}
    ${MobileNavMenuModal(state, emit)}
  </body>
    `
}


function MessageArea(state, emit){
    return html`
    <section class="${styles.sectionmw7} justify-center flex flex-column">
        <h3 class="">Check your email for a verification email from hello.nautilist@gmail.com. For now, you can:</h3>
        <h3 class="">→ <a class="${styles.aTag}" href="/">Home</a></h3>
        <h3 class="">→ <a class="${styles.aTag}" href="/browse">Browse</a></h3>
    </section>
    `
}

