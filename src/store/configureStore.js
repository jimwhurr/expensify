import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';

// -------------------------------------------------------------------------
//                      S T O R E   C R E A T I O N
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

// to enable thunk middlware whilst using DEVTOOLS || use default
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    
    const store = createStore(
        combineReducers({                   // adds properties to the store root object
            expenses: expensesReducer,      // now we get our { expenses: [] }
            filters: filtersReducer,        // should now complete our data structure
            auth: authReducer
        }),
        // applyMiddleware(thunk)           // can't use this yet as need DEVTOOLS
        composeEnhancers(applyMiddleware(thunk))
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    
    return store;
};
