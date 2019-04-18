var html = require('choo/html')
const styles = require('../../styles')
const NavbarTop = require('../../components/NavbarTop')
const MobileNavMenuModal = require('../../components/NavbarTop/components/MobileNavMenuModal')
const Footer = require('../../components/Footer')

const LoginPage = require('./components/LoginPage')
const SignupPage = require('./components/SignupPage')
const VerifyPage = require('./components/VerifyPage')
const VerifyRedirectPage = require('./components/VerifyRedirectPage')
const ResetPasswordPage = require('./components/ResetPasswordPage')

var TITLE = 'nautilists - lists'

module.exports = view

function view (state, emit) {
    if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  
    switch(state.route){
      case 'login':
          return LoginPage(state, emit);
      case 'signup':
          return SignupPage(state, emit);
      case 'verify':
          return VerifyPage(state, emit);
      case 'reset':
          return ResetPasswordPage(state, emit);
      case 'verifyRedirect':
          return VerifyRedirectPage(state, emit);
      default:
          return html`<body>nothing found</body>`
    }
  }
  
  


// function VerifyPage(state, emit){
      
//     return html`
//     <body class="${styles.body}">
//     ${NavbarTop(state, emit)}
//     <main class="${styles.main}">
        
//     </main>
//     ${Footer(state, emit)}
//     ${MobileNavMenuModal(state, emit)}
//   </body>
//     `
// }

// function ResetPasswordPage(state, emit){
      
//     return html`
//     <body class="${styles.body}">
//     ${NavbarTop(state, emit)}
//     <main class="${styles.main}">
        
//     </main>
//     ${Footer(state, emit)}
//     ${MobileNavMenuModal(state, emit)}
//   </body>
//     `
// }


