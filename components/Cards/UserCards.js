const html = require('choo/html');
const UserCard = require('./UserCard');

module.exports = function(users, state, emit){
    
    return users.map(user => {
        return UserCard(user, state, emit);
    })
}
