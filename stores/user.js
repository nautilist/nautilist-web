module.exports = store

function store (state, emitter) {
  
    state.user = {
        authenticated: null,
        _id: null,
        username: null,
        bio: null,
        selectedEmoji: null, 
        isOwnerOrCollaborator:null, // checks whether the auth'd user is the current owner or collaborator of the list
    }

    // Actions
    state.events.USER_SIGNUP = 'USER_SIGNUP';
    state.events.USER_LOGIN = 'USER_LOGIN';
    state.events.USER_LOGOUT = 'USER_LOGOUT';
    state.events.USER_RESETPASSWORD = 'USER_RESETPASSWORD';
    state.events.USER_SENDRESETPASSWORD = 'USER_SENDRESETPASSWORD';
    state.events.USER_SENDVERIFICATIONTOKEN = 'USER_SENDVERIFICATIONTOKEN';
    
    // Events
    emitter.on(state.events.USER_SIGNUP, () => {console.log(this)})
    emitter.on(state.events.USER_LOGIN, () => {console.log(this)})
    emitter.on(state.events.USER_LOGOUT, () => {console.log(this)})
    emitter.on(state.events.USER_RESETPASSWORD, () => {console.log(this)})
    emitter.on(state.events.USER_SENDRESETPASSWORD, () => {console.log(this)})
    emitter.on(state.events.USER_SENDVERIFICATIONTOKEN, () => {console.log(this)})

    // Doers
    

    

}
