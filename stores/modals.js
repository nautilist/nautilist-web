module.exports = store

function store (state, emitter) {
  
    state.modals = {
        nav:{
            displayed:false
        },
        addFeatureBtnPopup:{
            displayed:false
        },
        addLinkModal:{
            displayed:false
        },
        addListModal:{
            displayed:false
        }
    }

    // Actions
    state.events.NAVMODAL_TOGGLE = 'NAVMODAL_TOGGLE';
    state.events.ADDFEATUREBTNPOPUP_TOGGLE = 'ADDFEATUREBTNPOPUP_TOGGLE';
    
    // Events
    emitter.on('NAVMODAL_TOGGLE', () => {
        state.modals.nav.displayed = !state.modals.nav.displayed
        emitter.emit('render')
    })

    emitter.on('ADDFEATUREBTNPOPUP_TOGGLE', () => {
        state.modals.addFeatureBtnPopup.displayed = !state.modals.addFeatureBtnPopup.displayed
        emitter.emit('render')
    })

    // Doers
    

    

}
