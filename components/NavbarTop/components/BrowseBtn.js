const html = require('choo/html')
const styles = require('../../../styles')

module.exports = BrowseBtn;

function BrowseBtn(state, emit){
   
    function handleClick(e){
        emit('BROWSE_FIND');
        emit('NAVMODAL_CLOSE');
        emit('pushState', '/browse')
    }
    return html`
    <button class="bn bg-transparent pointer" onclick=${handleClick}>browse</button>
    `
}