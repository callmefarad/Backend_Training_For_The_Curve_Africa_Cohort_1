const postModel = require( '../models' ).post;
const Validator = require( 'fastest-validator' );


const newPost = async ( req, res ) => {
    try {
        const data = {
            title: req.body.title,
            desc: req.body.desc,
            postImage: req.file.path,
            content: req.body.content,
            commentId: req.body.commentId
        }

        const postSchema = {
            title: {type: 'string', optional: false},
            desc: {type: 'string', optional: false},
            postImage: {type: 'string', optional: true},
            content: {type: 'string', optional: false},
            commentId: {type: 'string', optional: false},
        }
        const v = new Validator();
        const validatorResponse = v.validate( data, postSchema );

        if ( validatorResponse !== true ) {
            return res.status( 400 ).json( {
                message: 'Validation Failed',
                errors: validatorResponse[0].message
            })
        } else {
            const createdPost = await postModel.create( data );
            res.status( 201 ).json( {
                message: "New post was created.",
                data: createdPost
            })
        }
    } catch ( error ) {
        res.status( 400 ).json( {
            message: error.message
        })
    }
}

module.exports = {
    newPost,
}