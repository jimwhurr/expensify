import * as firebase from 'firebase';

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const database = firebase.database();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };



// // database.ref('expenses')
// //     .once('value')
// //     .then( (snapshot) => {
// //         console.log(snapshot.val());
// //     });
// // ^^^ returns our objects but not as an array, we need to process the data somehow
// // to get the array that we need for redux. Look up 'data snapshot' for methods
// // other than val()... use forEach() to iterate over expenses and get 'child' snapshots.

// // const displayValues = (snapshot) => {
// //     const expenses = [];

// //     snapshot.forEach( (childSnapshot) => {
// //         expenses.push({
// //             id: childSnapshot.key,
// //             ...childSnapshot.val()
// //         })
// //     })

// //     console.log(expenses);
// //  };

// // database.ref('expenses')
// //     .on('value', displayValues);

// database.ref('expenses').on('child_changed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('child_added', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

// // const ids = [];

// // for(let i = 0; i < expenses.length; i++) {
// //     const data = {
// //         description: expenses[i].description,
// //         note: expenses[i].note,
// //         amount: expenses[i].amount,
// //         createdAt: expenses[i].createdAt,
// //     }

// //     ids[i] = database.ref('expenses').push(data);
// // }

// // for (let j = 0; j < ids.length; j++) {
// //     console.log(`expenses[${j}].id: ${ids[j].key}`);
// // }

// // firebase does not store arrays, it stores data under an objectt that is a
// // number - the index of thhe element in the array! TThhis is not that useful.
// // to get around this we restructure our data. e.g. an array of notes
// // becomes...

// // const firebaseNotes = {
// //     notes: {
// //         uniqueid1: {
// //             title: 'first note',
// //             body: 'some note'
// //         },
// //         uniqueid2: {
// //             title: 'second note',
// //             body: 'some other note'
// //         }
// //     }
// // };

// // unique ids... push the data generates a unique id and rerurns an object with
// // the id in keyK, and its parent:!
// // let id = database.ref('notes').push({
// //     title: 'Blinds',
// //     body: 'Phone blinds shop'
// // });

// // console.log('id: ', id.key);

// // database.ref(`notes/${id.key}`).update({
// //     body: 'Make an appointment to get a quote'
// // });