var Component = require('choo/component')
var html = require('choo/html')

class AddFeatureBtn extends Component {
  constructor (id, state, emit) {
    super(id)
    this.state = state;
    this.emit = emit;
    this.local = state.components[id] = {
        popup: 'dn',
    }
    this.togglePopup = this.togglePopup.bind(this);
    this.toggleListModal= this.toggleListModal.bind(this);
    this.toggleLinkModal= this.toggleLinkModal.bind(this);
  }
  
  toggleLinkModal(e){
    this.emit('ADDLINKMODAL_TOGGLE')
  }

  toggleListModal(e){
    this.emit('LINKS_FIND', {query:{$sort:{'createdAt':-1}}})
    this.emit('ADDLISTMODAL_TOGGLE')
    }

  togglePopup(e){
    this.emit('ADDFEATUREBTNPOPUP_TOGGLE')
  }
  
  createElement () {
    return html`
      <div class="fixed bottom-0 right-0 max-z mr3 mb3">
        <div class="absolute ${this.local.popup}" style="bottom:56px; right:0px;">
          <ul class="list pl0 w4 tr dropshadow">
            <li>
              <button 
                onclick=${this.toggleLinkModal}
                class="button-reset w-100 tc grow ba bw1 bg-light-green b--white pa1"> <p class="w-100 h1"><img class="h1" src="/assets/1F517.png"> link</p>
              </button>
            </li>
            <li>
              <button 
                onclick=${this.toggleListModal}
                class="button-reset w-100 tc grow ba bw1 bg-yellow b--white pa1"> <p class="w-100 h1"><img class="h1" src="/assets/1F4A5.png"> list</p>
              </button>
            </li>
          </ul>
        </div>
        <button class="absolute bottom-0 right-0 bn w3 h3 br-100 bg-light-pink shadow-5" onclick=${this.togglePopup}>+</button>
      </div>
    `
  }

  update () {
    this.local.popup = this.state.modals.addFeatureBtnPopup.displayed == false ? 'dn' : 'flex'
    return true
  }
}

module.exports = AddFeatureBtn