var html = require('choo/html')
const moment = require('moment');
const styles = require('../../../../../../styles')

module.exports = view;

function view(state, emit){
    const {links} = state.main.selected.user;

    if(!Object.keys(links).length > 0){
        return 'loading'
    }
    
    return html`
    <section class="${styles.sectionmw7} pa2 bn bg-light-pink dropshadow mt3 mb5">
        ${LinkHeaderRow(state, emit)}
        <ul class="list pl0">
            ${LinkCards(links.data, state, emit)}
        </ul>
    </section>
    `
}

// 2019-04-16T23:53:20.763Z

function LinkHeaderRow(state, emit){
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

function LinkCard(link, state, emit){
    const {name, description, ownerDetails, updatedAt, url} = link;
    return html`
    <li class="w-100 ba bw1 mt2 mb2 pa3-ns pa2 bg-washed-red dropshadow flex flex-column flex-row-ns justify-between-ns">
        <div class="w-75-ns w-100">
        <small class="f8 ma0 pa0">${url}</small>
        <h2 class="pa0 ma0 f4 f5-ns">${name}</h2>
        <p class="pa0 ma0 f7 f6-ns">${description}</p>
        </div>
        <div class="w-25-ns w-100 tr">
        <small class="f8 ma0 pa0">${formatTime(updatedAt)}</small>
        </div>
    </li>
    `
}

function LinkCards(links, state, emit){
    return links.map(link => LinkCard(link, state, emit))
}