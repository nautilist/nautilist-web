const helpers = require('../helpers');
module.exports = store

function store(state, emitter) {

    state.listPage = {
        editable: false,
        canEdit: false,
        sortable: null,
        sortables: [],
        name:null,
        description:null,
    }

    state.events.LISTPAGE_TOGGLE_EDITABLE = "LISTPAGE_TOGGLE_EDITABLE"
    state.events.LISTPAGE_REMIX = "LISTPAGE_REMIX"
    state.events.LISTPAGE_DISPLAY_FOLLOWERS = "LISTPAGE_DISPLAY_FOLLOWERS"
    state.events.LISTPAGE_FOLLOW = "LISTPAGE_FOLLOW"
    state.events.LISTPAGE_FOLLOW = "LISTPAGE_UNFOLLOW"
    state.events.LISTPAGE_ADD_COLLABORATOR = "LISTPAGE_ADD_COLLABORATOR"
    state.events.LISTPAGE_ADD_LINK = "LISTPAGE_ADD_LINK"
    state.events.LISTPAGE_ADD_SECTION = "LISTPAGE_ADD_SECTION"
    state.events.LISTPAGE_REMOVE_LINK = "LISTPAGE_REMOVE_LINK"
    state.events.LISTPAGE_REMOVE_SECTION = "LISTPAGE_REMOVE_SECTION"
    state.events.LISTPAGE_REMOVE_LIST = "LISTPAGE_REMOVE_LIST"

    state.events.LISTPAGE_CHECK_EDITABLE = "LISTPAGE_CHECK_EDITABLE"

    state.events.listPage_handle_keyup = "listPage_handle_keyup"

    listPage_handle_keyup

    emitter.on('LISTPAGE_TOGGLE_EDITABLE', toggleEditable)
    emitter.on('LISTPAGE_CHECK_EDITABLE', checkEditable)
    emitter.on('LISTPAGE_FOLLOW', triggerFollow)
    emitter.on('LISTPAGE_UNFOLLOW', triggerUnFollow)
    emitter.on('LISTPAGE_REMIX', triggerRemix)
    emitter.on('LISTPAGE_REMOVE_LIST', removeList)

    emitter.on('listPage_handle_keyup', listPage_handle_keyup)

    function listPage_handle_keyup(payload) {
        const {
            prop,
            val
        } = payload;
        state.listPage[prop] = val;
    }

    // IF NAVIGATED TO LIST PAGE, TRIGGER GET
    emitter.on('navigate', ()=>{
        if(state.route === 'lists/:_id'){
            emitter.emit('LISTS_GET', state.params._id)
        }
    })

    function removeList(){
        const {user} = state;
        if(!user.authenticated){
            alert('You must be logged in to follow a list');
            return false;
        }
        const {_id} = state.params

        let c = confirm('Are you sure you want to delete this forever?')
        if(c === true ){
            emitter.emit('LISTS_REMOVE', _id);    
        }

        return false;
    }


    function triggerRemix(){
        const {user} = state;
        const {_id} = state.params
        const {lists} = state.main.selected;
        if(!user.authenticated){
            alert('You must be logged in to follow a list');
            return false;
        }

        let sanitizedResult = helpers.removeIds(lists);
        sanitizedResult.followers = [];

        emitter.emit('LISTS_CREATE', sanitizedResult)

    }

    function triggerFollow(){
        const {user} = state;
        const {_id} = state.params
        if(!user.authenticated){
            alert('You must be logged in to follow a list');
            return false;
        }
        const data = {
            $push:{
                followers: user._id
            }
        }

        emitter.emit('LISTS_PATCH', _id, data, {})
        emitter.emit('render'); 
    }

    function triggerUnFollow(){
        const {user} = state;
        const {_id} = state.params
        if(!user.authenticated){
            alert('You must be logged in to unfollow a list');
            return false;
        }
        const data = {
            $pull:{
                followers: user._id
            }
        }

        emitter.emit('LISTS_PATCH', _id, data, {})
        emitter.emit('render'); 

    }

    function toggleEditable(){
        const {user} = state;
        const {_id} = state.params
        if(state.listPage.canEdit === true){
            if(state.listPage.editable === true){
                const data = {
                    name: state.listPage.name,
                    description: state.listPage.description
                }
                emitter.emit('LISTS_PATCH', _id, data, {})
                emitter.emit('pushState', `/lists/${_id}`)
            }

            state.listPage.editable = !state.listPage.editable;
            emitter.emit('render')
        } else {
            alert('Sorry! You are not an owner or collaborator of this list.')
        }
    }

    function checkEditable(list){
        const {authenticated, username} = state.user;
        const {ownerDetails} = list;
        if(authenticated === true && username === ownerDetails.username){
            state.listPage.canEdit = true;
        } else{
            state.listPage.canEdit = false;
        }
    }


}