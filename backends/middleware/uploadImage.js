import multer from 'multer';

let maxSize = 1 * 1000 * 1000;

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === "application/octet-stream"){
            cb(null, "./public/uploads")
        }else  cb(null ,false)
    },
    filename: (req,file,cb) => {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({
    storage,
    limits: {
        fileSize: maxSize
    }
}).single('file')

export {upload}
