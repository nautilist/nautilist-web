var html = require('choo/html')
const LinksPage = require('./components/LinksPage');
const LinkPage = require('./components/LinkPage');

var TITLE = 'nautilists - links'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE);

  switch(state.route){
    case 'links':
        return LinksPage(state, emit);
        break;
    case 'links/:_id':
        return LinkPage(state, emit);
        break;
    default:
        return html`<body>nothing found</body>`
  }
}


