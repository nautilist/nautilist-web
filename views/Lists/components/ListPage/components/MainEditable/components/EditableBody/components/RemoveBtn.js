var html = require('choo/html');
const handleRemove = require('./handleRemove');

module.exports = function(prop, parentid, featureid, state, emit){
    return html`
      <button onclick=${handleRemove(prop, parentid,featureid, state, emit)} class="f7 bn bg-near-white red">remove</button>
    `
  }
