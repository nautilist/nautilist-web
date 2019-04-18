const html = require('choo/html')
const styles = require('../../../styles')

module.exports = LogoMain

function LogoMain(){
    return html`
    <a class="w-100 ${styles.aTag}" href="/"><img class="w-100" src="/assets/logo-n.png"></a>
    `
}