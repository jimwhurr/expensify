import moment from 'moment';
import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

describe('expensesReducer', () => {

    test('should set defaulttstate to be an empty array', () => {
        const state = expensesReducer(undefined, { type: '@@INIT'});
        expect(state).toEqual([ ]);
    });

    test('should remove expenses with given id', () => {
        const id = expenses[1].id;
        const action = { type: 'REMOVE_EXPENSE', id };
        const state = expensesReducer(expenses, action);
        expect(state).toEqual([ expenses[0], expenses[2] ]);
    });

    test('should not remove anything if an invalid id passed', () => {
        const id = -1;
        const action = { type: 'REMOVE_EXPENSE', id };
        const state = expensesReducer(expenses, action);
        expect(state).toEqual(expenses);
    });

    test('should add a new expenses', () => {
        const expense = {
            id: 4,
            description: 'Phone Charges',
            note: '',
            amount: 23.57,
            createdAt: moment(0).subtract(1, 'days').valueOf()    
        };
        const action = { type: 'ADD_EXPENSE', expense };
        const state = expensesReducer(expenses, action);
        // expect(state.length).toBe(4);
        // expect(state[3]).toEqual(expense);
        expect(state).toEqual([...expenses, expense]);
    });

    test('should make changes to an existing expenses', () => {
        const id = expenses[2].id;
        const amount = 2800;
        const note = 'includes bolt-on';
        const updates = { note, amount };
        const action = { type: 'EDIT_EXPENSE', id, updates };
        const state = expensesReducer(expenses, action);
        expect(state.length).toBe(3);
        expect(state[2]).toEqual({
            id: id,
            description: 'Credit Card',
            note: note,
            amount: amount,
            createdAt: moment(0).add(4, 'days').valueOf()
        });
    });

    test('should not make changes if id not found', () => {
        const updates = {
            note: 'includes bolt-on',
            amount: 28.00
        };
        const action = { type: 'EDIT_EXPENSE', id: -1, updates };
        const state = expensesReducer(expenses, action);
        expect(state).toEqual(expenses);
    });

    test('should set expenses', () => {
        const action = {
            type: 'SET_EXPENSES',
            expenses: [ expenses[1] ]
        };

        const state = expensesReducer(expenses, action);

        expect(state).toEqual( [ expenses[1] ] );
    });
});
