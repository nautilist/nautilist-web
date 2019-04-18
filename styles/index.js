var css = require('sheetify');

css`
.min-height-60px{
    min-height:60px;
}
.min-height-180px{
    min-height:180px;
}
.flex-grow-1{
    flex: 1 0 auto;
}

.dropshadow{
  box-shadow:2px 2px black;
}

.margin-top-auto{
    margin-top:auto
}

*{
    box-sizing:border-box;
}

html{
  width:100%;
  height:100%;
  margin:0 auto;
}

`


module.exports = {
    body:`w-100 h-100 code lh-copy flex flex-column`,
    navbarTop:`w-100 h-auto flex flex-column flex-row-ns min-height-60px bg-near-white`,
    main:`w-100 flex flex-column flex-grow-1`,
    footer:`w-100 flex flex-column flex-row-ns min-height-180px bg-near-white`,
    aTag:`link black pointer`,
    modalContainer:`w-100 h-100 fixed top-0 left-0 bg-light-green max-z`
}