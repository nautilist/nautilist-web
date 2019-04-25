var html = require('choo/html')
const Sortable = require('sortablejs');


const SectionCards = require('./components/SectionsCards');

module.exports = view;

function view(list, state, emit){
    const{sections, sectionsDetails} = list;
    if(!sections){
        return ''
    }

    const els = html`
    <ul class="w-100 pa0 list">
        ${SectionCards(sections, sectionsDetails, state, emit)}
    </ul>
    `
    // make sortable
    makeSortable(els, state, emit);

    // return the html
    return html`
        <section class="w-100 pa0">
            ${els}
        </section>
    `
}


function makeSortable(el, state, emit){
    const{listPage} = state;
    state.listPage.sortables = [];
    console.log(el)
    let nestedSortables = [].slice.call(el.querySelectorAll('.nested-sortable'));

    const sortableConfig = {
      animation: 150,
      direction:'vertical',
      onMove: event => {
        // return !event.related.classList.contains('disabled');
        if(listPage.editable == false){
          return false;
        } else {
          return true
        }
      },
      onSort: handleSorting(state, emit)
    }
    
    nestedSortables.forEach( feature => {
        state.listPage.sortables.push( new Sortable( feature, sortableConfig));
    })

    state.listPage.sortable = new Sortable(el, sortableConfig)

}

// TODO: MOVE THIS OUT TO AN EMITTER
function handleSorting(state, emit){
    return e => {
      const {item} = e;
      const {listPage} = state;
      let listOrder = listPage.sortables.map(item => {
        return {
          id:  item.el.dataset.sectionid,
          links: item.toArray()
        };
      })
      console.log(listOrder);
      
      const sectionOrder = listPage.sortable.toArray()
      
      // console.log("section order: ", sectionOrder);
      // console.log("nested list order: ", listOrder);

      const newSections = sectionOrder.map(sectionid => {
        let data = state.main.selected.lists.sections.find(item => item._id === sectionid);
        data.links = listOrder.find(item => item.id === sectionid).links
        return data;
      })

      console.log(newSections)

      
       // TODO: make a less precarious way to patch many
       // for now fully overwrite sections
      const data = {
          sections: newSections
      }

      const {_id} = state.params;

      state.api.lists.patch(_id, data, {})
        .then(result => {
          console.log("patched:", result.links)
          const {linksDetails, links} = result;
          state.main.selected.lists = result;
          emit('render');
        })
        .catch(err => {
          alert(err);
        })
    }
  } // end handleSorting
