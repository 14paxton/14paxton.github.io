async function addPadding(element, top, side) {
    return new Promise(() => {
        element.style.padding = `${top}% ${side}%`
    })
}

async function createCSSImageContainers(id, callingFile) {
    return new Promise((resolve, reject) => {
        const imgDiv = document.querySelector(`[data-img-loader="${callingFile}"]`)
        const {keyAsHeader, zoomOnHover, ...rest} = imgDiv.dataset
        console.log("create div")
        const div = document.createElement('div')
        div.id = id;
        div.style.width = "auto";
        // div.style.height = "100vh"
        // div.style.padding = 'padding:70% 0%;'
        div.onload = Promise.resolve(addPadding(div, keyAsHeader
                                                     ? 60
                                                     : 71, 0))
        div.onmouseover = zoomOnHover
                          ? (e) => e.target.style.transform = 'scale(2)'
                          : null
        div.onmouseout = zoomOnHover
                         ? (e) => e.target.style.transform = 'scale(1)'
                         : null

        if (keyAsHeader) {
            // div.style.margin = '-25% 0px'

            const headerOne = document.createElement('h1')
            headerOne.innerText = id.replace(/([A-Z])/g, ' $1');
            headerOne.style.padding = '0px';
            headerOne.style.margin = '0px'
            imgDiv.appendChild(headerOne)
            Promise.resolve(addHeadingToTOC(headerOne))
        }

        resolve(imgDiv.appendChild(div))
    })
}

async function addCSSImageContainers(jsonImageObject, callingFile) {
    console.log(`calling file ${callingFile}`)
    const divPromises = []
    Object.keys(jsonImageObject).forEach((key) => {
        divPromises.push(createCSSImageContainers(key, callingFile));
    })

    await Promise.all(divPromises)
}

async function addHeadingToTOC(headingToAdd) {
    return new Promise(() => {
        const replaceSpace = /\s/g
        const toc = document.getElementById("markdown-toc");

        if (toc) {
            const a = document.createElement("a");
            const li = document.createElement("li");

            a.textContent = headingToAdd.textContent
            a.href = `#${a.textContent.replaceAll(replaceSpace, '')}`
            a.id = `markdown-toc-${a.textContent.replaceAll(replaceSpace, '-').toLowerCase()}`
            li.appendChild(a)
            toc.appendChild(li);
        }
    })
}

export {addCSSImageContainers}