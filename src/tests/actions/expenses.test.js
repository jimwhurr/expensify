import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
    startAddExpense,
    addExpense,
    editExpense,
    startEditExpense,
    removeExpense,
    setExpenses,
    startSetExpenses,
    startRemoveExpense } from '../../actions/expenses.js';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

// const envdata = () => {
//     console.log(`apiKey: ${process.env.FIREBASE_API_KEY}`);
//     console.log(`authDomain: ${process.env.FIREBASE_AUTH_DOMAIN}`)
//     console.log(`databaseURL: ${process.env.FIREBASE_DATABASE_URL}`)
//     console.log(`projectId: ${process.env.FIREBASE_PROJECT_ID}`)
//     console.log(`storageBucket: ${process.env.FIREBASE_STORAGE_BUCKET}`)
//     console.log(`messagingSenderId: ${process.env.FIREBASE_MESSAGING_SENDER_ID}`)
// };

beforeEach( (done) => {

    const expensesData = {};
    expenses.forEach( ( { id, description, note, amount, createdAt } ) => {
        expensesData[id] = {description, note, amount, createdAt};
    });

    database.ref('expenses').set(expensesData).then( () => done() );
});


describe('removeExpense', () => {

    test('should setup remove expense action object', () => {
        const id = 1;
        const action = removeExpense({ id });
        expect(action).toEqual({type: 'REMOVE_EXPENSE', id: id});
    });

    test('should remove an expense from the database and redux store', (done) => {
        const store = createMockStore({});
        const id = expenses[1].id;

        store.dispatch(startRemoveExpense( { id } )).then( () => {
            const actions = store.getActions();         // mock-store method
            expect(actions[0]).toEqual({type: 'REMOVE_EXPENSE', id});

            // now return another promise to enable chaining..
            return database.ref(`expenses/${id}`).once('value');
        }).then( (snapshot) => {
            expect(snapshot.val()).toBeFalsy();
            done();
        })
    });
});


describe('editExpense', () => {

    test('should setup edit expense action object', () => {
        const id = 1;
        const updates = {
            description: 'Rent',
            amount: 109500,
            note: 'Monthly rent',
            createdAt: 1000000
        };

        const action = editExpense( id, updates );
        expect(action).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates: updates
        });
    });

    test('should update the expense in the DB', (done) => {
        const store = createMockStore({});
        const id = expenses[0].id;
        const updates = {
            note: 'updated by test case'
        };

        store.dispatch(startEditExpense(id, updates)).then( () => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'EDIT_EXPENSE',
                id,
                updates
            });
            return database.ref(`expenses/${id}`).once('value');
        }).then((snapshot) => {
            expect(snapshot.val().note).toEqual(updates.note);
            done();
        });
    });
});


describe('addExpense', () => {

    test('should setup add expense action object with supplied values', () => {
        const action = addExpense(expenses[2]);
        expect(action).toEqual({
            type: 'ADD_EXPENSE',
            expense: expenses[2]
        });
    });

    // test('should setup add expense action object with default values', () => {
    //     const expenseDefaults = {
    //         description: '',
    //         amount: 0,
    //         note: '',
    //         createdAt: 0
    //     };

    //     const action = addExpense();
    //     expect(action).toEqual({
    //         type: 'ADD_EXPENSE',
    //         expense: {
    //             ...expenseDefaults,
    //             id: expect.any(String)
    //         }
    //     })
    // });

    test('should add expense to database and redux store', (done) => {
        const store = createMockStore({});
        const testData = {
            description: 'Plumber',
            note: 'get leaking tap fixed',
            amount: 7537,
            createdAt: 1000
        };

        store.dispatch(startAddExpense(testData)).then( () => {
            const actions = store.getActions();         // mock-store method
            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...testData
                }
            });

            // now return another promise to enable chaining..
            return database.ref(`expenses/${actions[0].expense.id}`).once('value');

        }).then((snapshot) => {
            expect(snapshot.val()).toEqual(testData);
            done();
        });
    });

    test('should add expense with default values to database and redux store', (done) => {
        const store = createMockStore({});
        const expenseDefaults = {
            description: '',
            note: '',
            amount: 0,
            createdAt: 0
        };

        store.dispatch(startAddExpense( {} )).then( () => {
            const actions = store.getActions();         // mock-store method
            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...expenseDefaults
                }
            });

            // now return another promise to enable chaining..
            return database.ref(`expenses/${actions[0].expense.id}`).once('value');

        }).then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseDefaults);
            done();
        });
    });
});

describe('setExpenses', () => {

    test('should setup set expenses action object with data', () => {
        const action = setExpenses(expenses);
        expect(action).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
    });

    test('should fetch expenses from firebase', (done) => {
        const store = createMockStore({});      // mock store so we can test
        store.dispatch(startSetExpenses())     // grab test data from DB
            .then( () => {
                // now check we have asked for the test data

                // get actions from store
                const actions = store.getActions();
                // check that we got the test data
                expect(actions[0]).toEqual({
                    type: 'SET_EXPENSES',
                    expenses
                });
                done();
            });
    });
});
