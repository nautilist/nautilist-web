const html = require('choo/html');

module.exports = {
    removeIds
}


function removeIds(obj){
  let output = Object.assign({}, obj);
  for(let prop in output) {
    if (prop === '_id')
      delete output[prop];
    else if (typeof output[prop] === 'object')
      removeIds(output[prop]);
  }
  return output
}
