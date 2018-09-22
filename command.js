const commandLine = require('commander');
// const path = require('path');

commandLine
    .version('1.0.0', '-v, --version')
    .option('-i, --mkdir [name]', 'Make a new directory in current path witn name [dist]', 'dist')
    .option('-s, --targetdir [name]', 'Target directory for necessary sort files with name [images]', 'images')
    .option('-d, --del [name]', 'Delete directory after move and sorted files', false)
    .parse(process.argv);

// console.log(commandLine.mkdir);
// console.log(commandLine.targetdir);
// console.log('TCL: commandLine.del', commandLine.del);

const params = {
    source: commandLine.targetdir,
    dist: commandLine.mkdir,
    del: commandLine.del
};


module.exports = params;