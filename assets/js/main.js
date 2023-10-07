(async () => {
    const moduleSpecifier = "/assets/js/modules/siteonload.js";
    const {imageToCSS} = await import(moduleSpecifier);
    await imageToCSS();
})();