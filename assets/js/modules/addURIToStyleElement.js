async function createStyleElement(key, jsonImageURI) {
    return new Promise(resolve => {
        const stylesheet = document.createElement('style');
        stylesheet.type = 'text/css';
        stylesheet.innerText = `#${key} { background: url('${jsonImageURI[key]}') no-repeat; background-size: cover; width: auto; height: auto; }`
        // stylesheet.innerText = `#${key} { background: url('${javaOOPImages[key]}'); background-size: cover; background-repeat: no-repeat; background-position: center; height: 100%; width: 90%;}`
        document.head.appendChild(stylesheet);
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