// write a program that display a list of colors every one second and in five seconds it displays the to number of color

// set an interval at which the colors will be displayed
let colorArray;
let interval = setInterval( () => {
    colorArray = [ "blue", "red", "green", "purple", "grey", "white", "black", "tomato", "orange", "gold" ];
    console.log( colorArray );
}, 1000 );

// set a time out for the colors
setTimeout( () => {
    clearInterval( interval );
    // console.log(`The total number of colors is: ${}`);
    console.log('The total number of colors is: ' + colorArray.length);
}, 5000);