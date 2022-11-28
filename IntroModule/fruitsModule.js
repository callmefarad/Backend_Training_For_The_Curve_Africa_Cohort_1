// for fruitModule

// array of fruits
const fruits = [ 'Banana', 'Apple', 'Mango', 'Pear' ];

// function that displays a list of fruits
const fruitList = () => {
    // loop through the fruits array
    for ( let i = 0; i < fruits.length; i++ )
        // display the result
        console.log(i + '.' + ' ' + fruits[i])
}

// display only apple
const onlyApple = () => {
    let result = fruits[ 1 ]
    console.log(result)
}

module.exports = {
    fruits,
    fruitList,
    onlyApple
}
