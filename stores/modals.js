module.exports = store

function store (state, emitter) {
  
    state.modals = {
        nav:{
            displayed:false
        }
    }

    // Actions
    state.events.NAVMODAL_TOGGLE = 'NAVMODAL_TOGGLE';
    
    // Events
    emitter.on(state.events.NAVMODAL_TOGGLE, () => {
        state.modals.nav.displayed = !state.modals.nav.displayed
        emitter.emit('render')
    })

    // Doers
    

    

}
