import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAT4cHGT6trlwWjCa3lePSXC8dbrrsB454",
    authDomain: "expensify-d53af.firebaseapp.com",
    databaseURL: "https://expensify-d53af.firebaseio.com",
    projectId: "expensify-d53af",
    storageBucket: "expensify-d53af.appspot.com",
    messagingSenderId: "839078409433"
};

firebase.initializeApp(config);

const database = firebase.database();

// get and then be notified of changes (hence callback)
database.ref().on('value', (snapshot) => {
    const val = snapshot.val();
    console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
}, (e) => {
    console.log('fetch data error: ', e);
});

// unsubscribe by calling off() - no argument in off() - to cancel the callback.
// a function argument in off() spoecies the callback to cancel, it must be the
// same as the subcscbed function. NOTE: .on() returns tthe function!!!

// now change data to trigger tthe ^^^ callback
setTimeout( () => {
    database.ref().update({
        age: 60
    });
}, 3500);

// database.ref()
//     .once('value')
//     .then( (snapshot) => {
//         const val = snapshot.val();
//         console.log('data: ', val);
//     })
//     .catch( (e) => {
//         console.log('error: ', e);
//     })

// database.ref().set({
//     name: 'Jim Whurr',
//     age: 62,
//     stressLevel: 6,
//     job: {
//         title: 'Retired',
//         company: 'ixBDIA'
//     },
//     location: {
//         city: 'Leeds',
//         country: 'UK'
//     }
// }).then(() => {           // wait for promise (firebase does not return any thing)
//     console.log('Data saved');
// }).catch( (e) => {
//     console.log('error: ', e);
// });

// wipe isSingle
// database.ref('isSingle').remove()
//     .then( () => {
//         console.log('data removed')
//     })
//     .catch( (e) => {
//         console.log('error: ', e);
//     })

// database.ref().update({
//     job: 'Manager',
//     'location/city': 'KUH'   // need to specify internal values giving a path
// });

// database.ref().update({
//     stressLevel: 9,
//     'job/company': 'Teacher'
// })
