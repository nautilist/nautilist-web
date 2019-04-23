module.exports = store

function store(state, emitter) {

    state.userPage = {
        selectedTab:'lists', // 'links', 'lists', 'listsFollowing'
        editProfile: {
            displayed:false
        }
    }

    // Actions
    state.events.USERPAGE_SET_TAB = 'USERPAGE_SET_TAB';
    state.events.USERPAGE_EDIT_PROFILE = 'USERPAGE_EDIT_PROFILE';
    

    // Events
    emitter.on('USERPAGE_SET_TAB', setTab)
    emitter.on('USERPAGE_EDIT_PROFILE', toggleEditProfile)

    function setTab(tabName){
        state.userPage.selectedTab = tabName;
        emitter.emit('render')
    }

    function toggleEditProfile(){
        state.userPage.displayed = !state.userPage.displayed;
        emitter.emit('render')
    }

    

}