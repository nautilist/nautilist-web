var html = require('choo/html')
const styles = require('../../../../../../../styles')

module.exports = view;

function view(list){
    const {name, description, ownerDetails} = list;
    const{followersDetails} = list;
    
    if(!followersDetails){
        return ''
    }

    const numFollowers = followersDetails.length

    return html`
        <header class="w-100 pa2 ba bw1 dropshadow">
            <p class="ma0 pa0 f7">${numFollowers} followers</p>
            <form class="ma0 pa0">
            <input class="ma0 pa2 f3-ns f4 w-100  bg-near-white ba bw1 b--moon-gray" value=${list.name}>
            <p class="ma0 pa0 f7">by ${ownerDetails.username}</p>
            <textarea class="mt2 pa2 f5-ns f6 w-100  bg-near-white ba bw1 b--moon-gray">${list.description}</textarea>
            </form>
        </header>
    `
}