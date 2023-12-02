import {default as HTTPImages} from "/assets/js/Objects/HTTPImages.js";
import {createAndAppendStyle} from "/assets/js/modules/addURIToStyleElement.js";
import {addCSSImageContainers} from "/assets/js/modules/createCSSImageContainers.js";

export default async function () {
    console.log("create images HTTPImages");
    createAndAppendStyle(HTTPImages).then(async () => {
        console.log("images added httpImages");
        await addCSSImageContainers(HTTPImages, "httpImages.js");
    });
}