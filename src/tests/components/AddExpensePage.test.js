import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

let addExpense, history, wrapper;

beforeEach(() => {
    addExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<AddExpensePage addExpense={addExpense} history={history}/>);
});

describe('AddExpensePage', () => {

    test('should render correctly', () => {
        //  These vvvvv replaced by running beforeEach()
        // const onSubmit = jest.fn();
        // const history = { push: jest.fn() };
        // const wrapper = shallow(<AddExpensePage onSubmit={onSubmit} history={history}/>);
        expect(wrapper).toMatchSnapshot();
    });


    test('should handle onSubmit', () => {
        // beforeEach sets up our test
        // call the ExpenseForm onSubmit spy
        wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
        expect(history.push).toHaveBeenLastCalledWith('/');
        expect(addExpense).toHaveBeenLastCalledWith(expenses[1]);
    });
});