const html = require('choo/html')
const styles = require('../../../styles')

module.exports = SearchInput;

function SearchInput(){
    return html`
    <div class="flex-grow-1 flex flex-row pl3 mw6 h-100">
        <div style="max-width:40px" class="h-100 flex flex-column items-center justify-center dropshadow pa1 bl bt bb bg-white bw1 b--dark-pink">
            <img class="w-100 ma0 pa0" src="/assets/1F50E.png">
        </div>
        <input type="search" placeholder="search" class="h-100 dropshadow pl2 ba bw1 bg-white f6  b--dark-pink w-100 h-100">
    </div>
    `
}