import { addExpense, editExpense, removeExpense } from '../../actions/expenses.js';

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
        const expenseData = {
            description: 'Rent',
            amount: 109500,
            note: 'monthly rent',
            createdAt: 1000000
        };

        const action = addExpense(expenseData);
        expect(action).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                ...expenseData,
                id: expect.any(String)
            }
        });
        // expect(action.type).toBe('ADD_EXPENSE');
        // expect(action.expense.id).toBeTruthy();
        // expect(action.expense.description).toBe(expenseData.description);
        // expect(action.expense.amount).toBe(expenseData.amount);
        // expect(action.expense.note).toBe(expenseData.note);
        // expect(action.expense.createdAt).toBe(expenseData.createdAt);
    });

    test('should setup add expense action object with default values', () => {
        const expenseDefaults = {
            description: '',
            amount: 0,
            note: '',
            createdAt: 0
        };

        const action = addExpense();
        expect(action).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                ...expenseDefaults,
                id: expect.any(String)
            }
        })

    });

});
