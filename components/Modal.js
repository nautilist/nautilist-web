var Component = require('choo/component')
var html = require('choo/html')

class Modal extends Component {
  constructor (id, state, emit) {
    super(id)
    this.state = state;
    this.emit = emit;
    // this.local = state.components[id] = {
    //   displayed: false,
    //   open: this.open.bind(this),
    //   close: this.close.bind(this),
    //   toggleModalDisplay: this.toggleModalDisplay.bind(this)
    // }
  }

  toggleModalDisplay(){
    this.local.displayed = !this.local.displayed
  }

  open(){
    console.log('open')
  }
  close(){
    console.log('close')
  }

  createElement () {
    return html`
      <div>
      </div>
    `
  }

  update () {
    return true
  }
}

module.exports = Modal