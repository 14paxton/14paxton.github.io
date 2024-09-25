import {default as HTTPImages} from "/assets/js/Objects/HTTPImages.js";
import {addCSSImageContainers} from "/assets/js/modules/createCSSImageContainers.js";

export default async function () {
    console.log("create images HTTPImages");
    console.log("images added httpImages");
    await addCSSImageContainers(HTTPImages, "httpImages.js");
}