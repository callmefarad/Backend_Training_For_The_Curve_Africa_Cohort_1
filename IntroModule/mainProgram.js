// for mainProgram

// import the fruitModule
const fruit = require('./fruitsModule');

// display the list of fruits
fruit.fruitList();
console.log('\n')

// display array of fruits
console.log( fruit.fruits );
console.log('\n')

// display apple
fruit.onlyApple();