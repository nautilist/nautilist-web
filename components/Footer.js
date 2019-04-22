const html = require('choo/html')
const styles = require('../styles');

module.exports = Footer

function Footer(){
    return html`
        <footer class="${styles.footer} w-100 f7 pa4-ns pa2 items-center">
            <ul class="list pl0 w-50-ns w-100">
                <li>Imprint</li>
                <li>License</li>
                <li><a class="${styles.aTag} pink" href="https://github.com/nautilist" target="_blank">Contribute</a></li>
                <li><a class="${styles.aTag} pink" href="https://github.com/nautilist/nautilist-web/issues" target="_blank">Issues/Reporting</a></li>
                <li>Contact: hello.nautilist at gmail dot com</li>
                <li>© 2019 NAUTILIST IS AN OPEN EDUCATIONAL INITIATIVE BY ITP.</li>
            </ul>

        <ul class="list pl0 w-50-ns w-100 tr-ns tl">
            
        </ul>
        </footer>
    `

}