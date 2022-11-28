// import the http module
const http = require( 'http' );

// create a port
const PORT = 1100;

// create a javaScript object
const students = [
    {
    name: "destiny",
    dept: "backend",
    complexion: "dark",
    size: "large",
    age: 20,
    greet: (name)=>{
        // res.end(`Good morning Mr. ${students.name}`)
        return name;
    }
    },
    {
    name: "favour",
    dept: "backend",
    complexion: "fair",
    size: "small",
    age: 50,
    greet: (name)=>{
        // res.end(`Good morning Mr. ${students.name}`)
        return name;
    }
    },
    {
    name: "lucia",
    dept: "backend",
    complexion: "dark",
    size: "small",
    age: 25,
    greet: (name)=>{
        // res.end(`Good morning Mr. ${students.name}`)
        return name;
    }
    },
    {
    name: "isaac",
    dept: "backend",
    complexion: "dark",
    size: "medium",
    age: 20,
    greet: (name)=>{
        // res.end(`Good morning Mr. ${students.name}`)
        return name;
    }
}
]

const app = http.createServer( (req, res) => {
    res.writeHead( 200, { 'Content-Type': 'application/json' } );
    res.end( `All available students \n ${JSON.stringify( students )} \n Total number of students: ${students.length}` );
});

app.listen( PORT, () => {
    console.log(`listening to port: ${PORT}`)
});