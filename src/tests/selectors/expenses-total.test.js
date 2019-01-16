import expensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

// export default (expenses, { text, sortBy, startDate, endDate }) => {

describe('expensesTotal', () => {

    test('should return 0 if no expenses', () => {
        const total = expensesTotal([]);
        expect(total).toBe(0);
    });

    test('should return amount if only a single expense', () => {
        const total = expensesTotal( [ expenses[2] ] );
        expect(total).toBe(expenses[2].amount);
    });

    test('should add up multiple expenses correctly', () => {
        let sum = 0;
        for(let i = 0; i < expenses.length; i++) {
            sum += expenses[i].amount;
        }

        const total = expensesTotal( expenses );
        expect(total).toBe(sum);
    });

});