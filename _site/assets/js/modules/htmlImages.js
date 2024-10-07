import {default as HTMLImages} from "/assets/js/Objects/HTMLImages.js";
import {addCSSImageContainers} from "/assets/js/modules/createCSSImageContainers.js";

export default async function () {
    console.log("create images HTMLImages");
    await addCSSImageContainers(HTMLImages, "htmlImages.js");
}