const html = require('choo/html')
const styles = require('../styles');

module.exports = Footer

function Footer(){
    return html`
        <footer class=${styles.footer}></footer>
    `

}