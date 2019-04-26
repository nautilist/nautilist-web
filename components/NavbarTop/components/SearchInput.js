const html = require('choo/html')
const styles = require('../../../styles')

module.exports = SearchInput;

function SearchInput(state, emit){

    function handleKeyUp(e){
        emit('searchTerm_update', e.target.value);
    }
    function handleSubmit(e){
        e.preventDefault();
        console.log('submit search')
        const searchTerm = new FormData(e.currentTarget).get('search')
        emit('NAVSEARCH_FIND')
    }

    return html`
    <form class="flex-grow-1 flex flex-row pl3 h-100" onsubmit=${handleSubmit}>
    <div style="max-width:40px" class="h-100 flex flex-column items-center justify-center dropshadow pa1 bl bt bb bg-white bw1 b--dark-pink">
        <img class="w-100 ma0 pa0" src="/assets/1F50E.png">
    </div>
    <input onkeyup=${handleKeyUp} value="${state.search.searchTerm}" type="search" name="search" placeholder="search" class="h-100 dropshadow pl2 ba bw1 bg-white f6  b--dark-pink w-100 h-100"></input>
    </form>
    `
}

