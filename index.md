---
title:        MyPersonalDocsAndStuff
name:         index.md
permalink:    index
layout:       default
nav_order:    1
has_children: true
share:        true
shortRepo:    ghpages
---

# My Personal Documents and Other Stuff

- [GitHub Repositories](https://github.com/14paxton?tab=repositories)
- [GISTs](https://gist.github.com/14paxton)
- [LinkedIn](https://www.linkedin.com/in/paxtonbrandon/)
- [Resume, CoverLetter, Letter of Recommendation](https://github.com/14paxton/JobPrep/tree/master/ResumeAndRecommendation)

---

# Site Map

<div id="insertion"></div>
<!--
//http path
//const pathToHTML = "https://raw.githubusercontent.com/14paxton/14paxton.github.io/master/assets/HTMLSnippets/Nav.html";
-->
<script>
const pathToHTML = "/assets/HTMLSnippets/Nav.html";
async function fetchHTMLFile(path) {
return await fetch(path)
}
async function loadHTML() {
const promise = await fetchHTMLFile(pathToHTML);
    document.querySelector('#insertion').innerHTML = await promise.text();
}
function ready(fn) {
if (document.readyState !== 'loading') {
fn();
}
else {
document.addEventListener('DOMContentLoaded', fn);
}
}
ready(loadHTML);
</script>

***