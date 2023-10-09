async function createCSSImageContainers(id) {
    return new Promise((resolve, reject) => {
        console.log("create div")
        const div = document.createElement('div')
        div.id = id;
        div.style.width = "auto";
        div.style.height = "100vh"
        div.style.display = "block"
        resolve(document.querySelector("#imageContainer").appendChild(div))
    })
}

async function addCSSImageContainers(jsonImageObject) {
    const divPromises = []
    Object.keys(jsonImageObject).forEach((key) => {
        divPromises.push(createCSSImageContainers(key));
    })

    await Promise.all(divPromises)
}

export {addCSSImageContainers}