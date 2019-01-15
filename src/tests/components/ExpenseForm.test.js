import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

describe('ExpenseForm', () => {

    test('should render expense form', () => {
        const wrapper = shallow(<ExpenseForm />);
        expect(wrapper).toMatchSnapshot();
    });

    test('should render the form with expense data', () => {
        const wrapper = shallow(<ExpenseForm expense={expenses[2]}/>);
        expect(wrapper).toMatchSnapshot();
    });

    test('should render error for invalid form submission', () => {
        const wrapper = shallow(<ExpenseForm />);
        expect(wrapper).toMatchSnapshot();
        wrapper.find('form').simulate('submit', {
            preventDefault: () => {}
        });    // simulate with enzyme
        // now use enzyme method 'state' to get state of a component
        expect(wrapper.state('error').length).toBeGreaterThan(0);
        expect(wrapper).toMatchSnapshot();
    });

    test('should set description on input change', () => {
        const value = 'New description';
        const wrapper = shallow(<ExpenseForm />);
        wrapper.find('input').at(0).simulate('change', {
            target: { value }
        });
        expect(wrapper.state('description')).toBe(value);
    });

    test('should set not to new text', () => {
        const value = 'This is tthe new note!';
        const wrapper = shallow(<ExpenseForm />);
        wrapper.find('textarea').simulate('change', {
            target: { value }
        });
        expect(wrapper.state('note')).toBe(value);
    });

    test('should set amount equal to valid input (##,###.##)', () => {
        const value = '23.50';
        const wrapper = shallow(<ExpenseForm />);
        wrapper.find('input').at(1).simulate('change', {
            target: { value }
        });
        expect(wrapper.state('amount')).toBe(value);
    });

    test('should not set amount if not a valid input', () => {
        const value = '12.122';
        const wrapper = shallow(<ExpenseForm />);
        wrapper.find('input').at(1).simulate('change', {
            target: { value }
        });
        expect(wrapper.state('amount').length).toBe(0);
    });

    test('should call onSubmit prop for valid form submission', () => {
        const onSubmitSpy = jest.fn();
        const wrapper = shallow(<ExpenseForm expense={ expenses[0] } onSubmit={ onSubmitSpy }/>);
        wrapper.find('form').simulate('submit', {
            preventDefault: () => {}
        });    // simulate with enzyme
        expect(wrapper.state('error').length).toBe(0);
        expect(onSubmitSpy).toHaveBeenLastCalledWith({
            description: expenses[0].description,
            note: expenses[0].note,
            amount: expenses[0].amount,
            createdAt: expenses[0].createdAt
        });
    });

    test('should set new date on a change of the create date', () => {
        const now = moment();
        const wrapper = shallow(<ExpenseForm />);
        // need to find a prop of SingleDatePicker, use: .prop(key)
        wrapper.find('SingleDatePicker').prop('onDateChange')(now);
        expect(wrapper.state('createdAt')).toEqual(now);
    });

    test('should set the focus on to the date picker', () => {
        const focused = true;
        const wrapper = shallow(<ExpenseForm />);
        // need to find a prop of SingleDatePicker, use: .prop(key)
        wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });
        expect(wrapper.state('calendarFocused')).toBe(true);
    });

});