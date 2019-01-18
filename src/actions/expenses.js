import uuid from 'uuid';
import database from '../firebase/firebase';

// CURRENTLY
// =========
//  component calls action generator
//  action generator returns an object
//  component dispatches object
//  redux store changes

// TO USE FIREBASE
// ===============
//  component calls action generator
//  action generattor returns a function
//  component dispatches function
// TO DO THIS HAVE TO SETUP REDUX MIDDLEWARE! (redux-thunk)
//  function runs (has the ability to dispatch other actions and
//  do whatever it wants!)

// ADD_EXPENSE
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = ( expenseData = {} ) => {
    return (dispatch) => {
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expenseData;

        const expense = {description, note, amount, createdAt};

        // return to allow for promise chanining async testing
        return database.ref('expenses').push(expense).then((ref) => {
            dispatch( addExpense({
                id: ref.key,
                ...expense
            }));
        });
    };
};

// REMOVE_EXPENSE
export const removeExpense = ( { id } = {} ) => ({
    type: 'REMOVE_EXPENSE',
    id
});


// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});
