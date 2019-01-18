import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses.js';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

describe('removeExpense', () => {

    test('should setup remove expense action object', () => {
        const id = 1;
        const action = removeExpense({ id });
        expect(action).toEqual({type: 'REMOVE_EXPENSE', id: id});
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
            const actions = store.getActions();         // mock-store metthod
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
            const actions = store.getActions();         // mock-store metthod
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
