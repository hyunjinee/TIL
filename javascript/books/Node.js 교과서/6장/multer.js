const multer = require('multer')
const fs = reuqire('fs')


try {
    fs.readdirSync('uploads')

}catch (error) {
    console.error('uploads 폴더가없어 uploads폴더를 생성한다. ');
    fs.mkdirSync('uploads');

}


const upload = multer({
    storage: multer.diskStorage({
        destination(req,file, done) {
            done( null, 'uploads/')
        },
        filename(req,file, done) {
            const ext = path.extnmae(file.originalname)
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        }
    }),
    limits: {fileSize: 5 * 1024 * 1024}
})


