
// -------------------------------------------------------------------------
//         G E T   T O T A L   O F   V I S I B L E   E X P E N S E S
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

export default (expenses) => {
    return expenses
        .map((expense) => expense.amount)
        .reduce( (total, amount) => total + amount, 0);
};