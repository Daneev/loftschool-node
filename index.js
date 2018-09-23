const fs = require('fs');
const path = require('path');
const params = require('./commandnpm');
const del = require('del');


let pathlocal = (folder) => path.resolve(__dirname, folder);

const dist = pathlocal(params.dist);
const source = pathlocal(params.source);

const mkDir = (folder) => {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(pathlocal(folder))) {
            fs.mkdir(pathlocal(folder), (err) => {
                if (err) reject(err);
            });
        }
        resolve(`Create folder ${folder}`);
    })
};

const readDir = (base) => {
    return new Promise((resolve, reject) => {
        const files = fs.readdirSync(base);
        files.map(item => {
            let localBase = path.join(base, item);
            let state = fs.statSync(localBase);
            if (state.isDirectory()) {
                readDir(localBase);
            } else {
                moveFile(localBase).then(response => {
                            console.log(response)
                        });
            }
        })
        resolve("Move complit!");
    }).catch(err => {
        console.log(err);
    });
}

const moveFile = (localBase) => {
    return new Promise((resolve, reject) => {
        let fileName = path.basename(localBase);
        let fileFirstLetter = fileName[0];
        let letterPath = path.resolve(dist, fileFirstLetter);
        mkDir(pathlocal(letterPath)).then(response => {
            console.log(response);
            fs.copyFile(localBase, path.join(letterPath, fileName), (err) => {
                if (err) reject(err);
            });
        });
        resolve(`Copy file ${fileName}`);
    })
}

const deleteFolder = (folder) => {
    if (folder) {
        del(pathlocal(folder)).then(console.log("Delete!"))
    }
}


mkDir(dist)
    .then(response => {
        console.log(response);
        return readDir(source)
    })
    .then(response => {
        console.log(response);
        deleteFolder(params.del);
    });