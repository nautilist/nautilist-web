var html = require('choo/html')
const styles = require('../../../../../../styles')
const moment = require('moment');
module.exports = view;


const mainContainer_styles = `${styles.sectionmw7} mt3 mb5`

function view(list){
    return html`
    <section class="${mainContainer_styles}">
        ${PublicHeader(list)}
        ${PublicBody(list)}
    </section>
    `
}

function showCollaborators(collaboratorDetails){
    if(!collaboratorDetails.length > 0){
        return ''
    }

    const els = collaboratorDetails.map(collaborator => {
        return html`
            <a class="${styles.aTag} mr2" href="/users/${collaborator.username}">· ${collaborator.username}</a>
        `
    })
    
    return html`
    <p class="ma0 pa0 f7">together with ${els}</p>
    `

    
}


function PublicHeader(list){
    const {name, description, ownerDetails, collaboratorDetails} = list;
    const{followersDetails} = list;
    
    if(!followersDetails){
        return ''
    }

    const numFollowers = followersDetails.length

    return html`
        <header class="w-100 pa3 ba bw1 b--black dropshadow">
            <p class="ma0 pa0 f7">${numFollowers} followers</p>
            <h1 class="ma0 pa0 f3-ns f4">${name}</h1>
            <p class="ma0 pa0 f7">by ${ownerDetails.username}</p>
            ${showCollaborators(collaboratorDetails)}
            <p class="ma0 pa0 f5-ns f6">${description}</p>
        </header>
    `
}

function PublicBody(list){
    const{sections, sectionsDetails} = list;
    if(!sections){
        return ''
    }
    return html`
        <section class="w-100 pa0">
            <ul class="w-100 pa0 list">
            ${SectionCards(sections, sectionsDetails)}
            </ul>
        </section>
    `
}


function SectionCards(sections, sectionsDetails){
    return sections.map(section => SectionCard(section, sectionsDetails))
}

function SectionCard(section, sectionsDetails){
    const {name, description, links} = section;
    const linksEl = LinkCards(links, sectionsDetails)

    return html`
    <li class="w-100">
    <fieldset  class="mt3 mb3 bg-white b--light-green ba bw1 dropshadow pa3-ns pa2">
     <legend class="${styles.legend} ma0 pa0 f5 f4-ns">${name}</legend>
     <p class="ma0 pa0 f7 f6-ns">${description}</p>
     <ul class="list pl3-ns pr3-ns pa0">
        ${linksEl}
     </ul>
     </fieldset>
    </li>
    `
}

function LinkCard(link, sectionsDetails){
    // link in this case is the id of the link
    const feature = sectionsDetails.find(item => item._id === link);
    const {name, description, url, updatedAt} = feature;
    return html`
        <li class="w-100 ba bw1 mt2 mb2 pa3-ns pa2 bg-washed-red dropshadow flex flex-column flex-row-ns justify-between-ns pointer">
            <div class="w-75-ns w-100">
            <small class="f8 ma0 pa0">${url}</small>
            <h2 class="pa0 ma0 f6 f4-ns">${name}</h2>
            <p class="pa0 mt2 f7 f6-ns">${description}</p>
            </div>
            <div class="w-25-ns w-100 tr">
            <small class="f8 ma0 pa0">${formatTime(updatedAt)}</small>
            </div>
        </li>
    `
}

function LinkCards(links, sectionsDetails){
    return links.map(link => LinkCard(link, sectionsDetails));
}



function formatTime(ts){
    return moment(ts).format('MMMM Do YYYY, h:mm a')
}