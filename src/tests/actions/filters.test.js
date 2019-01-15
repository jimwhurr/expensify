import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../../actions/filters.js';
import moment from 'moment';

// SET_TEXT_FILTER
// export const setTextFilter = ( text = '' ) => ({
describe('setTextFilter', () => {

    test('should setup the text filter action object', () => {
        const text = 'Water';
        const action = setTextFilter( text );

        expect(action).toEqual( {
            type: 'SET_TEXT_FILTER',
            text
        } );
    });

    test('should setup the text filter action object with defaults', () => {
        const action = setTextFilter(  );

        expect(action).toEqual( {
            type: 'SET_TEXT_FILTER',
            text: ''
        } );
    });

});


// SORT_BY_AMOUNT
// export const sortByAmount = () => ({
describe('sortByAmount', () => {

    test('should setup the sortByAmount sort filter action object', () => {
        const action = sortByAmount();
        expect(action).toEqual( {
            type: 'SORT_BY_AMOUNT'
        } );
    });
});
    
// SORT_BY_DATE
// export const sortByDate = () => ({
describe('sortByDate', () => {

    test('should setup the sortByDate filter action object', () => {
        const action = sortByDate();
        expect(action).toEqual( {
            type: 'SORT_BY_DATE'
        } );
    });
});
    
// SET_START_DATE
// export const setStartDate = (startDate) => ({
describe('setStartDate', () => {

    test('should setup the setStartDate action object', () => {
        const action = setStartDate( moment(0) );
        expect(action).toEqual( {
            type: 'SET_START_DATE',
            startDate: moment(0)
        } );
    });
});
    
// SET_END_DATE
// export const setEndDate = (endDate) => ({
describe('setEndDate', () => {

    test('should setup the setEndDate action object', () => {
        const action = setEndDate( moment(0) );
        expect(action).toEqual( {
            type: 'SET_END_DATE',
            endDate: moment(0)
        } );
    });
});
    