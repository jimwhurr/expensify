import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';


let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach( () => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();

    wrapper = shallow(<ExpenseListFilters 
        filters={filters}
        setTextFilter={setTextFilter}
        sortByDate={sortByDate}
        sortByAmount={sortByAmount}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
    />);
});

describe('ExpenseListFilters', () => {

    test('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('should render correctly with alt data', () => {
        // enzyme allows us to change the prop values using setProps....
        wrapper.setProps({
            filters: altFilters
        });
        expect(wrapper).toMatchSnapshot();
    });

    test('should handle text change', () => {
        const value = 'Phone';
        wrapper.find('input').at(0).simulate('change', {
            target: { value }
        });
        expect(setTextFilter).toHaveBeenLastCalledWith(value)
    });

    test('should sort by date', () => {
        const value = 'date';
        wrapper.setProps({
            filters: altFilters
        });
        wrapper.find('select').at(0).simulate('change', {
            target: { value }
        });
        expect(sortByDate).toHaveBeenCalled();

    });

    test('should sort by amount', () => {
        const value = 'amount';
        wrapper.find('select').at(0).simulate('change', {
            target: { value }
        });
        expect(sortByAmount).toHaveBeenCalled();
    });

    test('should handle date changes', () => {
        const startDate = moment(0).add(4, 'years');
        const endDate = moment(0).add(8, 'years');
        // babel-7 had to use find('withStyles(DateRangePicker)') instead of find('DateRangePicker')
        wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({ startDate, endDate });
        expect(setStartDate).toHaveBeenLastCalledWith(startDate);
        expect(setEndDate).toHaveBeenLastCalledWith(endDate);
    });

    test('should handle date focus changes', () => {
        const calendarFocused = 'endDate';
        // babel-7 had to use find('withStyles(DateRangePicker)') instead of find('DateRangePicker')
        wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(calendarFocused);
        expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
    });

});
