var html = require('choo/html');
const handleEdit = require('./handleEdit');

module.exports = function (prop, featureid, state, emit){
    return html`
      <button onclick=${handleEdit(prop,featureid, state, emit)} class="f7 bn bg-light-green navy mr2">edit</button>
    `
  }