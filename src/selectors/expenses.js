import moment from 'moment';

// -------------------------------------------------------------------------
//                G E T   V I S I B L E   E X P E N S E S
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

export default (expenses, { text, sortBy, startDate, endDate }) => {
    // console.log('params: {', text, sortBy, startDate, endDate, '}');
    return expenses.filter((expense) => {

        const createdAtMoment = moment(expense.createdAt);
        const startDateMatch = startDate ?  startDate.isSameOrBefore(createdAtMoment, 'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day'): true;
        
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;

    }).sort( (a, b) => {
        if (sortBy === 'date') {
            return (a.createdAt < b.createdAt) ? 1 : -1;
        }
        else if (sortBy === 'amount') {
            // console.log('a: ', a, ' b: ', b, a < b);
            return (a.amount < b.amount) ? 1 : -1;
        }
    });
};