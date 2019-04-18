const html = require('choo/html')
const styles = require('../../../styles')

module.exports = BrowseBtn;

function BrowseBtn(state, emit){
    return html`
    <a class="${styles.aTag}" href="/browse">browse</a>
    `
}