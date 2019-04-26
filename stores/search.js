module.exports = store

function store (state, emitter) {
  state.search = {
    searchTerm:'',
  }

  emitter.on('DOMContentLoaded', function () {
    emitter.on('searchTerm_update', (val) => {
        state.search.searchTerm = val;
    });

  })
}
