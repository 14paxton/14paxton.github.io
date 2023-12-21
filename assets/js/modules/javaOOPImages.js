import {javaOOPImages}         from "/assets/js/Objects/JavaOOPImages.js";
import {addCSSImageContainers} from "/assets/js/modules/createCSSImageContainers.js";

export default async function () {
    console.log("create images javaOOPIMAGES");
        console.log("images added javaOOPImages");
        await addCSSImageContainers(javaOOPImages, "javaOOPImages.js");
}