const { FILE_UPLOAD_DIR } = require("./constant");
const fs = require('fs');
const path = require('path');

const uploadFile = (file,subdir, fileName) => {
    try {

        const dirPath = path.join(path.resolve(__dirname, '..'), FILE_UPLOAD_DIR, subdir);

        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
            console.log(`Directory created: ${dirPath}`);
        }
       
        const filePath = `${dirPath}/${fileName}`;

        fs.writeFile(filePath,file,(err) => {
           console.log('err file',err)
        })

    } catch (err) {
        console.log('error', err);
    }
}

module.exports = {
    uploadFile
}