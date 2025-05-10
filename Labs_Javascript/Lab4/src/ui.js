import { deleteTransaction, transactions } from "./transactions.js";


/**
 * Отображает транзакции в таблице
 */
export function renderTable() {
  const tbody = document.querySelector('#transaction-table tbody');
  tbody.innerHTML = '';

  transactions.forEach(tr => {
    const row = document.createElement('tr');
    row.className = tr.amount >= 0 ? 'positive' : 'negative';
    row.dataset.id = tr.id;

    row.innerHTML = `
      <td>${tr.date}</td>
      <td>${tr.category}</td>
      <td>${tr.description.split(' ').slice(0, 4).join(' ')}</td>
      <td><button class="delete-btn">Удалить</button></td>
    `;

    tbody.appendChild(row);
  });
}

/**
 * Показывает полное описание транзакции
 * @param {string} fullDescription
 */
export function showFullDescription(fullDescription) {
  document.getElementById('full-description').textContent = fullDescription;
}
