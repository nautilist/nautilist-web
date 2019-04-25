
var html = require('choo/html');
const LinkCard = require('./LinkCard');

module.exports = function (links, sectionsDetails, section, state, emit){
    return links.map(link => LinkCard(link, sectionsDetails, section, state, emit));
}
