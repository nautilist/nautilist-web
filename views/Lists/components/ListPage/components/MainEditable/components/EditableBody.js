var Component = require('choo/component')
var html = require('choo/html')
const Sortable = require('sortablejs');
const moment = require('moment');
const styles = require('../../../../../../../styles')

function formatTime(ts) {
  return moment(ts).format('MMMM Do YYYY, h:mm a')
}

class EditableBody extends Component {
  constructor(id, state, emit) {
    super(id)
    this.state = state;
    this.emit = emit;
    this.local = state.components[id] = {}
    this.makeSortable = this.makeSortable.bind(this);
    this.handleSorting = this.handleSorting.bind(this);
    this.SectionCard = this.SectionCard.bind(this);
    this.SectionCards = this.SectionCards.bind(this);
    this.LinkCard = this.LinkCard.bind(this);
    this.LinkCards = this.LinkCards.bind(this);
    this.RemoveBtn = this.RemoveBtn.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.EditBtn = this.EditBtn.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleRemove(prop, parentid, featureid) {
    return e => {
      let c = confirm(`are you sure you want to remove ${featureid} at ${parentid} of ${prop}?`)
      if (c === true) {
        let query, params;

        if (prop === 'links') {
          query = {
            "query": {
              "sections._id": parentid
            }
          }
          params = {
            "$pull": {
              "sections.$.links": featureid
            }
          }
        } else if (prop === 'sections') {
          query = null,

            params = {
              $pull: {
                "sections": {
                  _id: featureid
                }
              }
            }

        }

        this.state.api.lists.patch(this.state.params._id, params, query)
          .then(result => {
            this.state.main.selected.lists = result;
            emit('render');
          })
          .catch(err => {
            alert(err);
          })

      } else {
        return;
      }
    }
  }

  handleEdit(prop, featureid) {
    return e => {
      if (prop === 'sections') {
        const query = {
          query: {
            "sections._id": featureid
          }
        }

        this.state.api.lists.find(query)
          .then(result => {
            const selectedList = result.data[0];
            const selectedSection = selectedList.sections.find(item => item._id === featureid);
            const {
              name,
              tags,
              description
            } = selectedSection
            this.emit('EDITFEATUREMODAL_SET_VALUES', {
              _id: selectedList._id,
              featureid,
              name,
              description,
              tags,
              prop
            });
            this.emit('EDITFEATUREMODAL_TOGGLE')
            return
          }).catch(err => {
            alert(err);
            return
          })
      } else {

        this.state.api[prop].get(featureid)
          .then(result => {
            const {
              name,
              url,
              description,
              tags,
              _id
            } = result;
            this.emit('EDITFEATUREMODAL_SET_VALUES', {
              _id,
              featureid,
              name,
              url,
              description,
              tags,
              prop
            });
            this.emit('EDITFEATUREMODAL_TOGGLE')
            return
          })
          .catch(err => {
            alert(err);
            return
          })
      }

    }

  }

  RemoveBtn(prop, parentid, featureid) {
    return html `
      <button onclick=${this.handleRemove(prop, parentid,featureid)} class="f7 bn bg-near-white red">remove</button>
    `
  }

  EditBtn(prop, featureid) {
    return html `
      <button onclick=${this.handleEdit(prop,featureid)} class="f7 bn bg-light-green navy mr2">edit</button>
    `
  }


  LinkCard(link, sectionsDetails, section) {
    // link in this case is the id of the link
    const feature = sectionsDetails.find(item => item._id === link);
    const {
      name,
      description,
      url,
      updatedAt
    } = feature;
    return html `
        <li data-id="${feature._id}" class="w-100 ba bw1 mt2 mb2 pa3-ns pa2 bg-washed-red dropshadow flex flex-column">
            <div class="w-100 flex flex-row justify-end">
                ${this.EditBtn('links', feature._id)}
                ${this.RemoveBtn('links', section._id, feature._id)}
            </div>
            <div class="flex flex-row-ns justify-between-ns pointer flex-column">
            <div class="w-75-ns w-100">
            <small class="f8 ma0 pa0">${url}</small>
            <h2 class="pa0 ma0 f4 f5-ns">${name}</h2>
            <p class="pa0 mt2 f7 f6-ns">${description}</p>
            </div>
            <div class="w-25-ns w-100 tr">
            <small class="f8 ma0 pa0">${formatTime(updatedAt)}</small>
            </div>
            </div>
        </li>
    `
  }

  LinkCards(links, sectionsDetails, section) {
    return links.map(link => this.LinkCard(link, sectionsDetails, section));
  }


  SectionCard(section, sectionsDetails) {
    const {
      name,
      description,
      links
    } = section;

    const linksEl = this.LinkCards(links, sectionsDetails, section)
    const selectedList = this.state.main.selected.lists

    return html `
    <li class="w-100" data-id=${section._id}>
    <fieldset  class="mt3 mb3 bg-white b--light-green ba bw1 dropshadow pa3">
     <legend class="${styles.legend} ma0 pa0 f5 f4-ns">${name} ${this.EditBtn('sections', section._id)}
     ${this.RemoveBtn('sections', selectedList._id, section._id)}</legend>
    
     <p class="ma0 pa0 f7 f6-ns">${description}</p>
     <ul class="list pl3 pr3 nested-sortable" data-sectionid=${section._id}>
        ${linksEl}
     </ul>
     </fieldset>
    </li>
    `
  }

  SectionCards(sections, sectionsDetails) {
    return sections.map(section => this.SectionCard(section, sectionsDetails))
  }

  createElement(list) {
    const {
      sections,
      sectionsDetails
    } = list;

    if (!sections) {
      return ''
    }

    const els = html `
    <ul class="w-100 pa0 list">
        ${this.SectionCards(sections, sectionsDetails)}
    </ul>
    `
    // return the html
    return els
  }

  update() {
    return true
  }

  makeSortable(el) {
    const {
      listPage
    } = this.state;

    this.state.listPage.sortables = [];

    let nestedSortables = [].slice.call(el.querySelectorAll('.nested-sortable'));

    const sortableConfig = {
      animation: 150,
      direction: 'vertical',
      onMove: event => {
        // return !event.related.classList.contains('disabled');
        if (listPage.editable == false) {
          return false;
        } else {
          return true
        }
      },
      onSort: this.handleSorting()
    }

    nestedSortables.forEach(feature => {
      this.state.listPage.sortables.push(new Sortable(feature, sortableConfig));
    })

    this.state.listPage.sortable = new Sortable(el, sortableConfig)
  }

  handleSorting(item) {
    return e => {
      const {
        listPage
      } = this.state;

      let listOrder = listPage.sortables.map(item => {
        return {
          id: item.el.dataset.sectionid,
          links: item.toArray()
        };
      })

      const sectionOrder = listPage.sortable.toArray()

      // console.log("section order: ", sectionOrder);
      // console.log("nested list order: ", listOrder);

      // IF Something is funky, check if your id's are getting clobbered!
      const newSections = sectionOrder.map(sectionid => {
        let data = this.state.main.selected.lists.sections.find(_item => _item._id === sectionid);
        data.links = listOrder.find(_item => _item.id === sectionid).links
        return data;
      })

      // TODO: make a less precarious way to patch many
      // for now fully overwrite sections
      const data = {
        sections: newSections
      }

      const {
        _id
      } = this.state.params;

      this.emit('LISTS_PATCH', _id, data, {})

    }
  }

  load(el) {
    this.makeSortable(el);
  }

  afterupdate(el) {
    this.makeSortable(el);
  }

}

module.exports = EditableBody