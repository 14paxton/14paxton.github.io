import {default as dockerImages} from "/assets/js/Objects/DockerImages.js";
import {createAndAppendStyle} from "/assets/js/modules/addURIToStyleElement.js";
import {addCSSImageContainers} from "/assets/js/modules/createCSSImageContainers.js";

export default async function () {
    console.log("create images dockerImages");
    createAndAppendStyle(dockerImages).then(async () => {
        console.log("images added DockerImages");
        await addCSSImageContainers(dockerImages, "dockerImages.js");
    });
}