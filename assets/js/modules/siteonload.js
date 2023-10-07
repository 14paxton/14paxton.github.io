import * as oopImages from "../Objects/JavaOOPImages.json"

async function imageToCSS() {
    console.log("load image")
    let cssString = '';

    Object.keys(oopImages).forEach(key => {
        if (oopImages.hasOwnProperty(key)) {

            cssString += `#${key} {
    background-image: url('${oopImages[key]}');
        background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    
    `
        }

        const stylesheet = document.createElement('style');
        stylesheet.type = 'text/css';
        stylesheet.innerText = cssString;
        document.head.appendChild(stylesheet);

    })

}

export {imageToCSS}