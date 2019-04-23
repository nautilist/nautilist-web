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

textarea{
    height:120px;
}

.mw0{
    min-width:0;
}

html{
  width:100%;
  height:100%;
  margin:0 auto;
}

.f8{
    font-size:8px;
}

`


module.exports = {
    body:`w-100 h-100 code lh-copy flex flex-column`,
    navbarTop:`w-100 h-auto flex flex-column flex-row-ns min-height-60px bg-near-white`,
    main:`w-100 flex flex-column flex-grow-1`,
    footer:`w-100 flex flex-column flex-row-ns min-height-180px bg-near-white bg-navy pink`,
    aTag:`link black pointer`,
    modalContainer:`w-100 h-100 fixed top-0 left-0 bg-light-green max-z flex flex-column`,
    sectionmw7:`w-100 h-auto mw7`,
    fieldset:`w-100 dropshadow ba bw1 b--black mt3 mb3 pa2 bg-white`,
    modalInput:`w-100 bg-near-white f6 bn pa2`,
    legend:`pl3 pr3`,
    submitButton: `pa2 ba bw1 b--black h3 bg-navy pink dropshadow grow w4`
}
