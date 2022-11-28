// for osModule

// import the os module
const os = require( 'os' );

// view the content of the os module
let homeDir = os.homedir;
console.log( homeDir() );

let platform = os.platform();
console.log( platform );

let hostname = os.freemem();
console.log( hostname );