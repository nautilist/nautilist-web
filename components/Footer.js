const html = require('choo/html')
const styles = require('../styles');

module.exports = Footer

function Footer(){
    return html`
        <footer class="${styles.footer} w-100 f7 pa4-ns pa2 items-center">
            <ul class="list pl0 w-100-ns w-100 tc">
                <li>Imprint</li>
                <li>License</li>
                <li><a class="${styles.aTag} pink" href="https://github.com/nautilist" target="_blank">Contribute</a></li>
                <li><a class="${styles.aTag} pink" href="https://github.com/nautilist/nautilist-web/issues" target="_blank">Issues/Reporting</a></li>
                <li>contact: hello.nautilist at gmail dot com</li>
                <li>© 2019 nautilist is an open educational initiative by ITP.</li>
            </ul>
        </footer>
    `

}