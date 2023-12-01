(async () => {
    const createContainerPromiseList = [];
    const listOfImageContainers = document.querySelectorAll('[data-img-loader]');

    listOfImageContainers.forEach((element) => {
        const {imgLoader, ...rest} = element.dataset;
        createContainerPromiseList.push(new Promise(async (resolve) => {
            console.log(`load module ${imgLoader}`);

            async function loadMyModule() {
                const {default: loadModuleFunc} = await import(
                    '/assets/js/modules/loadModule.js'
                    );
                await loadModuleFunc(imgLoader);
            }

            resolve(loadMyModule());
        }),);
    });

    Promise.all(createContainerPromiseList);
})();
