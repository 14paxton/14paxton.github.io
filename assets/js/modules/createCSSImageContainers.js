async function createCSSImageContainers(id, callingFile) {
    return new Promise((resolve, reject) => {
        const imgDiv = document.querySelector(`[data-img-loader="${callingFile}"]`)
        const {keyAsHeader, ...rest} = imgDiv.dataset
        console.log("create div")
        const div = document.createElement('div')
        div.id = id;
        div.style.width = "auto";
        div.style.height = "100vh"
        div.style.display = "block"

        if (keyAsHeader) {
            const headerOne = document.createElement('h1')
            headerOne.innerText = id.replace(/([A-Z])/g, ' $1');
            imgDiv.appendChild(headerOne)
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

export {addCSSImageContainers}