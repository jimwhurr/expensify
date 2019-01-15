import { createStore } from 'redux';

// Action Generators:
//  Functions that return action objects.



// const add = ( { a, b } ) => {       // destructure the input
//     return a + b;
// }
// console.log(add({ a: 1, b: 12}))


const incrementCount = ( {incrementBy = 1} = {} ) => ({
    type: 'INCREMENT',
    incrementBy                         // using destructuring, default val and E6 object syntax
});

const decrementCount = ( {decrementBy = 1} = {} ) => ({
    type: 'DECREMENT',
    decrementBy
});

const resetCount = () => ({
    type: 'RESET'
});

const setCount = ( { count } ) => ({
    type: 'SET',
    count
});

// -------------------------------------------------------------------------
//        T H I S   F U N C T I O N   I S   A   ' R E D U C E R '
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

// Reducers:
//  1. are pure functions (o/p only determined by i/p)
//  2. never change state or action (DO return the new state)

const countReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {count: state.count + action.incrementBy};

        case 'DECREMENT':
            return {count: state.count - action.decrementBy};

        case 'RESET':       return {count: 0};

        case 'SET':         return{count: action.count};

        default: return state;
    }
};


const store = createStore( countReducer );


// subscribe is used to watch for changes in the store state. It is passed a function
// that will be called WHENEVER the state is changed.
const unsubscribe = store.subscribe( () => {
    console.log(store.getState());
});

// subscribe returns a function to call if you want to UNSUBSCRIBE!

// add properties to the dispatched object to allow for more functionality
// store.dispatch({
//     type: 'INCREMENT',
//     incrementBy: 5
// });

store.dispatch(incrementCount( { incrementBy: 5 } ));

store.dispatch(incrementCount());

store.dispatch(resetCount());

store.dispatch(decrementCount());

store.dispatch(decrementCount( { decrementBy: 10 } ));

store.dispatch(setCount( { count: 101 } ));

// console.log(store.getState());