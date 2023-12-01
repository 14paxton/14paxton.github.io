export default async function (moduleFileName) {
    const moduleSpecifier = (fileName) => `/assets/js/modules/${fileName}`;
    const path = moduleSpecifier(moduleFileName);
    console.log('get module ' + moduleSpecifier(moduleFileName));

    async function loadMyModule() {
        console.log('loadMyModule');
        const {default: runFunc} = await import(path);
        await runFunc();
    }

    await loadMyModule();
}
