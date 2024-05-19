let expenses = [];
document.getElementById('expenseForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addExpense();
});
function addExpense() {
    let description = document.getElementById('description').value;
    let amount = parseFloat(document.getElementById('amount').value);
    let date = document.getElementById('date').value;
    if (!isNaN(amount)) {
        let expense = {
            description: description,
            amount: amount,
            date: date
        };
        expenses.push(expense);
        updateExpenseTable();
        calculateTotalExpenses();
        clearForm();
    } else {
        alert('Please enter a valid amount!');
    }
}
function removeExpense(index) {
    expenses.splice(index, 1);
    updateExpenseTable();
    calculateTotalExpenses();
}
function updateExpenseTable() {
    let expenseTable = document.getElementById('expenseTable').getElementsByTagName('tbody')[0];
    expenseTable.innerHTML = '';
    for (let i = 0; i < expenses.length; i++) {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${expenses[i].description}</td>
            <td>$${expenses[i].amount.toFixed(2)}</td>
            <td>${expenses[i].date}</td>
            <td><button onclick="removeExpense(${i})">Remove</button></td>
        `;
        expenseTable.appendChild(row);
    }
}
