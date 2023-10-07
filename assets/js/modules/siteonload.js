import {javaOOPImages} from '/assets/js/Objects/JavaOOPImages.js'

async function imageToCSS() {
    Object.keys(javaOOPImages).forEach(key => {
        console.log(key)

        if (javaOOPImages.hasOwnProperty(key)) {
            const stylesheet = document.createElement('style');
            stylesheet.type = 'text/css';
            // stylesheet.innerText = `#${key} { background: url('${javaOOPImages[key]}') no-repeat;}`
            stylesheet.innerText = `#${key} { background: url('${javaOOPImages[key]}'); background-size: cover; background-repeat: no-repeat; background-position: center; height: 100%; width: 90%;}`
            document.head.appendChild(stylesheet);
        }
    })
}

export {imageToCSS}