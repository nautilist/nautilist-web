
var html = require('choo/html');
const moment = require('moment');
const removeBtn = require('./RemoveBtn');
const editBtn = require('./EditBtn');

function formatTime(ts){
    return moment(ts).format('MMMM Do YYYY, h:mm a')
}


module.exports = function (link, sectionsDetails, section, state, emit){
    // link in this case is the id of the link
    const feature = sectionsDetails.find(item => item._id === link);
    const {name, description, url, updatedAt} = feature;
    return html`
        <li data-id="${feature._id}" class="w-100 ba bw1 mt2 mb2 pa3-ns pa2 bg-washed-red dropshadow flex flex-column">
            <div class="w-100 flex flex-row justify-between">
                ${editBtn('links', feature.id, state, emit)}
                ${removeBtn('links', section._id, feature._id, state, emit)}
            </div>
            <div class="flex flex-row-ns justify-between-ns pointer flex-column">
            <div class="w-75-ns w-100">
            <small class="f8 ma0 pa0">${url}</small>
            <h2 class="pa0 ma0 f4 f5-ns">${name}</h2>
            <p class="pa0 mt2 f7 f6-ns">${description}</p>
            </div>
            <div class="w-25-ns w-100 tr">
            <small class="f8 ma0 pa0">${formatTime(updatedAt)}</small>
            </div>
            </div>
        </li>
    `
}