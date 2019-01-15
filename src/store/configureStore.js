import { createStore, combineReducers } from 'redux';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';


// -------------------------------------------------------------------------
//                      S T O R E   C R E A T I O N
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

export default () => {
    
    const store = createStore(
        combineReducers({                   // adds properties to the store root object
            expenses: expensesReducer,      // now we get our { expenses: [] }
            filters: filtersReducer         // should now complete our data structure
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    
    return store;
};
