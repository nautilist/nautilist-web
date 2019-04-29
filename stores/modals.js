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
        },
        editProfileModal: {
            displayed: false,
            bio: '',
        },
        editFeatureModal: {
            displayed: false,
            _id: null,
            featureid: null,
            prop: null,
            url: '',
            name: '',
            description: '',
            tags: [],
        },
        addSectionModal: {
            displayed: false,
            name: '',
            description: '',
            tags: '',
            links: []
        },
        addSectionLinksModal: {
            displayed: false,
            url: '',
            name: '',
            description: '',
            tags: [],
            links: [],
            selectedList: {},
            selectedSection: {}
        },
        addCollaboratorModal:{
            displayed: false,
            searchTerm:'',
            searchResults:[],
        }
    }

    // Actions
    state.events.NAVMODAL_TOGGLE = 'NAVMODAL_TOGGLE';
    state.events.NAVMODAL_CLOSE = 'NAVMODAL_CLOSE';

    state.events.ADDFEATUREBTNPOPUP_TOGGLE = 'ADDFEATUREBTNPOPUP_TOGGLE';
    state.events.ADDLISTMODAL_TOGGLE = 'ADDLISTMODAL_TOGGLE';
    state.events.ADDLISTMODAL_LINKSELECT_TOGGLE = 'ADDLISTMODAL_LINKSELECT_TOGGLE';
    state.events.ADDLISTMODAL_SUBMIT = 'ADDLISTMODAL_SUBMIT';

    state.events.ADDLINKMODAL_TOGGLE = 'ADDLINKMODAL_TOGGLE';
    state.events.ADDLINKMODAL_LISTSELECT_TOGGLE = 'ADDLINKMODAL_LISTSELECT_TOGGLE';
    state.events.ADDLINKMODAL_SECTIONSELECT_TOGGLE = 'ADDLINKMODAL_SECTIONSELECT_TOGGLE';
    state.events.ADDLINKMODAL_SUBMIT = 'ADDLINKMODAL_SUBMIT';

    state.events.EDITPROFILEMODAL_TOGGLE = 'EDITPROFILEMODAL_TOGGLE';
    state.events.EDITPROFILEMODAL_SUBMIT = 'EDITPROFILEMODAL_SUBMIT';
    state.events.modal_handle_keyup = "modal_handle_keyup"

    state.events.EDITFEATUREMODAL_TOGGLE = 'EDITFEATUREMODAL_TOGGLE';
    state.events.EDITFEATUREMODAL_SET_VALUES = 'EDITFEATUREMODAL_SET_VALUES';
    state.events.EDITFEATUREMODAL_SUBMIT = 'EDITFEATUREMODAL_SUBMIT';

    state.events.ADDSECTIONMODAL_TOGGLE = 'ADDSECTIONMODAL_TOGGLE';
    state.events.ADDSECTIONMODAL_LINKSELECT_TOGGLE = 'ADDSECTIONMODAL_LINKSELECT_TOGGLE';
    state.events.ADDSECTIONMODAL_SUBMIT = 'ADDSECTIONMODAL_SUBMIT';

    state.events.ADDSECTIONLINKSMODAL_TOGGLE = 'ADDSECTIONLINKSMODAL_TOGGLE';
    state.events.ADDSECTIONLINKSMODAL_SECTIONSELECT_TOGGLE = 'ADDSECTIONLINKSMODAL_SECTIONSELECT_TOGGLE';
    state.events.ADDSECTIONLINKSMODAL_SUBMIT = 'ADDSECTIONLINKSMODAL_SUBMIT';


    state.events.ADDCOLLABORATORMODAL_TOGGLE = 'ADDCOLLABORATORMODAL_TOGGLE';

    // Events
    emitter.on('NAVMODAL_TOGGLE', toggleDisplayed('nav'))
    emitter.on('NAVMODAL_CLOSE', closeModal('nav'))
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

    // EDIT FEATURE
    emitter.on('EDITFEATUREMODAL_SET_VALUES', setValues)
    emitter.on('EDITFEATUREMODAL_TOGGLE', toggleDisplayed('editFeatureModal'))
    emitter.on('EDITFEATUREMODAL_SUBMIT', editFeatureModal_submit)

    // ADD SECTION
    emitter.on('ADDSECTIONMODAL_TOGGLE', toggleDisplayed('addSectionModal'))
    emitter.on('ADDSECTIONMODAL_LINKSELECT_TOGGLE', toggleSectionLinkSelect)
    emitter.on('ADDSECTIONMODAL_SUBMIT', addSectionModal_submit)

    // ADD SECTION LINKS MODAL
    emitter.on('ADDSECTIONLINKSMODAL_TOGGLE', toggleDisplayed('addSectionLinksModal'))
    emitter.on('ADDSECTIONLINKSMODAL_LISTSELECT_SET', addSectionLinks_setListSelect)
    emitter.on('ADDSECTIONLINKSMODAL_LINKSELECT_TOGGLE', addSectionLinks_toggleLinkSelect)
    emitter.on('ADDSECTIONLINKSMODAL_SECTIONSELECT_TOGGLE', addSectionLinks_toggleSectionSelect)
    emitter.on('ADDSECTIONLINKSMODAL_SUBMIT', addSectionLinks_submit)

    emitter.on('ADDCOLLABORATORMODAL_TOGGLE', toggleDisplayed('addCollaboratorModal'))

    // EDIT PROFILE
    emitter.on('EDITPROFILEMODAL_TOGGLE', toggleDisplayed('editProfileModal'))
    emitter.on('EDITPROFILEMODAL_UPDATE_EMOJI', (val) => {
        const {
            _id,
            username
        } = state.user;
        state.api.users.patch(_id, {
                selectedEmoji: val
            })
            .then(result => {
                emitter.emit('USERS_SET_SELECTED', username)
            })
            .catch(err => {
                alert(err);
            });
    })
    emitter.on('EDITPROFILEMODAL_SUBMIT', () => {
        const {
            _id,
            username
        } = state.user;
        const {
            bio
        } = state.modals.editProfileModal
        state.api.users.patch(_id, {
                bio
            })
            .then(result => {
                emitter.emit('USERS_SET_SELECTED', username)
                emitter.emit('EDITPROFILEMODAL_TOGGLE')
            })
            .catch(err => {
                alert(err);
            });
    })


    emitter.on('modal_handle_keyup', modal_handle_keyup)




    // Doers
    function addSectionLinks_submit() {
        const {
            name,
            url,
            description,
            tags,
            links,
            selectedList,
            selectedSection
        } = state.modals.addSectionLinksModal;

        const tagsClean = typeof tags === 'object' ? tags.join() : tags.split(',')


        if (!links.length > 0 && !url.length > 0) {
            alert('you must select some links or add a valid url')
            return false;
        }

        if (links.length > 0 && !url.length > 0) {
            // push those links into the selected section;
            const query = {
                query: {
                    "sections._id": selectedSection._id
                }
            }
            const params = {
                "$set": {
                    "sections.$.links": [...selectedSection.links, ...links],
                }
            }

            state.api.lists.patch(selectedList._id, params, query)
                .then(result => {
                    state.main.selected.lists = result;
                    emitter.emit('ADDSECTIONLINKSMODAL_TOGGLE')
                })
        } else {
            const linkData = {
                name: name,
                url: url,
                description: description,
                tags: tagsClean,
            }
            // console.log('------ creating link and patching', linkData)
            // create the new link, then patch
            state.api.links.create(linkData)
                .then(result => {

                    let newLinks = [...links,result._id];
                    // console.log(newLinks)
                    const query = {
                        query: {
                            "sections._id": selectedSection._id
                        }
                    }
                    const params = {
                        "$set": {
                            "sections.$.links": [...selectedSection.links, ...newLinks],
                        }
                    }

                    return state.api.lists.patch(selectedList._id, params, query)
                })
                .then(result => {
                    state.main.selected.lists = result;
                    emitter.emit('ADDSECTIONLINKSMODAL_TOGGLE')
                })
        }

    }

    function addSectionLinks_setListSelect() {
        state.modals.addSectionLinksModal.selectedList = state.main.selected.lists;
    }

    function addSectionLinks_toggleSectionSelect(id) {
        if (Object.keys(state.modals.addSectionLinksModal.selectedSection).length > 0 &&
            state.modals.addSectionLinksModal.selectedSection._id == id) {
            state.modals.addSectionLinksModal.selectedSection = {}
        } else {
            state.modals.addSectionLinksModal.selectedSection = state.modals.addSectionLinksModal.selectedList.sections.find(section => section._id === id);
        }
        emitter.emit('render');
    }

    function addSectionLinks_toggleLinkSelect(id) {
        const exists = state.modals.addSectionLinksModal.links.includes(id)
        if (exists === true) {
            state.modals.addSectionLinksModal.links = state.modals.addSectionLinksModal.links.filter(item => item !== id);
        } else {
            state.modals.addSectionLinksModal.links.push(id)
        }
        emitter.emit('render');
    }

    function toggleSectionLinkSelect(id) {
        const exists = state.modals.addSectionModal.links.includes(id)
        if (exists === true) {
            state.modals.addSectionModal.links = state.modals.addSectionModal.links.filter(item => item !== id);
        } else {
            state.modals.addSectionModal.links.push(id)
        }
        emitter.emit('render');
    }

    function addSectionModal_submit() {
        const {
            name,
            description,
            tags,
            links
        } = state.modals.addSectionModal;

        const tagsClean = typeof tags === 'object' ? tags.join() : tags.split(',')
        const data = {
            name: name,
            description: description,
            tags: tagsClean,
            links: links
        }

        const params = {
            "$push": {
                "sections": data,
            }
        }

        state.api.lists.patch(state.params._id, params, {})
            .then(result => {
                // emitter.emit('pushState', `/lists/${state.main.selected.lists._id}`);
                state.main.selected.lists = result;
                emitter.emit('ADDSECTIONMODAL_TOGGLE')
            })
            .catch(err => {
                alert(err);
            })

    }

    function editFeatureModal_submit() {
        const {
            prop,
            url,
            name,
            description,
            tags,
            _id,
            featureid,
        } = state.modals.editFeatureModal

        let payload = {
            url: url,
            name: name,
            description: description,
            tags: tags.split(','),
        }
        if (prop !== 'links') {
            delete payload.url;
        }

        if (prop === 'links') {
            // console.log(featureid, payload)
            state.api.links.patch(featureid, payload, {})
                .then(result => {
                    emitter.emit('pushState', `/lists/${state.main.selected.lists._id}`);
                    emitter.emit('EDITFEATUREMODAL_TOGGLE')
                })
                .catch(err => {
                    alert(err);
                })
        }

        if (prop === 'sections') {
            const query = {
                query: {
                    "sections._id": featureid
                }
            }
            const params = {
                "$set": {
                    "sections.$.name": name,
                    "sections.$.description": description,
                    "sections.$.tags": tags.split(',')
                }
            }

            state.api.lists.patch(state.params._id, params, query)
                .then(result => {
                    // emitter.emit('pushState', `/lists/${state.main.selected.lists._id}`);
                    state.main.selected.lists = result;
                    emitter.emit('EDITFEATUREMODAL_TOGGLE')
                })
                .catch(err => {
                    alert(err);
                })
        }
    }

    function setValues(payload) {
        const {
            name,
            url,
            description,
            prop,
            tags,
            _id,
            featureid
        } = payload;
        state.modals.editFeatureModal.prop = prop;
        state.modals.editFeatureModal._id = _id;
        state.modals.editFeatureModal.featureid = featureid;
        switch (prop) {
            case 'sections':
                state.modals.editFeatureModal.name = name;
                state.modals.editFeatureModal.description = description;
                state.modals.editFeatureModal.tags = tags.join();
                break;
            case 'links':
                state.modals.editFeatureModal.name = name;
                state.modals.editFeatureModal.url = url;
                state.modals.editFeatureModal.description = description;
                state.modals.editFeatureModal.tags = tags.join();
                break;
            default:
                break;
        }
    }


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
            clearAddSectionModal();
            clearAddSectionLinksModal();
            emitter.emit('render')
        }
    }

    function closeModal(modalName){
        return e => {
            state.modals[modalName].displayed = false
            clearAddListModal()
            clearAddLinkModal();
            clearAddSectionModal();
            clearAddSectionLinksModal();
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
        // console.log(state.modals.addListModal.links)
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
                // emitter.emit('LISTS_FIND')
                emitter.emit('pushState', `/lists/${result._id}`)
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
                    // emitter.emit('LISTS_FIND')
                    emitter.emit('pushState', `/lists/${result._id}`)
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


    function clearAddLinkModal() {
        state.modals.addLinkModal.url = '';
        state.modals.addLinkModal.name = '';
        state.modals.addLinkModal.description = '';
        state.modals.addLinkModal.tags = [];
        state.modals.addLinkModal.selectedList = {};
        state.modals.addLinkModal.selectedSection = {};
    }

    function clearAddListModal() {
        state.modals.addListModal.name = '';
        state.modals.addListModal.description = '';
        state.modals.addListModal.tags = [];
        state.modals.addListModal.links = [];
    }

    function clearAddSectionModal() {
        state.modals.addSectionModal.name = '';
        state.modals.addSectionModal.description = '';
        state.modals.addSectionModal.tags = [];
        state.modals.addSectionModal.links = [];
    }
    function clearAddSectionLinksModal() {
        state.modals.addSectionLinksModal.name = '';
        state.modals.addSectionLinksModal.url = '';
        state.modals.addSectionLinksModal.description = '';
        state.modals.addSectionLinksModal.tags = [];
        state.modals.addSectionLinksModal.links = [];
        state.modals.addSectionLinksModal.selectedSection = {};
    }


}