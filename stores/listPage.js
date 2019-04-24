module.exports = store

function store(state, emitter) {

    state.listPage = {
        editable: false,
        canEdit: false,
    }

    state.events.LISTPAGE_TOGGLE_EDITABLE = "LISTPAGE_TOGGLE_EDITABLE"
    state.events.LISTPAGE_REMIX = "LISTPAGE_REMIX"
    state.events.LISTPAGE_DISPLAY_FOLLOWERS = "LISTPAGE_DISPLAY_FOLLOWERS"
    state.events.LISTPAGE_FOLLOW = "LISTPAGE_FOLLOW"
    state.events.LISTPAGE_ADD_COLLABORATOR = "LISTPAGE_ADD_COLLABORATOR"
    state.events.LISTPAGE_ADD_LINK = "LISTPAGE_ADD_LINK"
    state.events.LISTPAGE_ADD_SECTION = "LISTPAGE_ADD_SECTION"
    state.events.LISTPAGE_DELETE_LIST = "LISTPAGE_DELETE_LIST"

    state.events.LISTPAGE_CHECK_EDITABLE = "LISTPAGE_CHECK_EDITABLE"

    emitter.on('LISTPAGE_TOGGLE_EDITABLE', toggleEditable)
    emitter.on('LISTPAGE_CHECK_EDITABLE', checkEditable)
    emitter.on('LISTPAGE_FOLLOW', triggerFollow)


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

    function toggleEditable(){
        if(state.listPage.canEdit === true){
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