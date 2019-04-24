var html = require('choo/html')
const styles = require('../../../../../../styles')
module.exports = view;

const mainContainer_styles = `${styles.sectionmw7} mt3`

function view(list){
    return html`
    <section class="${mainContainer_styles}">
        ${EditableHeader(list)}
    </section>
    `
}

function EditableHeader(list){
    return html`
        <header class="w-100 pa2 ba bw1 dropshadow">
            EDITING
            <form class="ma0 pa0">
            <input class="ma0 pa2 f3-ns f4 w-100 bn bg-washed-red" value=${list.name}>
            <textarea class="mt2 pa2 f5-ns f6 w-100 bn bg-washed-red">${list.description}</textarea>
            </form>
        </header>
    `
}

