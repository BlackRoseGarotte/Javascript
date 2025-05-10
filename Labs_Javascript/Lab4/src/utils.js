/**
 * Генерирует уникальный ID
 * @returns {string}
 */
export function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Возвращает текущую дату и время в виде строки
 * @returns {string}
 */
export function formatDate() {
  return new Date().toLocaleString();
}
