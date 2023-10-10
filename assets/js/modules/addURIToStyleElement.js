async function createStyleElement(key, jsonImageURI) {
    return new Promise(resolve => {
        const stylesheet = document.createElement('style');
        stylesheet.type = 'text/css';

        //first use at TPlus
        // stylesheet.innerText = `#${key} { background: url('${javaOOPImages[key]}'); background-size: cover; background-repeat: no-repeat; background-position: center; height: 100%; width: 90%;}`

        //works but leave spaces
        // stylesheet.innerText = `#${key} { background: url('${jsonImageURI[key]}') no-repeat; display: 100% auto; background-size: 100%; background-position: center; width: 100%; height: 100%; margin:0 auto;}`

        // stylesheet.innerText = `#${key} { background: url('${jsonImageURI[key]}') no-repeat; background-position: top; background-size: contain; width: auto; height: auto; margin: auto;}`
        // stylesheet.innerText.concat(` #${key}:hover{transform: scale(2)}`)

        const imageStyles = new CSSStyleSheet();
        imageStyles.insertRule(`#${key} { background: url('${jsonImageURI[key]}') no-repeat; background-position: center; background-size: 100% auto; padding:70% 0%;}`);

        document.adoptedStyleSheets = [...document.adoptedStyleSheets, imageStyles];
        // document.head.appendChild(stylesheet);
        resolve();
    })
}

async function createAndAppendStyle(jsonImageURI) {
    const promiseArray = []
    Object.keys(jsonImageURI).forEach(key => {
        console.log(`uri style for ${key}`)
        if (jsonImageURI.hasOwnProperty(key)) {
            promiseArray.push(createStyleElement(key, jsonImageURI));
        }
    })

    await Promise.all(promiseArray);
}

export {createAndAppendStyle}