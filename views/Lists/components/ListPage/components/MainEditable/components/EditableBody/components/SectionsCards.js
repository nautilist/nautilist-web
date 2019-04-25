var html = require('choo/html');
const SectionCard = require('./SectionCard');

module.exports = function (sections, sectionsDetails, state, emit){
    return sections.map(section => SectionCard(section, sectionsDetails, state, emit))
}