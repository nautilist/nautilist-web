module.exports = store

function store (state, emitter) {
    class API {
        constructor(_db){
            this.db = _db
            console.log("initialized api:", _db)
            this.find = this.find.bind(this);
            this.get = this.get.bind(this);
            this.create = this.create.bind(this);
        }

        find(query){
            const myQuery = query ? query : {};
            state.api[this.db].find(myQuery)
                .then(result => {
                    state.main[this.db] = result;
                    emitter.emit('render')
                    return result;
                }).catch(err => {
                    alert(err);
                })
        }

        get(query){
            const myQuery = query ? query : {};
            console.log(myQuery)
            state.api[this.db].get(myQuery)
                .then(result => {
                    state.main.selected[this.db] = result;
                    return result;
                }).catch(err => {
                    alert(err);
                })
        }

        create(payload){
            state.api[this.db].create(payload)
                .then(result => {
                    // state.main[this.db].push(result);
                    // 
                    return result;
                }).catch(err => {
                    alert(err);
                })
        }
    }

    const listsApi = new API('lists');
    const linksApi = new API('links');
    const usersApi = new API('users');
    // remove irrelevant create route for users in this case
    delete usersApi.create

state.main = {
      links: {
        data:[]
      },
      lists: {
        data:[]
      },
      users: {
          data:[]
      },
      selected:{
          links:{},
          lists:{},
          user:{
              profile:{},
              links: {},
              lists: {},
              listsFollowing: {},
              following: {},
              followers: {}
          },
      }
  }

  state.events.LINKS_FIND = "LINKS_FIND";
  state.events.LINKS_GET = "LINKS_GET";
  state.events.LINKS_REMOVE = "LINKS_REMOVE";
  state.events.LINKS_PATCH = "LINKS_PATCH";

  state.events.LISTS_FIND = "LISTS_FIND";
  state.events.LISTS_GET = "LISTS_GET";
  state.events.LISTS_REMOVE = "LISTS_REMOVE";
  state.events.LISTS_PATCH = "LISTS_PATCH";

  state.events.USERS_FIND = "USERS_FIND";
  state.events.USERS_GET = "USERS_GET";
  state.events.USERS_REMOVE = "USERS_REMOVE";
  state.events.USERS_PATCH = "USERS_PATCH";

  // BROWSE
  state.events.BROWSE_FIND = "BROWSE_FIND";
  

//   state.api.socket.on('get', message => console.log('getting this: ',message))
//   state.api.socket.emit('get', 'api/lists', 'HtIOvI-Ic', (error, message) => {
//       if(error) console.log('Found message', message);
//     console.log('Found message', message);
//   });

//   state.api.lists.on(
//       'created', 
//        result => {console.log('New list created', message)}
//   );

  

  emitter.on('DOMContentLoaded', function () {
    emitter.on('LISTS_FIND', listsApi.find)
    emitter.on('LISTS_GET', listsApi.get)


    emitter.on('LINKS_FIND', linksApi.find)
    emitter.on('LINKS_GET', linksApi.get)

    emitter.on('USERS_FIND', usersApi.find)
    emitter.on('USERS_GET', usersApi.get)

    emitter.on('BROWSE_FIND', () => {
        const query = {query:{$sort:{'createdAt':-1}, $limit:16}}
        emitter.emit('LISTS_FIND', query)
        emitter.emit('LINKS_FIND', query)
        emitter.emit('USERS_FIND', query)
    })
  })

  
}
