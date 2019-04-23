module.exports = store

function store(state, emitter) {

    state.modals = {
        nav: {
            displayed: false
        },
        addFeatureBtnPopup: {
            displayed: false
        },
        addLinkModal: {
            displayed: false,
            url: '',
            name: '',
            description: '',
            tags: [],
            selectedList: {},
            selectedSection: {}
        },
        addListModal: {
            displayed: false,
            name: '',
            description: '',
            tags: [],
            links: []
        }
    }

    // Actions
    state.events.NAVMODAL_TOGGLE = 'NAVMODAL_TOGGLE';
    state.events.ADDFEATUREBTNPOPUP_TOGGLE = 'ADDFEATUREBTNPOPUP_TOGGLE';
    state.events.ADDLISTMODAL_TOGGLE = 'ADDLISTMODAL_TOGGLE';
    state.events.ADDLISTMODAL_LINKSELECT_TOGGLE = 'ADDLISTMODAL_LINKSELECT_TOGGLE';
    state.events.ADDLISTMODAL_SUBMIT = 'ADDLISTMODAL_SUBMIT';

    state.events.ADDLINKMODAL_TOGGLE = 'ADDLINKMODAL_TOGGLE';
    state.events.ADDLINKMODAL_LISTSELECT_TOGGLE = 'ADDLINKMODAL_LISTSELECT_TOGGLE';
    state.events.ADDLINKMODAL_SECTIONSELECT_TOGGLE = 'ADDLINKMODAL_SECTIONSELECT_TOGGLE';
    state.events.ADDLINKMODAL_SUBMIT = 'ADDLINKMODAL_SUBMIT';

    state.events.modal_handle_keyup = "modal_handle_keyup"

    // Events
    emitter.on('NAVMODAL_TOGGLE', toggleDisplayed('nav'))
    emitter.on('ADDFEATUREBTNPOPUP_TOGGLE', toggleDisplayed('addFeatureBtnPopup'))

    // LIST MODAL
    emitter.on('ADDLISTMODAL_TOGGLE', toggleDisplayed('addListModal'))
    emitter.on('ADDLISTMODAL_LINKSELECT_TOGGLE', toggleLinkSelect)
    emitter.on('ADDLISTMODAL_SUBMIT', addListModal_submit)

    // LINK MODAL
    emitter.on('ADDLINKMODAL_TOGGLE', toggleDisplayed('addLinkModal'))
    emitter.on('ADDLINKMODAL_LISTSELECT_TOGGLE', toggleListSelect)
    emitter.on('ADDLINKMODAL_SECTIONSELECT_TOGGLE', toggleSectionSelect)
    emitter.on('ADDLINKMODAL_SUBMIT', addLinkModal_submit)

    emitter.on('modal_handle_keyup', modal_handle_keyup)


    // Doers
    function modal_handle_keyup(payload) {
        const {
            modalName,
            prop,
            val
        } = payload;
        state.modals[modalName][prop] = val;
    }

    function toggleDisplayed(modalName) {
        return e => {
            state.modals[modalName].displayed = !state.modals[modalName].displayed
            clearAddListModal()
            clearAddLinkModal();
            emitter.emit('render')
        }
    }

    function toggleLinkSelect(id) {
        const exists = state.modals.addListModal.links.includes(id)
        if (exists === true) {
            state.modals.addListModal.links = state.modals.addListModal.links.filter(item => item !== id);
        } else {
            state.modals.addListModal.links.push(id)
        }
        console.log(state.modals.addListModal.links)
        emitter.emit('render');
    }

    function toggleListSelect(id) {
        if (Object.keys(state.modals.addLinkModal.selectedList).length > 0 &&
            state.modals.addLinkModal.selectedList._id == id) {
            state.modals.addLinkModal.selectedList = {}
        } else {
            state.modals.addLinkModal.selectedList = state.main.lists.data.find(list => list._id === id);
        }
        emitter.emit('render');
    }

    function toggleSectionSelect(id) {
        if (Object.keys(state.modals.addLinkModal.selectedSection).length > 0 &&
            state.modals.addLinkModal.selectedSection._id == id) {
            state.modals.addLinkModal.selectedSection = {}
        } else {
            state.modals.addLinkModal.selectedSection = state.modals.addLinkModal.selectedList.sections.find(section => section._id === id);
        }
        emitter.emit('render');
    }

    function addListModal_submit(formData) {
        const payload = {
            name: formData.get('name'),
            description: formData.get('description'),
            tags: formData.get('tags').split(','),
            sections: {
                name: '',
                description: '',
                links: state.modals.addListModal.links
            }
        }

        state.api.lists.create(payload)
            .then(result => {
                alert(`new list created: ${result.name}`)
                toggleDisplayed('addListModal').call()
                toggleDisplayed('addFeatureBtnPopup').call()
                clearAddListModal()
                emitter.emit('LISTS_FIND')
            })
            .catch(err => {
                alert(err);
            })
    }

    function addLinkModal_submit(formData) {
        const payload = {
            url: formData.get('url'),
            name: formData.get('name'),
            description: formData.get('description'),
            tags: formData.get('tags').split(','),
        }

        // create the link and then push to selected section
        const {
            selectedList,
            selectedSection
        } = state.modals.addLinkModal;
        if (Object.keys(selectedList).length > 0 &&
            Object.keys(selectedSection).length > 0) {

            state.api.links.create(payload)
                .then(result => {
                    alert(`new link created: ${result.name}`)
                    const query = {
                        "query": {
                            "sections._id": selectedSection._id
                        }
                    }
                    const params = {
                        "$push": {
                            "sections.$.links": result._id
                        }
                    }
                    return state.api.lists.patch(selectedList._id, params, query)
                })
                .then(result => {
                    toggleDisplayed('addLinkModal').call()
                    toggleDisplayed('addFeatureBtnPopup').call()
                    clearAddLinkModal();
                    emitter.emit('LISTS_FIND')
                })
                .catch(err => {
                    alert(err);
                })
        } else {
            // just create the link
            state.api.links.create(payload)
                .then(result => {
                    alert(`new link created: ${result.name}`)
                    toggleDisplayed('addLinkModal').call()
                    toggleDisplayed('addFeatureBtnPopup').call()
                    clearAddLinkModal();
                    emitter.emit('LINKS_FIND')
                })
                .catch(err => {
                    alert(err);
                })
        }
    }


    function clearAddLinkModal(){
        state.modals.addLinkModal.url = '';
        state.modals.addLinkModal.name = '';
        state.modals.addLinkModal.description = '';
        state.modals.addLinkModal.tags = [];
        state.modals.addLinkModal.selectedList = {};
        state.modals.addLinkModal.selectedSection=  {};
    }

    function clearAddListModal(){
        state.modals.addListModal.name = '';
        state.modals.addListModal.description = '';
        state.modals.addListModal.tags = [];
        state.modals.addListModal.links = [];
    }

    





}