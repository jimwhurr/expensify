// -------------------------------------------------------------------------
//                     E X P E N S E S   R E D U C E R
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

const expensesReducerDefaultState = [];
export default (state = expensesReducerDefaultState, action) => {
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

        case 'SET_EXPENSES':
            return action.expenses;
            
        default:
            return state;
    }
};
