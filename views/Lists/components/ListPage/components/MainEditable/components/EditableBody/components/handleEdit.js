module.exports = function(prop, featureid, state, emit){
    return e => {
        if(prop === 'sections'){
            const query = {
                query: {
                  "sections._id": featureid
                }
              }
              
              state.api.lists.find(query)
                .then(result => {
                    const selectedList = result.data[0];
                    const selectedSection = selectedList.sections.find(item => item._id === featureid);
                    const { name, tags, description} = selectedSection
                    emit('EDITFEATUREMODAL_SET_VALUES', {_id: selectedList._id, featureid, name, description, tags, prop});
                    emit('EDITFEATUREMODAL_TOGGLE')
                    return
                }).catch(err => {
                    alert(err);
                    return
                })
        }
        
        state.api[prop].get(featureid)
            .then(result => {
                const {name, url, description, tags, _id} = result;
                emit('EDITFEATUREMODAL_SET_VALUES', {_id, featureid, name, url, description, tags, prop});
                emit('EDITFEATUREMODAL_TOGGLE')
                return
            })
            .catch(err => {
                alert(err);
                return
            })
        
    }

}
