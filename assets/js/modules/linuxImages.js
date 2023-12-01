import {default as linuxImages} from '/assets/js/Objects/LinuxImages.js';
import {createAndAppendStyle} from '/assets/js/modules/addURIToStyleElement.js';
import {addCSSImageContainers} from '/assets/js/modules/createCSSImageContainers.js';

export default async function () {
    console.log('create images linuxImages');
    createAndAppendStyle(linuxImages).then(async () => {
        console.log('images added linuxImages');
        await addCSSImageContainers(linuxImages, 'linuxImages.js');
    });
}
