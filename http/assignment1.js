// write a node program that generate a random number between 1 and 10 every 5 seconds and return the sum total of the generated number after one minute.
total = 0
let interval = setInterval( () => {
    rN = Math.floor( Math.random() * 10 )
    console.log( rN)
    total = rN + total
}, 5000 );

setTimeout( () => {
    console.log( `the total random number generated after 60secs: ${ total }` )
    clearInterval( interval )
}, 60000 );