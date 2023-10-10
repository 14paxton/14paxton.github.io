async function createCSSImageContainers(id, callingFile) {
    return new Promise((resolve, reject) => {
        const imgDiv = document.querySelector(`[data-img-loader="${callingFile}"]`)
        const {keyAsHeader, zoomOnHover, ...rest} = imgDiv.dataset
        console.log("create div")
        const div = document.createElement('div')
        div.id = id;
        div.style.width = "auto";
        div.style.height = "100vh"
        div.style.display = "block"
        // div.onmouseover. = zoomOnHover ?(e)=> console.log(e) : ''

        if (keyAsHeader) {
            const headerOne = document.createElement('h1')
            headerOne.innerText = id.replace(/([A-Z])/g, ' $1');
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