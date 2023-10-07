import {javaOOPImages} from '/assets/js/Objects/JavaOOPImages.js'

async function createElements(id) {
    return new Promise((resolve, reject) => {
        console.log("create div")
        const div = document.createElement('div')
        div.id = id;
        div.style.width = "1035px";
        div.style.height = "1322px"
        resolve(document.querySelector("#imageContainer").appendChild(div))
    })
}

async function addElements() {
    const divPromises = []
    Object.keys(javaOOPImages).forEach((key) => {
        divPromises.push(createElements(key));
    })

    await Promise.all(divPromises)
}

export {addElements}