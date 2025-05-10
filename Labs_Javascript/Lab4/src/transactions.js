export const transactions = [];

/**
 * Добавляет транзакцию
 * @param {Object} transaction
 */
export function addTransaction(transaction) {
  transactions.push(transaction);
}

/**
 * Удаляет транзакцию по ID
 * @param {string} id
 */
export function deleteTransaction(id) {
  const index = transactions.findIndex(t => t.id === id);
  if (index !== -1) transactions.splice(index, 1);
}
