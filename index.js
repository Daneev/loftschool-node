const fs = require('fs');
const path = require('path');
const params = require('./commandnpm');
const del = require('del');


let pathlocal = (folder) => path.resolve(__dirname, folder);

const dist = pathlocal(params.dist);
const source = pathlocal(params.source);

const mkDir = async(folder) => {
    try {
        if (!fs.existsSync(pathlocal(folder))) {
            fs.mkdir(pathlocal(folder), err => err);
        };
        return(`Create folder ${folder}`);
    } catch (error) {
    	console.log(error);
    }
}

const readDir = async(base) => {
    try {
        const files = fs.readdirSync(base);
        files.map(item => {
            let localBase = path.join(base, item);
            let state = fs.statSync(localBase);
            if (state.isDirectory()) {
                readDir(localBase);
            } else {
                moveFile(localBase);
            }
        })
        return("Move complit!");
    } catch (error) {
        console.log(error);
    }
}

const moveFile = async(localBase) => {
    try {
        let fileName = path.basename(localBase);
        let fileFirstLetter = fileName[0];
        let letterPath = path.resolve(dist, fileFirstLetter);
        await mkDir(pathlocal(letterPath));
        await fs.copyFile(localBase, path.join(letterPath, fileName), err => err);
        // console.log(`Copy file ${fileName}`);
    } catch (error) {
        console.log(error);
    }
}

const deleteFolder = (folder) => {
    if (folder) {
        del(pathlocal(folder)).then(console.log("Delete!"))
    }
}

async function main() {
    try {
        await console.log(mkDir(dist));
        await console.log(readDir(source));
        await deleteFolder(params.del);
    } catch (error) {
        console.log(error)
    }
}

main()