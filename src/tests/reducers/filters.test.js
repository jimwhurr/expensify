import moment from 'moment';
import filtersReducer from '../../reducers/filters';

describe('filtersReducer', () => {

    test('should setup default filter values', () => {
        // we can call the redux internla action '@@INIT' to do this
        const state = filtersReducer(undefined, { type: '@@INIT' });

        expect(state).toEqual({
            text: '',
            sortBy: 'date',
            startDate: moment().startOf('month'),
            endDate: moment().endOf('month')        
        });
    });


    test('should set sortBy to amount', () => {
        const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });

        expect(state).toEqual({
            text: '',
            sortBy: 'amount',
            startDate: moment().startOf('month'),
            endDate: moment().endOf('month')
        });        
    });

    test('should set sortBy to date', () => {
        const currentState = {
            text: '',
            startDate: undefined,
            endDate: undefined,
            sortBy: 'amount'
        };

        const action = { type: 'SORT_BY_DATE' }
        const state = filtersReducer(currentState, action);
        
        expect(state.sortBy).toBe('date');        
    });

    test('should set text filter', () => {
        const value = 'Rent';
        const state = filtersReducer(undefined, { type: 'SET_TEXT_FILTER', text: value });
        
        expect(state).toEqual({
            text: value,
            sortBy: 'date',
            startDate: moment().startOf('month'),
            endDate: moment().endOf('month')
        });        
    });

    test('should set the start date filter', () => {
        const date = moment().startOf('month').add(3, 'days');
        const state = filtersReducer(undefined, { type: 'SET_START_DATE', startDate: date });
        
        expect(state).toEqual({
            text: '',
            sortBy: 'date',
            startDate: date,
            endDate: moment().endOf('month')
        });        
    });

    test('should set the end date filter', () => {
        const date = moment().endOf('month').subtract(3, 'days');
        const state = filtersReducer(undefined, { type: 'SET_END_DATE', endDate: date });
        
        expect(state).toEqual({
            text: '',
            sortBy: 'date',
            startDate: moment().startOf('month'),
            endDate: date
        });        
    });

});