const html = require('choo/html')
const styles = require('../styles');
const NavbarTop = require('./NavbarTop')

module.exports = Layout

function Layout(state, emit){
    
    return html`
        <body class="${styles.body}">
            ${NavbarTop(state, emit)}
            <main class="${styles.main}">
                
            </main>
            <footer class=${styles.footer}>footer</footer>
        </body>
    `
}
