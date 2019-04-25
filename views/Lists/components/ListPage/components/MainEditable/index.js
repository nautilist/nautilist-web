var html = require('choo/html')
const Sortable = require('sortablejs');
const moment = require('moment');
const styles = require('../../../../../../styles')


const EditableHeader = require('./components/EditableHeader');
const EditableBody = require('./components/EditableBody');


module.exports = view;


const mainContainer_styles = `${styles.sectionmw7} mt3`

function view(list, state, emit){

    return html`
    <section class="${mainContainer_styles}">
        ${EditableHeader(list)}
        ${EditableBody(list, state, emit)}
    </section>
    `
}


