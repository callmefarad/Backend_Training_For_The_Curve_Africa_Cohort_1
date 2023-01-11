require( 'dotenv' ).config();
const cloudinary = require( 'cloudinary' ).v2

cloudinary.config( { 
//   cloud_name: process.env.CLOUDINARY_NAME, 
//   api_key: process.env.CLOUDINARY_API_KEY, 
//   api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: "callmefarad", 
  api_key: "993829221415253", 
  api_secret: "CMmMXgXEKuE-jlxPEvbZjZgorcc",
  secure: true
})

module.exports = cloudinary;