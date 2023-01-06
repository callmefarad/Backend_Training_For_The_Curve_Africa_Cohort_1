const multer = require( 'multer' );
const path = require( 'path' );

const storage = multer.diskStorage( {
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
} );

const fileFilter = (req, file, cb) => {
    const ext = path.extname( file.originalname );
    if ( ext === '.png' || ext === '.jpeg' || ext === '.jpg' ) {
        cb(null, true)
    } else {
        cb(new Error('Unsupported file format'), false)
    }
}

const postImageUploader = multer( {
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1022 * 1024 * 10,
    }
} ).single( 'captionImage' );


module.exports = postImageUploader;