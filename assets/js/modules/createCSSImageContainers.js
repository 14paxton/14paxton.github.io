import {javaOOPImages} from '/assets/js/Objects/JavaOOPImages.js'

async function createCSSImageContainers(id) {
    return new Promise((resolve, reject) => {
        console.log("create div")
        const div = document.createElement('div')
        div.id = id;
        div.style.width = "1035px";
        div.style.height = "1322px"
        resolve(document.querySelector("#imageContainer").appendChild(div))
    })
}

async function addCSSImageContainers() {
    const divPromises = []
    Object.keys(javaOOPImages).forEach((key) => {
        divPromises.push(createCSSImageContainers(key));
    })

    await Promise.all(divPromises)
}

export {addCSSImageContainers}