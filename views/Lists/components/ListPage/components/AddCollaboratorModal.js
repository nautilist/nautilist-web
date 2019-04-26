var Component = require('choo/component')
var html = require('choo/html')
const styles = require('../../../../../styles')

class AddCollaboratorModal extends Component {
  constructor(id, state, emit) {
    super(id)
    this.local = state.components[id] = {}
    this.state = state;
    this.emit = emit;
    
    this.addByUrl = this.addByUrl.bind(this)
    this.searchByName = this.searchByName.bind(this)
    this.searchResults = this.searchResults.bind(this)
    this.selectAndAdd = this.selectAndAdd.bind(this)
    this.showCurrentCollaborators = this.showCurrentCollaborators.bind(this)
    this.removeCollaborator = this.removeCollaborator.bind(this);
  }


  addByUrl(e) {
    e.preventDefault();
    const listId = this.state.main.selected.lists._id
    const form = new FormData(e.currentTarget);
    const url = form.get('url');
    const username = url.split("/").slice(-1).pop()

    // TODO
    this.state.api.users.find({query:{username}}).then(result => {
      if(!result.data.length > 0){
        alert("user not found!");
        return
      } 
      let profile = result.data[0];
      const params = {
        "$push": {
          "collaborators": profile._id
        }
      }
      return this.state.api.lists.patch(listId, params)
    })
    .then(result => {
      alert('added collaborator!')
      this.emit('LISTS_GET', listId)
      this.emit('render');
    })
    .catch(err => {
      alert(err);
      return err;
    })
  }

  searchByName(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const username = form.get('username');

    // console.log("searching for: ", username)
    const searchQuery = {
      "query": {
        "$search": username
      }
    }
    this.state.api.users.find(searchQuery).then(result => {
      // console.log(result.data)
      this.state.modals.addCollaboratorModal.searchResults = result.data;
      this.emit('render');
    }).catch(err => {
      alert(err)
      return err;
    })
  }

  selectAndAdd(e) {
    // console.log('clicked!');
    const userId = e.currentTarget.dataset.userid;
    const listId = this.state.main.selected.lists._id;
    const params = {
      "$push": {
        "collaborators": userId
      }
    }

    this.state.api.lists.patch(listId, params, {}).then(result => {
        // alert(JSON.stringify(result)) ;
        alert("user added as collaborator!");
        // this.emit("pushState", `/lists/${listId}`)
        return this.state.api.lists.get(result._id)
      }).then(result => {
        this.state.main.selected.lists = result;
        this.state.modals.addCollaboratorModal.searchResults = [];
        // this.rerender();
        this.showCurrentCollaborators()
        this.emit('render');
      })
      .catch(err => {
        alert(err);
      })
  }

  searchResults() {
    const {searchResults} = this.state.modals.addCollaboratorModal
    if (searchResults.length > 0) {
      let users = searchResults.map(user => {
        return html `
          <div class="w-100 bn bg-light-gray flex flex-column mb2">
            <div class="w-100 pa2 flex flex-row items-center">
              <div class="w-two-thirds">
              <p class=" w-100 ma0 b">${user.username}</p>
              </div>
              <div class="w-third tr">
              <button data-userid="${user._id}" class="dropshadow pa2 bg-dark-pink white bn" onclick=${this.selectAndAdd}>Select</button>
              </div>
            </div>
          </div>
        `
      })
      return users
    } else {
      return ''
    }
  }

  removeCollaborator(_id) {
    return e => {
      const rmId = e.currentTarget.dataset.userid;

      const params = {
        $pull: {
          "collaborators": rmId
        }
      }

      // console.log(_id, rmId)

      let del = confirm("do you really want to remove this collaborator?");
      if (del === true) {
        this.state.api.lists.patch(_id, params, {})
        .then(result => {
          this.state.main.selected.lists = result;
          this.emit('render')
        })
        .catch(err => {
          alert("error removing collaborator", err);
          return err;
        })
      } else {
        return
      }
    }

  }

  showCurrentCollaborators() {

    const {
      _id
    } = this.state.main.selected.lists
    
    const list = this.state.main.selected.lists;
    if (list.hasOwnProperty("collaboratorDetails") &&
      list.collaboratorDetails.length > 0) {
      return list.collaboratorDetails.map(collaborator => {
        return html `
        <div class="w-100 bn bg-light-gray flex flex-column mb2">
        <div class="w-100 pa2 flex flex-row items-center">
          <div class="w-two-thirds">
          <p class=" w-100 ma0 b">${collaborator.username}</p>
          </div>
          <div class="w-third tr">
          <button data-userid="${collaborator._id}" class="dropshadow pa2 bg-near-white red bn" onclick=${this.removeCollaborator(_id)}>Remove</button>
          </div>
        </div>
      </div>
        `
      })
    } else {
      return `no collaborators yet`
    }
  }

  ModalHeader(){
    return html`
    <header class="flex flex-row items-center justify-between w-100">
        <h2 class="ma0 pa0 pl2">Add Collaborators</h2>
        <button class="bn bg-navy pink bw2 pa2 h3 w3 f3 pointer" onclick=${() => this.emit('ADDCOLLABORATORMODAL_TOGGLE')}>╳</button>
    </header>
    `
  }

  ModalMain(){
    return html`
    <div class="w-100 h-100 bt bw1 b--black flex flex-row-ns flex-column overflow-y-scroll justify-center">
            
            <section class="w-50-ns w-100 h-100 pa2 pl4 pr4 bw1 br">
                <!-- Current Collaborators -->
                <h3>Current Collaborators</h3>
                ${this.showCurrentCollaborators()}
                
            </section>


            <section class="w-50-ns w-100 h-auto pa2 pl4 pr4">
            <!-- By URL section -->
            <section class="w-100 mt2 mb2">
              <h3>Add Collaborator by their profile URL</h3>
              <form id="addByUrlForm-collaborator" name="addByUrlForm-collaborator" onsubmit=${this.addByUrl}>
              <!-- url input -->
              <fieldset class="w-100 ba bw1 b--black">
              <legend>URL</legend>
              <div class="w-100 flex flex-row-ns flex-column items-center">
              <input class="w-100 b--moon-grey w-two-thirds-ns pl2 pr2 ba bw1 bg-light-gray h3 f6" type="text" name="url" placeholder="https://www.nautilists.com/users/shiffman">
              <input class="w-100 w-third-ns h3 pa2 bg-light-pink navy dropshadow bn mt2 ma0-ns" form="addByUrlForm-collaborator" type="submit" value="add collaborator">
              </div>
              </form>
            </fieldset>
            
            <!-- Search section -->
            <section class="w-100 mt2 mb2">
              <h3>Add Collaborator by searching for their username</h3>
              <!-- Search bar -->
              <form id="searchByName-collaborator" name="searchByName" onsubmit=${this.searchByName}>
              <fieldset class="w-100 ba bw1 b--black">
              <legend>Search</legend>
              <div class="w-100 flex flex-row-ns flex-column items-center">
              <input class="w-100 b--moon-grey w-two-thirds-ns pl2 pr2 ba bw1 bg-light-gray h3 f6" type="search" name="username" placeholder="e.g. shiffman">
              <input class="w-100 w-third-ns h3 pa2 bg-light-pink navy dropshadow bn bw2 mt2 ma0-ns" form="searchByName-collaborator" type="submit" value="search">
              </div>
              </fieldset>
              </form>
            </section>
            <!-- Search results -->
                <section id="searchResults-collaborator" class="flex flex-column h5 overflow-y-scroll">
                ${this.searchResults()}
                </section>
            </section>
        </div>
    `
  }

  createElement() {
    if(this.state.modals.addCollaboratorModal.displayed === true){
    return html `
    <div class="${styles.modalContainer}" style="background:rgba(232, 253, 245, 1)">
      
        ${this.ModalHeader()}
        
        ${this.ModalMain()}
        
      <!-- invisible div under the modal to capture out of modal click to close -->
      <div class="dn w-100 h-100 fixed top-0 left-0" onclick=${()=> this.emit('ADDCOLLABORATORMODAL_TOGGLE')}></div>
    </div>
    `
  } else {
    return html`<div></div>`
  }

}

  update() {
    return true
  }
}

module.exports = AddCollaboratorModal