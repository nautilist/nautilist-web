var html = require('choo/html')
const styles = require('../../../../../../styles')

module.exports = view;

function view(state, emit){
    return html`
    <section class="${styles.sectionmw7}">
    lists I follow
    </section>
    `
}