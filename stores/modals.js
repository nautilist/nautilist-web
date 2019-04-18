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
            displayed:false,
            name:null,
            description:null,
            tags:[]
        },
        addListModal:{
            displayed:true,
            name:null,
            description:null,
            tags:[],
            links:[]
        }
    }

    // Actions
    state.events.NAVMODAL_TOGGLE = 'NAVMODAL_TOGGLE';
    state.events.ADDFEATUREBTNPOPUP_TOGGLE = 'ADDFEATUREBTNPOPUP_TOGGLE';
    state.events.ADDLINKMODAL_TOGGLE = 'ADDLINKMODAL_TOGGLE';
    state.events.ADDLISTMODAL_TOGGLE = 'ADDLISTMODAL_TOGGLE';
    
    // Events
    emitter.on('NAVMODAL_TOGGLE', toggleDisplayed('nav'))
    emitter.on('ADDFEATUREBTNPOPUP_TOGGLE', toggleDisplayed('addFeatureBtnPopup'))
    emitter.on('ADDLINKMODAL_TOGGLE', toggleDisplayed('addLinkModal'))
    emitter.on('ADDLISTMODAL_TOGGLE', toggleDisplayed('addListModal'))

    // Doers
    function toggleDisplayed(modalName){
        return e=> {
            state.modals[modalName].displayed = !state.modals[modalName].displayed
            emitter.emit('render')
        }
    }

    

}
