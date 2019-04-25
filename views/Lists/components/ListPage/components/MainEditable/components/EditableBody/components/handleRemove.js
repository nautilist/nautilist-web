module.exports = function (prop, parentid, featureid, state, emit){
    return e=>{
        let c = confirm(`are you sure you want to remove ${featureid} at ${parentid} of ${prop}?`)
        if(c === true){
          let query, params;
  
          if(prop === 'links'){
            query={
              "query":{
                "sections._id": parentid
              }
            }
            params={
              "$pull":{
                "sections.$.links": featureid
              }
            }
          } else if(prop === 'sections'){
            query = null,
            
            params = {
              $pull:{
                "sections": {_id: featureid }
              }
            }
  
          }
  
          state.api.lists.patch(state.params._id, params, query)
            .then(result => {
              state.main.selected.lists = result;
              emit('render');
            })
            .catch(err => {
              alert(err);
            })
          
        } else {
          return;
        }
      }
}