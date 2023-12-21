import {default as CSSImages}  from "/assets/js/Objects/CSSImages.js";
import {addCSSImageContainers} from "/assets/js/modules/createCSSImageContainers.js";

export default async function () {
    console.log("create images CSSImages");
    console.log("images added cssImages");
    await addCSSImageContainers(CSSImages, "cssImages.js");
}