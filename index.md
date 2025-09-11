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

- > <a href="/JobPrep/assets/documents/bpaxtonResume3.pdf" download target="_blank">Resume</a>
- > <a href="/JobPrep/assets/documents/CoverLetter.rtf" download>CoverLetter</a>
- > [Tod Wyrick Letter Of Recommendation](/GitHubPages/LetterOfRecommendation)

---

- [GitHub Repositories](https://github.com/14paxton?tab=repositories)
- [GISTs](https://gist.github.com/14paxton)
- [LinkedIn](https://www.linkedin.com/in/paxtonbrandon/)

[//]: # (site map for mobile)
<div id="insertion"></div>
<script>
    const pathToHTML = '/assets/HTMLSnippets/Nav.html';
    async function fetchHTMLFile(path) {
        return await fetch(path);
    }
    async function loadHTML() {
        if (/(iphone|android|blackberry|webos)/i.test(navigator.userAgent)) {
        console.log(navigator.userAgent);
            const promise = await fetchHTMLFile(pathToHTML);
            const el = document.querySelector('#insertion');
            const h1 = document.createElement('h1' );
            h1.innerText = 'site map';
            el.innerHTML = await promise.text();
            el.prepend(h1);
        }
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

---