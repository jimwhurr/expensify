console.log('destructuring');

// console.log('Object Destructuring');

// const person = {
//     // name: 'James',
//     age: 62,
//     location: {
//         city: 'Leeds',
//         temp: 9
//     }
// };


// In E6 we can destructure an object, e.g.
// const {name, age} = person;
// console.log(`${name} is ${age} years old.`);

// we can also set a default value if the variable doesn't exist. E.g.
// if name doesn't exist we could set it to anonymous
// const {name = 'Anonymous', age} = person;
// console.log(`${name} is ${age} years old.`);

// and again with the location object
// const {city, temp} = person.location;
// if (city && temp) {
//     console.log(`In ${city} it is ${temp} degrees.`)
// }

// the destructure variables don't have to have the same name as in the object. 
// We can use the renaming syntax to achieve this, e.g.
// const {city, temp: temperature} = person.location;
// if (city && temperature) {
//     console.log(`In ${city} it is ${temperature} degrees.`)
// }

// to both rename and set a default value, e.g.
// const {name: firstName = 'Anonymous', age: years} = person;
// console.log(`${firstName} is ${years} years old.`);

// const book = {
//     title: 'Ego is the enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         // name: 'Penguin'
//     }
// };

// make this work...
// console.log(publisherName); // if valid, otherwise default 'Self-Published'

// const {name: publisherName = 'Self-Published'} = book.publisher;
// console.log(publisherName); // if valid, otherwise default 'Self-Published'


console.log('Array Destructuring');