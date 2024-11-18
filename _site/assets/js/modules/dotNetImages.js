import {dotNetImages} from "/assets/js/Objects/DotNetImages.js";
import {addCSSImageContainers} from "/assets/js/modules/createCSSImageContainers.js";

export default async function () {
    console.log("create images dotNetImages");
    console.log("images added dotNetImages");
    await addCSSImageContainers(dotNetImages, "dotNetImages.js");
}