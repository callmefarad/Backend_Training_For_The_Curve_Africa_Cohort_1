const model = require( '../models' )
const bcrypt = require( 'bcrypt' );
const jwt = require('jsonwebtoken')

// signup users
const signUp = async ( req, res ) => {
    try {
        // extract the key/attributes from the request body
        const { id, name, email, password } = req.body;
        // verify if the email exist in the database
        const emailCheck = await model.user.findOne({
            where: {
                email: email
            }
        } )
        if ( emailCheck ) {
            res.status( 400 ).json( {
                status: "Failed",
                message: `This ${email} is already registered, try another email.`
            })
        } else {
            // protect the password with the salt algorithm
            const saltedPassword = await bcrypt.genSalt( 10 );
            // hash the salted password.
            const hashedPassword = await bcrypt.hash( password, saltedPassword );

            const token = await jwt.sign( { email: email, name: name }, "mySecrete", { expiresIn: '1d' } )
        
            const userData = {
                name,
                email,
                password: hashedPassword,
                token: token
            }

            // create user
            newUser = await model.user.create( userData );
            if ( !newUser ) {
                res.status( 400 ).json( {
                    status: Failed,
                    message: "Can not create user."
                })
            } else {
                res.status( 201 ).json( {
                    status: "Success",
                    data: newUser
                })
            }
        }
    } catch ( error ) {
        res.status( 500 ).json( {
            status: "Failed",
            message: error.message
        })
    }
}


// generate a token
const generateToken = (id) => {
    jwt.sign( { id }, 'mySecret', { expires: '1d' } );   
}


module.exports = {
    signUp,
}