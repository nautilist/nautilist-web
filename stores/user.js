module.exports = store

function store(state, emitter) {

    class Auth {
        constructor() {
            console.log('initialized auth')
            this.signup = this.signup.bind(this);
            this.checkLogin = this.checkLogin.bind(this);
            this.login = this.login.bind(this);
            this.logout = this.logout.bind(this);
            this.sendVerificationToken = this.sendVerificationToken.bind(this);
            this.sendResetPassword = this.sendResetPassword.bind(this);
            this.resetPassword = this.resetPassword.bind(this);
        }
        // AUTH FUNCTIONS
        signup(_formData) {
            let credentials = {
                username: _formData.get("username"),
                email: _formData.get("email"),
                password: _formData.get("password")
            }
            state.api.users.create(credentials).then(() => {
                alert('Sign up successful - you will receive an email from hello.nautilists@gmail.com to verify your account')
                // emitter.emit(state.events.user_login, _formData)
                emitter.emit('pushState', "/verifyRedirect")
            }).catch(err => {
                alert('Something went wrong!', err)
                return error;
            });
        };

        checkLogin(_formData) {
            console.log('checking if user is authd')
            state.api.authenticate().then(authResponse => {
                // try to auth using JWT from local Storage
                state.user.username = authResponse.username;
                state.user._id = authResponse.id;
                state.user.authenticated = true;
                // emitter.emit('pushState', '/')
                emitter.emit('render');
            }).catch(err => {
                console.log("Sorry, you're not logged in!")
                state.user.authenticated = false;
                return err;
            });
        };

        // LOGIN
        login(_formData) {
            // If we get login information, add the strategy we want to use for login
            const credentials = {
                username: _formData.get("username"),
                email: _formData.get("email"),
                password: _formData.get("password")
            }
            // create the payload
            const payload = Object.assign({
                strategy: 'local'
            }, credentials);


            state.api.authenticate(payload).then(authResponse => {
                state.user.authenticated = true;
                state.user.username = authResponse.username;
                state.user._id = authResponse.id;
                // alert('logging in now!')
                // emitter.emit("pushState", "/")
                alert('log in successful!')
                window.location = "/";
                // emitter.emit("pushState", `/${state.user.username}/projects`) //${state.user.username}
            }).catch(err => {
                // Show login page (potentially with `e.message`)
                console.log('Authentication error', err);
                alert(err);
                state.user.authenticated = false;
                // emitter.emit("pushState", "/login")
            });
        };

        // LOGOUT
        logout() {
            state.api.logout();
            state.user.username = null;
            state.user.authenticated = false;
            state.user._id = null;
            // TODO: clear the state of data, etc
            emitter.emit('pushState', "/");
        };


        sendVerificationToken() {
            const token = state.query.token
            const obj = {
                action: 'verifySignupLong',
                value: token
            }
            
            state.api.authmanagement.create(obj)
                .then(result => {
                    alert('Hooray! You are verified. Go ahead and get started!')
                    return result
                }).catch(err => {
                    alert(err);
                    return err;
                })
        };

        sendResetPassword(_formData) {

            const obj = {
                action: 'sendResetPwd',
                value: {
                    email: _formData.get('email')
                }
            }
            state.api.authmanagement.create(obj)
                .then(result => {
                    // console.log('sending reset password!', result)
                    alert("Sending reset password url to your email inbox - please check your email")
                    emitter.emit('pushState', '/verifyRedirect')
                }).catch(err => {
                    return err;
                })
        };

        resetPassword(_formData) {

            const token = state.query.token
            const obj = {
                action: 'resetPwdLong',
                value: {
                    token: token,
                    password: _formData.get('password')
                }
            }
            state.api.authmanagement.create(obj)
                .then(result => {
                    alert('password changed successful!')
                    emitter.emit('pushState', '/login')
                    // window.location = "/login";
                }).catch(err => {
                    alert(err);
                    return err;
                })
        };

    }

    
    const auth = new Auth();

    state.user = {
        authenticated: false,
        _id: null,
        username: null,
        bio: null,
        selectedEmoji: null,
        isOwnerOrCollaborator: null, // checks whether the auth'd user is the current owner or collaborator of the list
    }

    // Actions
    state.events.USER_SIGNUP = 'USER_SIGNUP';
    state.events.USER_LOGIN = 'USER_LOGIN';
    state.events.USER_LOGOUT = 'USER_LOGOUT';
    state.events.USER_RESETPASSWORD = 'USER_RESETPASSWORD';
    state.events.USER_SENDRESETPASSWORD = 'USER_SENDRESETPASSWORD';
    state.events.USER_SENDVERIFICATIONTOKEN = 'USER_SENDVERIFICATIONTOKEN';

    // Events
    emitter.on("DOMContentLoaded", () => {
        // when the DOM loads
        auth.checkLogin();
        emitter.on(state.events.USER_SIGNUP, auth.signup)
        emitter.on(state.events.USER_LOGIN, auth.login)
        emitter.on(state.events.USER_LOGOUT, auth.logout)
        emitter.on(state.events.USER_RESETPASSWORD, auth.resetPassword)
        emitter.on(state.events.USER_SENDRESETPASSWORD, auth.sendResetPassword)
        emitter.on(state.events.USER_SENDVERIFICATIONTOKEN, auth.sendVerificationToken)
    })


    // Doers



}