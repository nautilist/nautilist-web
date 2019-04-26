var html = require('choo/html')
const moment = require('moment');
const styles = require('../../../../../../styles')

module.exports = view;

function view(state, emit){
    const {lists} = state.main.selected.user;

    if(!Object.keys(lists).length > 0){
        return 'loading'
    }
    
    return html`
    <section class="${styles.sectionmw7} pa2 bn bg-white mt3 mb5">
        ${ListHeaderRow(state, emit)}
        <ul class="list pl0">
            ${ListCards(lists.data, state, emit)}
        </ul>
    </section>
    `
}

// 2019-04-16T23:53:20.763Z

function ListHeaderRow(state, emit){
    return html`
    <div class="${styles.mw7} flex flex-row justify-between pa2 bb bw1">
        <div>
            <p class="ma0 pa0 f7">Name</p>
        </div>
        <div>
            <p class="ma0 pa0 f7">Updated</p>
        </div>
    </div>
    `

}

function formatTime(ts){
    return moment(ts).format('MMMM Do YYYY, h:mm a')
}

function ListCard(list, state, emit){
    const {_id,name, description, ownerDetails, updatedAt} = list;

    function navigateTo(e){
        emit('pushState',`/lists/${_id}`)
    }

    return html`
    <li onclick=${navigateTo}
        class="w-100 ba bw1 mt2 mb2 pa3-ns pa2 bg-washed-green dropshadow flex flex-column flex-row-ns justify-between-ns pointer">
        <div class="w-75-ns w-100">
        <h2 class="pa0 ma0 f5 f4-ns">${name}</h2>
        <p class="pa0 ma0 f7 f6-ns">${description}</p>
        </div>
        <div class="w-25-ns w-100 tr">
        <small class="f8 ma0 pa0">${formatTime(updatedAt)}</small>
        </div>
    </li>
    `
}

function ListCards(lists, state, emit){
    return lists.map(list => ListCard(list, state, emit))
}