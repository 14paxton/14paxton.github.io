import {default as dockerImages} from "/assets/js/Objects/DockerImages.js";
import {addCSSImageContainers} from "/assets/js/modules/createCSSImageContainers.js";

export default async function () {
    console.log("create images dockerImages");
    console.log("images added DockerImages");
    await addCSSImageContainers(dockerImages, "dockerImages.js");
}