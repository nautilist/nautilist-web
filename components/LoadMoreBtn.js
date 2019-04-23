const html = require('choo/html');

module.exports = LoadMoreBtn;

function LoadMoreBtn(eventName, state, emit){
    
    function triggerLoad(e){
        emit(eventName);
        // console.log(eventName)
    }

    return html`
    <div class="w-100 flex flex-row justify-center pa4 mt4">
    <button class="w-100 mw5 pa2 h3 bn bg-yellow navy dropshadow" onclick=${triggerLoad}>Load More</button>
    </div>
    `
}