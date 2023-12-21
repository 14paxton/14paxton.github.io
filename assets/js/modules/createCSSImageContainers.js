async function addPadding(element, top, side) {
    return new Promise(() => {
        element.style.padding = `${top}% ${side}%`;
    });
}

async function createCSSImageContainers(keyValuePair, callingFile) {
    return new Promise((resolve, reject) => {
        const [id, uri] = keyValuePair
        const imgDiv = document.querySelector(`[data-img-loader="${callingFile}"]`);
        const {keyAsHeader, zoomOnHover, ...rest} = imgDiv.dataset;
        const {clientWidth, clientHeight, offsetWidth, offsetHeight, scrollWidth, scrollHeight} = imgDiv;
        console.log("create div dimensions: ", `keyAsHeader: ${keyAsHeader} ,clientWidth: ${clientWidth}, clientHeight: ${clientHeight}, offsetWidth: ${offsetWidth}, offsetHeight: ${offsetHeight}, scrollWidth: ${scrollWidth}, scrollHeight: ${scrollHeight}`);
        const image = new Image(clientWidth)

        image.id = id;
        image.src = uri;
        image.style.width = `${clientWidth}`;
        image.style.height = '100%'
        image.onload = Promise.resolve(addPadding(image, (Boolean(keyAsHeader)
                                                          ? 10
                                                          : 0), 0));
        image.onmouseover = zoomOnHover
                            ? (e) => (e.target.style.transform = "scale(1.4)")
                            : null;
        image.onmouseout = zoomOnHover
                           ? (e) => (e.target.style.transform = "scale(1)")
                           : null;

        if (keyAsHeader) {
            const headerOne = document.createElement("h1");
            headerOne.innerText = id.replace(/([A-Z])/g, " $1");
            headerOne.style.padding = "0px";
            headerOne.style.margin = "0px";
            imgDiv.appendChild(headerOne);
            Promise.resolve(addHeadingToTOC(headerOne));
        }

        resolve(imgDiv.appendChild(image));
    });
}

async function addCSSImageContainers(jsonImageObject, callingFile) {
    console.log(`calling file ${callingFile}`);
    const divPromises = [];
    Object.entries(jsonImageObject).forEach((keyValuePair) => {
        divPromises.push(createCSSImageContainers(keyValuePair, callingFile));
    });

    await Promise.all(divPromises);
}

async function addHeadingToTOC(headingToAdd) {
    return new Promise(() => {
        const replaceSpace = /\s/g;
        const toc = document.getElementById("markdown-toc");

        if (toc) {
            const a = document.createElement("a");
            const li = document.createElement("li");

            a.textContent = headingToAdd.textContent;
            a.href = `#${a.textContent.replaceAll(replaceSpace, "")}`;
            a.id = `markdown-toc-${a.textContent
                                    .replaceAll(replaceSpace, "-")
                                    .toLowerCase()}`;
            li.appendChild(a);
            toc.appendChild(li);
        }
    });
}

export {addCSSImageContainers};