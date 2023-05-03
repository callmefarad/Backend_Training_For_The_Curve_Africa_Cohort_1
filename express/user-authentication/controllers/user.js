require( 'dotenv' ).config();
const model = require( '../models' );
const jwt = require( 'jsonwebtoken' );
const bcrypt = require( 'bcrypt' );

// signup function
const signUp = async ( req, res ) => {
    try {
        // extracting the attributes from the req.body
        const { name, email, password } = req.body;

        // capture the new user email
        const checkEmail = await model.user.findOne( {
            where: {
                email: email
            }
        } )
        
        // check for existence
        if ( checkEmail ) {
            res.status( 400 ).json( {
                status: "Failed",
                message: "Email already exist."
            })
        } else {
            // encrypt the user password
            const saltedPassword = await bcrypt.genSalt( 10 );
            const hashedPassword = await bcrypt.hash(password, saltedPassword)

            // generate token
            const generateToken = await jwt.sign( {
                name,
                email,
                password,
            }, process.env.JWT_SECRET, { expiresIn: '1d' } )
            
            // user data
            const userData = {
                name,
                email,
                password: hashedPassword,
                token: generateToken
            }

            const newUser = await model.user.create( userData );

            if(!newUser){
                res.status( 400 ).json( {
                    status: 'Failed',
                    message: 'Failed to create user'
                })
            } else {
                res.status( 201 ).json( {
                    status: 'Success',
                    data: newUser
            })
            }
        }
    } catch ( error ) {
        res.status( 400 ).json( {
            status: "Failed",
            message: error.message
        })
    }
}

const logIn = async (req,res) => {
    try{
        const {email,password} =req.body;
        const check = await model.user.findOne({where:{email:email}});
        if(!check)return res.status(404).json({message: "email not found"})

        const isPassword = await bcrypt.compare(password,check.password);
        if(!isPassword)return res.status(404).json({message: "password not found"})
       
const generateToken = await jwt.sign( {
                email,
                password,
            }, process.env.JWT_SECRET, { expiresIn: '1d' } )
            check.token = generateToken

      await check.save()
      res.status(200).json({
        message:"successful",
        data:check
      })
    }catch(e){
        res.status(400).json({message: e.message})
    }
}

const getAll = async (req,res) => {
    try{
        const allData = await model.user.findAll();
        res.status(200).json({message: allData})
    }catch(e){
        console.log(e.message)
    }
}

const getOne = async (req,res) =>{
    try {
        const id = req.params.id;
        const oneRec = await model.user.findAll({where: {id: id}})
        res.status(201).json({data: oneRec})
    } catch (e) {
        res.status(404).json({message: e.message})
    }
}
module.exports = {
    signUp,
    logIn,
    getAll,
    getOne
}

