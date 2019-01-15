import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// Actions we will need!
// ADD_EXPENSE
const addExpense = ( { description = '', note = '', amount = 0, createdAt = 0 } = {} ) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

// REMOVE_EXPENSE
const removeExpense = ( { id } = {} ) => ({
    type: 'REMOVE_EXPENSE',
    id
});


// EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});


// SET_TEXT_FILTER
const setTextFilter = ( text = '' ) => ({
    type: 'SET_TEXT_FILTER',
    text
});


// SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT',
});

// SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE',
});

// SET_START_DATE
const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});

// SET_END_DATE
const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});



// create a reducer for each major root. So, in this case,
// one for expenses[] and another for filters{}.


// spread operator allows operations on an array returning a new array. E.g.
// const names = ['jim', 'sue']
// [...names, 'ben'] => ['jim', 'sue', ben], names = ['jim', 'sue']
// ['jacq', ...names] =>  ['jacq','jim', 'sue']
// ['jacq', ...names, 'ben'] =>  ['jacq','jim', 'sue', 'ben'], names still unchanged!


// -------------------------------------------------------------------------
//                     E X P E N S E S   R E D U C E R
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type) {

        case 'ADD_EXPENSE':     // REMEMBER we DON'T want to change the prev state!
            return [
                ...state,
                action.expense
            ];

        case 'REMOVE_EXPENSE':
            return state.filter( ({ id }) => id !== action.id );

        case 'EDIT_EXPENSE':
            return state.map( (expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates   // spread overrides
                    }
                }
                else {
                    return expense;
                }
            });

        default:
            return state;
    }
};


// -------------------------------------------------------------------------
//                     F I L T E R S   R E D U C E R
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type) {

        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };

        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            };

        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };

        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };

        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            };

        default:
            return state;
    }
};



// -------------------------------------------------------------------------
//                      S T O R E   C R E A T I O N
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

const store = createStore(
    combineReducers({                   // adds properties to the store root object
        expenses: expensesReducer,      // now we get our { expenses: [] }
        filters: filtersReducer         // should now complete our data structure
    })
);


// -------------------------------------------------------------------------
//                G E T   V I S I B L E   E X P E N S E S
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    // console.log('params: {', text, sortBy, startDate, endDate, '}');
    return expenses.filter((expense) => {
        // console.log( expense, (typeof startDate), (typeof startDate !== 'number'),  ( expense.createdAt >= startDate) );
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort( (a, b) => {
        if (sortBy === 'date') {
            return (a.createdAt < b.createdAt) ? 1 : -1;
        }
        else if (sortBy === 'amount') {
            return (a < b) ? 1 : -1;
        }
    });
};

// timestamps (millisecs)
//  -ve (backward in time) 0 unix epoch 0 (forward in time) +ve
// unix epoch = 00:00:00 1/1/1970

store.subscribe( () => {                // track state changes
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});



const expenseOne = store.dispatch( addExpense( { description: 'Rent', amount: 100, createdAt: -21000 } ));
const expenseTwo = store.dispatch( addExpense( { description: 'Coffee', amount: 300, createdAt: -1000 } ));

// store.dispatch(removeExpense( { id: expenseOne.expense.id } ));

// store.dispatch( editExpense( expenseTwo.expense.id, { amount: 500 } ) );
// // console.log(expenseOne);

// store.dispatch(setTextFilter('rent'));  // should populate the text property
// store.dispatch(setTextFilter());        // should revert to rent: ''

store.dispatch(sortByAmount());

// store.dispatch(sortByDate());

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());

// store.dispatch(setEndDate(999));
// store.dispatch(setEndDate());


// -------------------------------------------------------------------------
//               E X A M P L E   D A T A   S T R U C T U R E
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

// example target state we are working towards
const demoState = {
    expenses: [
        {
            id: 'sadfsaredgfg',
            description: 'January Rent',
            note: 'This was the final payment for that address',
            amount: 54000,      // in pennies/cents
            createdAt: 0
        }
    ],
    filters: {
        text: 'rent',
        sortBy: 'amount',       // date or amount
        startDate: undefined,
        endDate: undefined
    }
};


// Object spread syntax, need to add a babel plugin for this 
// to work - babel-plugin-transform-object-rest-spread
// const user = {
//     name: 'james',
//     age: 62
// };

// console.log(( {
//     ...user,
//     location: 'Leeds',
//     age: 33                 // over-rides the origina property, most be post ...
// }))