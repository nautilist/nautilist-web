var html = require('choo/html')
const styles = require('../../styles')
var TITLE = 'nautilists - lists'

module.exports = view

function view (state, emit) {
    if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  
    switch(state.route){
      case 'login':
          return LoginPage(state, emit);
          break;
      case 'signup':
          return SignupPage(state, emit);
          break;
      case 'verify':
          return VerifyPage(state, emit);
          break;
      case 'reset':
          return ResetPasswordPage(state, emit);
          break;
      default:
          return html`<body>nothing found</body>`
    }
  }
  
  
function LoginPage(state, emit){
      
      return html`
          <body class="${styles.body}">
              Login
          </body>
      `
  }
  
  function SignupPage(state, emit){
      
    return html`
        <body class="${styles.body}">
            Signup
        </body>
    `
}

function VerifyPage(state, emit){
      
    return html`
        <body class="${styles.body}">
            Verify
        </body>
    `
}

function ResetPasswordPage(state, emit){
      
    return html`
        <body class="${styles.body}">
            Reset password
        </body>
    `
}


