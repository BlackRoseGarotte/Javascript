import { generateId, formatDate } from "./utils.js";
import { transactions, addTransaction, deleteTransaction } from "./transactions.js";;
import { renderTable, showFullDescription } from "./ui.js";

/**
 * Пересчитывает и отображает сумму всех транзакций
 */
function calculateTotal() {
  const total = transactions.reduce((sum, tr) => sum + tr.amount, 0);
  document.getElementById('total').textContent = total.toFixed(2);
}

document.getElementById('transaction-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const description = document.getElementById('description').value.trim();
  const amount = parseFloat(document.getElementById('amount').value);
  const category = document.getElementById('category').value;

  if (!description || isNaN(amount)) {
    alert('Пожалуйста, заполните все поля корректно!');
    return;
  }

  const newTransaction = {
    id: generateId(),
    date: formatDate(),
    amount,
    category,
    description
  };

  addTransaction(newTransaction);
  renderTable();
  calculateTotal();
  e.target.reset();
});

document.getElementById('transaction-table').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const id = e.target.closest('tr').dataset.id;
    deleteTransaction(id);
    renderTable();
    calculateTotal();
  } else if (e.target.tagName === 'TD' && e.target.parentElement.dataset.id) {
    const id = e.target.parentElement.dataset.id;
    const tr = transactions.find(t => t.id === id);
    showFullDescription(tr.description);
  }
});
