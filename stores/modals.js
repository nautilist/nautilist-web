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
            displayed:false,
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
    state.events.ADDLISTMODAL_LINKSELECT_TOGGLE = 'ADDLISTMODAL_LINKSELECT_TOGGLE';
    state.events.ADDLISTMODAL_SUBMIT = 'ADDLISTMODAL_SUBMIT';

    state.events.modal_handle_keyup = "modal_handle_keyup"

    // Events
    emitter.on('NAVMODAL_TOGGLE', toggleDisplayed('nav'))
    emitter.on('ADDFEATUREBTNPOPUP_TOGGLE', toggleDisplayed('addFeatureBtnPopup'))
    emitter.on('ADDLINKMODAL_TOGGLE', toggleDisplayed('addLinkModal'))
    emitter.on('ADDLISTMODAL_TOGGLE', toggleDisplayed('addListModal'))

    emitter.on('ADDLISTMODAL_LINKSELECT_TOGGLE', toggleLinkSelect)
    emitter.on('ADDLISTMODAL_SUBMIT', addListModal_submit)

    emitter.on('modal_handle_keyup', modal_handle_keyup)
    

    // Doers
    function modal_handle_keyup(payload){
        const {modalName, prop, val} = payload;
        state.modals[modalName][prop] = val;
    }

    function toggleDisplayed(modalName){
        return e=> {
            state.modals[modalName].displayed = !state.modals[modalName].displayed
            emitter.emit('render')
        }
    }

    function toggleLinkSelect(id){
        const exists = state.modals.addListModal.links.includes(id)
        if(exists === true){
            state.modals.addListModal.links = state.modals.addListModal.links.filter(item => item !== id );
        } else {
            state.modals.addListModal.links.push(id)
        }
        console.log(state.modals.addListModal.links)
        emitter.emit('render');
    }

    function addListModal_submit(formData){
        const payload = {
            name: formData.get('name'),
            description: formData.get('description'),
            tags: formData.get('tags').split(','),
            sections:{
                name:'',
                description:'',
                links: state.modals.addListModal.links
            }
        }

        state.api.lists.create(payload)
            .then(result => {
                alert(`new list created: ${result.name}`)
                toggleDisplayed('addListModal').call()
                toggleDisplayed('addFeatureBtnPopup').call()
                emitter.emit('LISTS_FIND')
            })
            .catch(err => {
                alert(err);
            })
    }



    

}
