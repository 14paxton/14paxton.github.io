---
title: MyPersonalDocsAndStuff
name: index.md
permalink: index
layout: default
nav_order: 1
has_children: true
share: true
shortRepo: ghpages
---

# My Personal Documents and Other Stuff

- [GitHub Repositories](https://github.com/14paxton?tab=repositories)
- [GISTs](https://gist.github.com/14paxton)
- [LinkedIn](https://www.linkedin.com/in/paxtonbrandon/)
- [Resume, CoverLetter, Letter of Recommendation](https://github.com/14paxton/JobPrep/tree/master/ResumeAndRecommendation)

---

# Site Map

[//]: # (<embed src="https://raw.githubusercontent.com/14paxton/14paxton.github.io/master/HTMLSnippets/Nav.html" style="width:400px; height: 400px;">)

[//]: # (<iframe src="https://raw.githubusercontent.com/14paxton/14paxton.github.io/master/HTMLSnippets/Nav.html" style="width:400px; height: 400px;"></iframe>)

[//]: # ()

[//]: # (# local)

[//]: # ()

[//]: # (<embed src="./HTMLSnippets/Nav.html" style="width:400px; height: 400px;">)

[//]: # (<iframe src="./HTMLSnippets/Nav.html" style="width:400px; height: 400px;"></iframe>)


<div id="insertion"></div>
<script>
const pathToHTML = "https://raw.githubusercontent.com/14paxton/14paxton.github.io/master/HTMLSnippets/Nav.html";
async function fetchHTMLFile(path) {
return await fetch(path)
}
window.addEventListener("load", async function () {
    const promise = await fetchHTMLFile(pathToHTML);
    document.querySelector('#insertion').innerHTML = await promise.text();
}, false)
</script>