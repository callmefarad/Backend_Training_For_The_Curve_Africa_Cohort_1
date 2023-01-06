const multer = require( 'multer' );
const path = require( 'path' );

const storage = multer.diskStorage( {
    location: (req, file, cb) => {
        cb(null, '../uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});


const fileFilter = (req, file, cb) => {
    const ext = path.extname( file.originalname );
    if ( ext !== '.jpeg' || ext !== '.jpg' || ext !== '.png' ) {
        cb(null, new Error('Unsupported file format'), false)
    } else {
        cb(null, true)
    }
}

const postImageUploader = multer( {
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5,
    }
} ).single( 'postImage' );


module.exports = postImageUploader;