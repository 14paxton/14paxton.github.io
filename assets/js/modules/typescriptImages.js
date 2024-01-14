import {default as TypescriptImages} from "/assets/js/Objects/TypescriptImages.js";
import {addCSSImageContainers} from "/assets/js/modules/createCSSImageContainers.js";

export default async function () {
    console.log("create images TypescriptImages");
    await addCSSImageContainers(TypescriptImages, "typescriptImages.js");
}