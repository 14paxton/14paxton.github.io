(async () => {
    const imageContainer = document.querySelector("#imageContainer");

    if (imageContainer && ("images" in imageContainer.dataset) && !!imageContainer.dataset.images) {
        const {file, func} = JSON.parse(imageContainer.dataset.images);
        const moduleSpecifier = (fileName) => `/assets/js/modules/${fileName}`;
        const path = moduleSpecifier(file)
        console.log("get module " + moduleSpecifier(file))

        async function loadMyModule() {
            console.log("loadMyModule")
            const {default: runFunc} = await import(path);
            await runFunc();
        }

        await loadMyModule();
    }
})();