import React from 'react';
import { shallow } from 'enzyme';
import ExpenseListItem from '../../components/ExpenseListItem';
import expenses from '../fixtures/expenses';

// <ExpenseListItem key={expense.id} {...expense} />            

describe('ExpenseListItemu', () => {

    test('should render expense list with given expenses', () => {
        const expense = expenses[0];
        const wrapper = shallow(<ExpenseListItem {...expense} />);
        expect(wrapper).toMatchSnapshot();
    });
});