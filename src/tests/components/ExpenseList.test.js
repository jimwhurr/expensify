import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseList } from '../../components/ExpenseList';
import expenses from '../fixtures/expenses';

describe('ExpenseList', () => {

    test('should render expense list with given expenses', () => {
        const wrapper = shallow(<ExpenseList expenses={expenses} />);
        expect(wrapper).toMatchSnapshot();
    });

    test('should render a message if the expense list is empty', () => {
        const wrapper = shallow(<ExpenseList expenses={[]} />);
        expect(wrapper).toMatchSnapshot();
    });

});

