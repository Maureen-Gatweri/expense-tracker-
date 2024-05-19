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

function calculateTotalExpenses() {
    let totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    document.getElementById('totalExpenses').textContent = totalExpenses.toFixed(2);
}
function filterExpenses() {
    let startDate = document.getElementById('startDate').value;
    let endDate = document.getElementById('endDate').value;
    let filteredExpenses = expenses.filter(expense => {
        let expenseDate = new Date(expense.date);
        let start = new Date(startDate);
        let end = new Date(endDate);
        return expenseDate >= start && expenseDate <= end;
    });
    let expenseTable = document.getElementById('expenseTable').getElementsByTagName('tbody')[0];
    expenseTable.innerHTML = '';
    for (let i = 0; i < filteredExpenses.length; i++) {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${filteredExpenses[i].description}</td>
            <td>$${filteredExpenses[i].amount.toFixed(2)}</td>
            <td>${filteredExpenses[i].date}</td>
            <td><button onclick="removeExpense(${expenses.indexOf(filteredExpenses[i])})">Remove</button></td>
        `;
        expenseTable.appendChild(row);
    }
    calculateTotalExpenses();
}
function clearForm() {
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('date').value = '';
}












