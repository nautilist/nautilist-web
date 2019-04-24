var html = require('choo/html')
const Sortable = require('sortablejs');
const moment = require('moment');
const styles = require('../../../../../../styles')

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

function EditableHeader(list){
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

function EditableBody(list, state, emit){
    const{sections, sectionsDetails} = list;
    if(!sections){
        return ''
    }
    let els = html`
        <ul class="w-100 pa0 list">
        ${SectionCards(sections, sectionsDetails)}
        </ul>
    `
    makeSortable(els, state, emit);
    return html`
        <section class="w-100 pa0">
            ${els}
        </section>
    `
}


function SectionCards(sections, sectionsDetails){
    return sections.map(section => SectionCard(section, sectionsDetails))
}

function SectionCard(section, sectionsDetails){
    const {name, description, links} = section;
    const linksEl = LinkCards(links, sectionsDetails)

    return html`
    <li class="w-100" data-id=${section._id}>
    <fieldset  class="mt3 mb3 bg-white b--light-green ba bw1 dropshadow pa3">
     <legend class="${styles.legend} ma0 pa0 f5 f4-ns">${name}</legend>
     <p class="ma0 pa0 f7 f6-ns">${description}</p>
     <ul class="list pl3 pr3 nested-sortable" data-sectionid=${section._id}>
        ${linksEl}
     </ul>
     </fieldset>
    </li>
    `
}

function LinkCard(link, sectionsDetails){
    // link in this case is the id of the link
    const feature = sectionsDetails.find(item => item._id === link);
    const {name, description, url, updatedAt} = feature;
    return html`
        <li data-id="${feature._id}" class="w-100 ba bw1 mt2 mb2 pa3-ns pa2 bg-washed-red dropshadow flex flex-column flex-row-ns justify-between-ns pointer">
            <div class="w-75-ns w-100">
            <small class="f8 ma0 pa0">${url}</small>
            <h2 class="pa0 ma0 f4 f5-ns">${name}</h2>
            <p class="pa0 mt2 f7 f6-ns">${description}</p>
            </div>
            <div class="w-25-ns w-100 tr">
            <small class="f8 ma0 pa0">${formatTime(updatedAt)}</small>
            </div>
        </li>
    `
}

function LinkCards(links, sectionsDetails){
    return links.map(link => LinkCard(link, sectionsDetails));
}



function formatTime(ts){
    return moment(ts).format('MMMM Do YYYY, h:mm a')
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

    // console.log(nestedSortables)
    
    nestedSortables.forEach( feature => {
        state.listPage.sortables.push( new Sortable( feature, sortableConfig));
    })

    state.listPage.sortable = new Sortable(el, sortableConfig)

}


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
      
    //   // console.log("section order: ", sectionOrder);
    //   // console.log("nested list order: ", listOrder);

      const newSections = sectionOrder.map(sectionid => {
        let data = state.main.selected.lists.sections.find(item => item._id === sectionid);
        data.links = listOrder.find(item => item.id === sectionid).links
        return data;
      })

      console.log(newSections)

      
    //   // TODO: make a less precarious way to patch many
    //   // for now fully overwrite sections
      const data = {
          sections: newSections
      }

      const {_id} = state.params;

      state.api.lists.patch(_id, data, {})
        .then(result => {
          console.log("patched:", result.links)
          const {linksDetails, links} = result;
          state.main.selected.lists = result;
          // this.rerender();
          emit('render');
        })
        .catch(err => {
          alert(err);
        })
    }
  } // end handleSorting
