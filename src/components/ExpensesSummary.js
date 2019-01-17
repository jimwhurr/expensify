import React from 'react';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import getExpenseTotal from "../selectors/expenses-total";
import numeral from 'numeral';
import 'numeral/locales/en-gb';

numeral.locale('en-gb');

export const ExpensesSummary = ( { expenseCount, expensesTotal }) => {
    const term = expenseCount === 1 ? 'expense' : 'expenses' ;
    const formattedTotal = numeral(expensesTotal / 100).format('$0,0.00');

    return (
        <div>
            <p>Viewing {expenseCount} {term} totalling {formattedTotal}</p>
        </div>
    );
}

const mapStateToProps = (state) => {
    const visibleExpenses = selectExpenses(state.expenses, state.filters);

    return {
        expenseCount: visibleExpenses.length,
        expensesTotal: getExpenseTotal(visibleExpenses)
    };
};

export default connect(mapStateToProps)(ExpensesSummary);