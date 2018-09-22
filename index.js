const fs = require('fs');
const path = require('path');
const params = require('./command');
const del = require('del');


let pathlocal = (folder) => path.resolve(__dirname, folder);

const dist = pathlocal(params.dist);
const source = pathlocal(params.source);

const createDir = (folder, callback) => {
    mkdir(folder)
    callback();
}

const mkdir = (folder) => {
    if (!fs.existsSync(pathlocal(folder))) {
        fs.mkdirSync(pathlocal(folder));
    }
};

const copyF = (base, callback) => {
    readDir(base);
    callback();
}

const readDir = (base) => {
    const files = fs.readdirSync(base);
    files.map(item => {
        let localBase = path.join(base, item);
        let state = fs.statSync(localBase);
        if (state.isDirectory()) {
            readDir(localBase);
        } else {
            moveFile(localBase);
        }
    });
}

const moveFile = (localBase) => {
    let fileName = path.basename(localBase);
    let fileFirstLetter = fileName[0];
    let letterPath = path.resolve(dist, fileFirstLetter);
    createDir(letterPath, () => fs.copyFileSync(localBase, path.join(letterPath, fileName)));
}

const deleteFolder = (folder) => {
    if (folder) {
        del(pathlocal(folder)).then(console.log("Delete!"))
        }
}


createDir(dist, () => copyF(source, () => deleteFolder(params.del)));
