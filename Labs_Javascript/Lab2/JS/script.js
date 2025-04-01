const transactions = [
  {
    transaction_id: "t1",
    transaction_date: "2023-10-01",
    transaction_amount: 150,
    transaction_type: "debit",
    transaction_description: "Покупка продуктов",
    merchant_name: "Магазин Продуктов",
    card_type: "credit",
  },
  {
    transaction_id: "t2",
    transaction_date: "2023-10-02",
    transaction_amount: 200,
    transaction_type: "credit",
    transaction_description: "Возврат средств",
    merchant_name: "Сервис Возвратов",
    card_type: "debit",
  }, {
    transaction_id: "t3",
    transaction_date: "2023-10-03",
    transaction_amount: 50,
    transaction_type: "debit",
    transaction_description: "Оплата услуг",
    merchant_name: "Услуги Онлайн",
    card_type: "debit",
  },
  
];

/**
 * Возвращает массив уникальных типов транзакций.
 * @param {Object[]} transactions - Массив транзакций.
 * @returns {string[]} Массив уникальных типов транзакций.
 */
function getUniqueTransactionTypes(transactions) {
  const uniqueTypes = new Set(transactions.map((t) => t.transaction_type));
  return Array.from(uniqueTypes);
}

/**
 * Вычисляет сумму всех транзакций.
 * @param {Object[]} transactions - Массив транзакций.
 * @returns {number} Общая сумма всех транзакций.
 */
function calculateTotalAmount(transactions) {
  return transactions.reduce((total, t) => total + t.transaction_amount, 0);
}

/**
 * Вычисляет общую сумму транзакций за указанный период.
 * @param {Object[]} transactions - Массив транзакций.
 * @param {number} [year] - Год (необязательно).
 * @param {number} [month] - Месяц (необязательно).
 * @param {number} [day] - День (необязательно).
 * @returns {number} Сумма транзакций за указанный период.
 */
function calculateTotalAmountByDate(transactions, year, month, day) {
  return transactions
    .filter((t) => {
      const date = new Date(t.transaction_date);
      if (year !== undefined && date.getFullYear() !== year) return false;
      if (month !== undefined && date.getMonth() + 1 !== month) return false;
      if (day !== undefined && date.getDate() !== day) return false;
      return true;
    })
    .reduce((total, t) => total + t.transaction_amount, 0);
}

/**
 * Возвращает транзакции указанного типа.
 * @param {Object[]} transactions - Массив транзакций.
 * @param {string} type - Тип транзакции ("debit" или "credit").
 * @returns {Object[]} Массив транзакций указанного типа.
 */
function getTransactionByType(transactions, type) {
  return transactions.filter((t) => t.transaction_type === type);
}

/**
 * Возвращает массив транзакций, проведенных в указанном диапазоне дат.
 * @param {Object[]} transactions - Массив транзакций.
 * @param {string} startDate - Начальная дата (в формате YYYY-MM-DD).
 * @param {string} endDate - Конечная дата (в формате YYYY-MM-DD).
 * @returns {Object[]} Массив транзакций в диапазоне дат.
 */
function getTransactionsInDateRange(transactions, startDate, endDate) {
  return transactions.filter(
    (t) =>
      new Date(t.transaction_date) >= new Date(startDate) &&
      new Date(t.transaction_date) <= new Date(endDate)
  );
}

/**
 * Возвращает массив транзакций, совершенных с указанным merchantName.
 * @param {Object[]} transactions - Массив транзакций.
 * @param {string} merchantName - Название магазина или сервиса.
 * @returns {Object[]} Массив транзакций с указанным merchantName.
 */
function getTransactionsByMerchant(transactions, merchantName) {
  return transactions.filter((t) => t.merchant_name === merchantName);
}

/**
 * Возвращает среднее значение транзакций.
 * @param {Object[]} transactions - Массив транзакций.
 * @returns {number} Среднее значение транзакций.
 */
function calculateAverageTransactionAmount(transactions) {
  if (transactions.length === 0) return 0;
  const totalAmount = calculateTotalAmount(transactions);
  return totalAmount / transactions.length;
}

/**
 * Возвращает массив транзакций с суммой в заданном диапазоне.
 * @param {Object[]} transactions - Массив транзакций.
 * @param {number} minAmount - Минимальная сумма.
 * @param {number} maxAmount - Максимальная сумма.
 * @returns {Object[]} Массив транзакций в диапазоне сумм.
 */
function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
  return transactions.filter(
    (t) => t.transaction_amount >= minAmount && t.transaction_amount <= maxAmount
  );
}

/**
 * Вычисляет общую сумму дебетовых транзакций.
 * @param {Object[]} transactions - Массив транзакций.
 * @returns {number} Общая сумма дебетовых транзакций.
 */
function calculateTotalDebitAmount(transactions) {
  return getTransactionByType(transactions, "debit").reduce(
    (total, t) => total + t.transaction_amount,
    0
  );
}

/**
 * Возвращает месяц, в котором было больше всего транзакций.
 * @param {Object[]} transactions - Массив транзакций.
 * @returns {number|null} Номер месяца (1-12) или null, если массив пуст.
 */
function findMostTransactionsMonth(transactions) {
  if (transactions.length === 0) return null;

  const monthCounts = {};
  transactions.forEach((t) => {
    const date = new Date(t.transaction_date);
    const month = date.getMonth() + 1;
    monthCounts[month] = (monthCounts[month] || 0) + 1;
  });

  let mostTransactionsMonth = null;
  let maxCount = 0;
  for (const [month, count] of Object.entries(monthCounts)) {
    if (count > maxCount) {
      mostTransactionsMonth = month;
      maxCount = count;
    }
  }

  return mostTransactionsMonth;
}

/**
 * Возвращает месяц, в котором было больше дебетовых транзакций.
 * @param {Object[]} transactions - Массив транзакций.
 * @returns {number|null} Номер месяца (1-12) или null, если массив пуст.
 */
function findMostDebitTransactionMonth(transactions) {
  const debitTransactions = getTransactionByType(transactions, "debit");
  return findMostTransactionsMonth(debitTransactions);
}

/**
 * Возвращает тип транзакций, которых больше всего.
 * @param {Object[]} transactions - Массив транзакций.
 * @returns {string} "debit", "credit" или "equal".
 */
function mostTransactionTypes(transactions) {
  const debitCount = getTransactionByType(transactions, "debit").length;
  const creditCount = getTransactionByType(transactions, "credit").length;

  if (debitCount > creditCount) return "debit";
  if (creditCount > debitCount) return "credit";
  return "equal";
}

/**
 * Возвращает массив транзакций, совершенных до указанной даты.
 * @param {Object[]} transactions - Массив транзакций.
 * @param {string} date - Дата в формате YYYY-MM-DD.
 * @returns {Object[]} Массив транзакций до указанной даты.
 */
function getTransactionsBeforeDate(transactions, date) {
  return transactions.filter(
    (t) => new Date(t.transaction_date) < new Date(date)
  );
}

/**
 * Возвращает транзакцию по её уникальному идентификатору.
 * @param {Object[]} transactions - Массив транзакций.
 * @param {string} id - Уникальный идентификатор транзакции.
 * @returns {Object|null} Транзакция или null, если не найдена.
 */
function findTransactionById(transactions, id) {
  return transactions.find((t) => t.transaction_id === id) || null;
}

/**
 * Возвращает новый массив, содержащий только описания транзакций.
 * @param {Object[]} transactions - Массив транзакций.
 * @returns {string[]} Массив описаний транзакций.
 */
function mapTransactionDescriptions(transactions) {
  return transactions.map((t) => t.transaction_description);
}

console.log("Уникальные типы транзакций:", getUniqueTransactionTypes(transactions)); // ["debit", "credit"]
console.log("Общая сумма транзакций:", calculateTotalAmount(transactions)); // 400
console.log("Транзакции типа 'debit':", getTransactionByType(transactions, "debit")); // [{...}, {...}]
console.log("Транзакции в диапазоне дат:", getTransactionsInDateRange(transactions, "2023-10-01", "2023-10-02")); // [{...}, {...}]
console.log("Транзакции по магазину 'Магазин Продуктов':", getTransactionsByMerchant(transactions, "Магазин Продуктов")); // [{...}]
console.log("Среднее значение транзакций:", calculateAverageTransactionAmount(transactions)); // 133.33...
console.log("Транзакции в диапазоне сумм:", getTransactionsByAmountRange(transactions, 50, 200)); // [{...}, {...}, {...}]
console.log("Общая сумма дебетовых транзакций:", calculateTotalDebitAmount(transactions)); // 200
console.log("Месяц с наибольшим количеством транзакций:", findMostTransactionsMonth(transactions)); // 10
console.log("Месяц с наибольшим количеством дебетовых транзакций:", findMostDebitTransactionMonth(transactions)); // 10
console.log("Каких транзакций больше:", mostTransactionTypes(transactions)); // "equal"
console.log("Транзакции до указанной даты:", getTransactionsBeforeDate(transactions, "2023-10-02")); // [{...}]
console.log("Транзакция по ID 't2':", findTransactionById(transactions, "t2")); // {...}
console.log("Описания транзакций:", mapTransactionDescriptions(transactions)); // ["Покупка продуктов", "Возврат средств", "Оплата услуг"]

// Тестирование на пустом массиве
console.log("Тест для пустого массива:");
console.log("Уникальные типы транзакций:", getUniqueTransactionTypes([])); // []
console.log("Общая сумма транзакций:", calculateTotalAmount([])); // 0
console.log("Среднее значение транзакций:", calculateAverageTransactionAmount([])); // 0