import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';

describe('ExpenseSummary', () => {

    test('should render expense summary for a single expense', () => {
        const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={195} />);
        expect(wrapper).toMatchSnapshot();
    });

    test('should render expense summary for multiple expenses', () => {
        const wrapper = shallow(<ExpensesSummary expenseCount={3} expensesTotal={156812} />);
        expect(wrapper).toMatchSnapshot();
    });
});