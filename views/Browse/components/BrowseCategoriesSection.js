const html = require('choo/html');

module.exports = BrowseCategoriesSection

function BrowseCategoriesSection(state, emit){
  
    return html`
    <section class="w-100 pa4 flex flex-column items-center">
      <h2 class="w-100 tc f2 lh-title">Browse Categories</h2>
      <div class="w-100 flex flex-row-ns flex-column items-start justify-start tc">
        
        <!-- links -->
        <div class="w-third-ns w-100 flex flex-column justify-start">
          <a class="link black w-100" href="/links">
            <img style="max-width:60%" class="h4-ns h3" src="/assets/1F517.png">  
            </a>
          <h3 class="f2 lh-title">links</h3>
          <p class="pa2">Links are the heart of nautilist projects. Add 'em in and organize them into lists.</p>
        </div>  
  
        <!-- lists -->
        <div class="w-third-ns w-100 flex flex-column justify-start">
          <a class="link black w-100" href="/lists">
            <img style="max-width:60%" class="h4-ns h3" src="/assets/1F490.png">  
          </a>
          <h3 class="f2 lh-title">lists</h3>
          <p class="pa2">Lists are the home for your wonderful links. These have been created, curated, and saved to Nautilist for you to reuse and remix.</p>
        </div>
  
        <!-- collections -->
        <div class="w-25-ns w-100 dn">
          <a class="link black w-100" href="/collections">
          <img style="max-width:60%" class="h4-ns h3" src="/assets/1F490.png"> 
          </a>
          <h3 class="f2 lh-title">Collections</h3>
          <p class="pa2">Collections are groups of projects. Collections may contain similar themed projects such as for a class or larger project.</p>
        </div>
  
        <!-- users -->
        <div class="w-third-ns w-100 flex flex-column justify-start">
          <a class="link black w-100" href="/users">
          <img style="max-width:60%" class="h4-ns h3" src="/assets/1F984.png">
          <h3 class="f2 lh-title">users</h3>
          </a>
          <p class="pa2">Oh and what would we be without our wonderful users? Go checkout their projects and collections for inspiration or to collaborate!</p>
        </div>
      </div>
  
      <p class="i dn"> Organizing lists into tracks and collections coming soon! </p>
    </section>
    `
  }