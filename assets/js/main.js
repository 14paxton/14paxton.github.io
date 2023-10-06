(async () => {
    const moduleSpecifier = './modules/loadJavaOOPImages.js';
    const {loadImages} = await import(moduleSpecifier);
    await loadImages();
})();