import {javaOOPImages} from '/assets/js/Objects/JavaOOPImages.js'
import {createAndAppendStyle} from "/assets/js/modules/addURIToStyleElement.js"
import {addCSSImageContainers} from "/assets/js/modules/createCSSImageContainers.js"

export default async function () {
    console.log("create images javaOOPIMAGES")
    createAndAppendStyle(javaOOPImages,).then(async () => {
        console.log("images added javaOOPImages")
        await addCSSImageContainers(javaOOPImages);
    })
}