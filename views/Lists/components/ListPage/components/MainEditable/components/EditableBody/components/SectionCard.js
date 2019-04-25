var html = require('choo/html');
const styles = require('../../../../../../../../../styles')
const removeBtn = require('./RemoveBtn')
const editBtn = require('./EditBtn')
const LinkCards = require('./LinkCards')

module.exports = function (section, sectionsDetails, state, emit){
    const {name, description, links} = section;
    const linksEl = LinkCards(links, sectionsDetails, section, state, emit)
    const selectedList = state.main.selected.lists

    console.log(selectedList)
    return html`
    <li class="w-100" data-id=${section._id}>
    <fieldset  class="mt3 mb3 bg-white b--light-green ba bw1 dropshadow pa3">
     <legend class="${styles.legend} ma0 pa0 f5 f4-ns">${name} ${editBtn('sections', section._id, state, emit)}
     ${removeBtn('sections', selectedList._id, section._id, state, emit)}</legend>
    
     <p class="ma0 pa0 f7 f6-ns">${description}</p>
     <ul class="list pl3 pr3 nested-sortable" data-sectionid=${section._id}>
        ${linksEl}
     </ul>
     </fieldset>
    </li>
    `
}
