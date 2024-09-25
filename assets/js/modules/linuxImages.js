import {default as linuxImages} from "/assets/js/Objects/LinuxImages.js";
import {addCSSImageContainers} from "/assets/js/modules/createCSSImageContainers.js";

export default async function () {
    console.log("create images linuxImages");
    await addCSSImageContainers(linuxImages, "linuxImages.js");
}