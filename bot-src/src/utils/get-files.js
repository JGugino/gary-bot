const fs = require('fs');
const path = require('path');

module.exports = (directory, foldersOnly = false) => {
    let fileNames = [];

    const files = fs.readdirSync(directory, { withFileTypes: true });

    for(const file of files){
        const fiilePath = path.join(directory, file.name);

        if(foldersOnly){
            if(file.isDirectory()){
                fileNames.push(fiilePath)
            }
        }else{
            if(file.isFile()){
                fileNames.push(fiilePath);
            }
        }
    }

    return fileNames;
}