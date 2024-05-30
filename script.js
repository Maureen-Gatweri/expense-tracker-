const expenseForm = document.getElementById('expense-form');
const expenseTable = document.getElementById('expense-table');
const totalAmountElement = document.getElementById('total-amount');
const startDateInput = document.getElementById('start-date');
const endDateInput = document.getElementById('end-date');
const filterBtn = document.getElementById('filter-btn');

let expenses = [];

function addExpense(description, amount, date) {
  const expense = { description, amount, date };
  expenses.push(expense);
  displayExpenses();
  calculateTotalExpenses();
}

function displayExpenses() {
  expenseTable.getElementsByTagName('tbody')[0].innerHTML = '';

  expenses.forEach((expense, index) => {
    const row = document.createElement('tr');

    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = expense.description;
    row.appendChild(descriptionCell);

    const amountCell = document.createElement('td');
    amountCell.textContent = `Kshs.${expense.amount.toFixed(2)}`;
    row.appendChild(amountCell);

    const dateCell = document.createElement('td');
    dateCell.textContent = new Date(expense.date).toLocaleDateString();
    row.appendChild(dateCell);

    const actionsCell = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editExpense(index));
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteExpense(index));
    actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);
    row.appendChild(actionsCell);

    expenseTable.getElementsByTagName('tbody')[0].appendChild(row);
  });
}

function calculateTotalExpenses() {
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  totalAmountElement.textContent = `Kshs.${totalExpenses.toFixed(2)}`;
}

function editExpense(index) {
  const expense = expenses[index];
  const description = prompt('Edit expense description:', expense.description);
  const amount = parseFloat(prompt('Edit expense amount:', expense.amount));
  const date = prompt('Edit expense date (YYYY-MM-DD):', new Date(expense.date).toISOString().slice(0, 10));

  if (description && !isNaN(amount) && date) {
    expense.description = description;
    expense.amount = amount;
    expense.date = new Date(date).toISOString();
    displayExpenses();
    calculateTotalExpenses();
  }
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  displayExpenses();
  calculateTotalExpenses();
}

function filterExpenses() {
  const startDate = new Date(startDateInput.value);
  const endDate = new Date(endDateInput.value);

  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= startDate && expenseDate <= endDate;
  });

  expenses = filteredExpenses;
  displayExpenses();
  calculateTotalExpenses();
}

expenseForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const date = document.getElementById('date').value;

  if (description && !isNaN(amount) && date) {
    addExpense(description, amount, new Date(date).toISOString());
    expenseForm.reset();
  }
});

filterBtn.addEventListener('click', filterExpenses);
