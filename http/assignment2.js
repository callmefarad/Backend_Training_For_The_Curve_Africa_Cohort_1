// write a program that creates folder.
// import the file system module
const Fs = require('fs')

let folder = './lucia'
let number = ( Math.floor( Math.random() * 10 ) + 1 )
folder = folder + number
const create =Fs.mkdir( folder, ( error ) => {
    if ( error ) {
        console.log( "error creating folder" )
    } else {
        console.log( "Implemented by LUCIA, a student of 'The Curve Africa' " )
    }
} );
create;

if ( !Fs.existsSync(), ( folderAdder ) => {
    if ( error ) {
        console.log("error")
    } else {
        console.log("successfully created another folder")
        }
});
create;
