# Лабораторная работа №4. Работа с DOM-деревом и событиями в JavaScript

## Цель работы
Ознакомить студентов с основами взаимодействия JS с DOM-деревом на основе веб-приложения для учета личных финансов.

## Ход работы
### Организация кода
---
**Модули:**
- **index.js**: Главный файл, который координирует работу всех модулей и обрабатывает события пользовательского интерфейса.
- **transactions.js**: Отвечает за хранение и управление транзакциями (добавление, удаление).
- **ui.js**: Содержит функции для отображения данных в интерфейсе (рендеринг таблицы, показ описания).
- **utils.js**: Предоставляет утилитарные функции (генерация ID, форматирование даты).


**Взаимодействие модулей:**
- **index.js** импортирует функции из других модулей **(transactions.js, ui.js, utils.js)** и использует их для обработки событий, таких как добавление или удаление транзакций.
- Модули взаимодействуют через экспортированные функции и данные (например, массив **transactions**).

**HTML и CSS:**
- HTML предоставляет структуру приложения, включая форму для добавления транзакций, таблицу для отображения данных и секцию для полного описания.
- CSS оформляет интерфейс, обеспечивая удобство использования и визуальную привлекательность.

**Запуск программы**
Для запуска программы было использовано расширение Visual Studio: Live Server.

### Код
---
**index.html**

Этот файл является основным HTML-документом, который определяет структуру приложения. Он содержит форму для добавления транзакций, таблицу для отображения данных и секцию для полного описания.

Реализация:
- Форма **(#transaction-form)** позволяет пользователю вводить описание, сумму и категорию транзакции. Все поля обязательны для заполнения (required).

```html
 <form id="transaction-form">
    <input type="text" id="description" placeholder="Описание" required>
    <input type="number" id="amount" placeholder="Сумма" required>
    <select id="category">
      <option value="Доход">Еда</option>
      <option value="Расход">Транспорт</option>
    </select>
    <button type="submit">Добавить</button>
  </form>
```

- Таблица **(#transaction-table)** используется для отображения списка транзакций. Она имеет заголовок с колонками: "Дата и Время", "Категория", "Описание" и "Действие".
```html
<table id="transaction-table" border="1">
    <thead>
      <tr>
        <th>Дата и Время</th>
        <th>Категория</th>
        <th>Описание</th>
        <th>Действие</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>
```
- Поле "Общая сумма" **(#total)** отображает текущий баланс на основе всех транзакций.
```html
<h3>Общая сумма: <span id="total">0</span> лей </h3>
```

- Подключается JavaScript через тег `<script type="module">`, что позволяет использовать модули.


**style.css**

CSS-файл отвечает за внешний вид приложения, включая стили для формы, таблицы, кнопок, текстовых элементов и цветовых акцентов. Реализация включает адаптивную верстку, эффекты наведения (hover) и выделение ключевых секций.

Реализация:
1. Основные стили страницы.
```css
/* Основной стиль страницы */
body {
  font-family: Arial, sans-serif;
  margin: 40px auto;
  max-width: 800px;
  background-color: #f9f9f9;
  color: #333;
}

/* Заголовок */
h1 {
  text-align: center;
  margin-bottom: 20px;
}
```
- Описание:
    - Используется шрифт Arial с максимальной шириной контента 800px.
    - Центрирование контента и светлый фон (#f9f9f9) создают чистый и минималистичный дизайн.
    - Заголовок выровнен по центру для лучшей визуальной организации.


2. Форма добавления транзакций
```css
/* Форма добавления */
form {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;
}

form input, form select, form button {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

form button {
  background-color: #1976d2;
  color: white;
  border: none;
  cursor: pointer;
}

form button:hover {
  background-color: #1565c0;
}
```
- Описание
    - Форма использует гибкую сетку (flex-wrap: wrap) для адаптивности.
    - Поля ввода и кнопки имеют одинаковый стиль с закругленными углами (border-radius: 6px).
    - Кнопки имеют эффект изменения цвета при наведении (hover), что улучшает пользовательский опыт.


3. Таблица транзакций
```css
/* Таблица транзакций */
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 15px;
  background-color: white;
  border: 1px solid #ddd;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

thead {
  background-color: #eeeeee;
  font-weight: bold;
}

/* Цвета строк */
.positive {
  background-color: #e8f5e9;
}

.negative {
  background-color: #ffebee;
}
```

3. Таблица транзакций

```css
/* Таблица транзакций */
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 15px;
  background-color: white;
  border: 1px solid #ddd;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

thead {
  background-color: #eeeeee;
  font-weight: bold;
}

/* Цвета строк */
.positive {
  background-color: #e8f5e9;
}

.negative {
  background-color: #ffebee;
}
```
- Описание:
    - Таблица занимает всю доступную ширину (width: 100%) с 
    разделяющими линиями между строками.
    - Заголовки таблицы выделены серым фоном (#eeeeee) для контраста.
    - Положительные и отрицательные транзакции выделены цветовыми акцентами:
положительные — зеленый фон (#e8f5e9) или
отрицательные — красный фон (#ffebee).

4. Кнопка удаления
```css
/* Кнопка удаления */
.delete-btn {
  background-color: #e53935;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #c62828;
}
```
- Описание:
    - Кнопка удаления имеет ярко-красный цвет (#e53935) для привлечения внимания.
    - При наведении цвет становится темнее (#c62828), что подчеркивает интерактивность.

5. Секция "Полное описание"
```css
/* Полное описание */
#full-description {
  font-style: italic;
  padding: 10px;
  background-color: #fffde7;
  border: 1px solid #fbc02d;
  border-radius: 6px;
}
```
- Описание:
    - Секция выделена желтым фоном (#fffde7) и границей (#fbc02d) для акцентирования внимания.
    - Текст в курсивном стиле (font-style: italic) подчеркивает информативность.

6. Общая сумма
```css
/* Общая сумма */
#total {
  font-weight: bold;
  font-size: 1.2em;
  color: #4caf50;
}
```
- Описание:
    - Общая сумма выделена жирным шрифтом и зеленым цветом (#4caf50) для акцента на финансовом результате.

**transactions.js**

Этот модуль управляет массивом транзакций, предоставляя функции для добавления и удаления транзакций.

Реализация:

- Экспортируется массив **transactions**, который хранит все транзакции.
```js
export const transactions = [];
```

- Функция **addTransaction** добавляет новую транзакцию в массив.
```javascript
export function addTransaction(transaction) {
  transactions.push(transaction);
}
```
- Функция **deleteTransaction** удаляет транзакцию по её уникальному ID, используя метод **findIndex** для поиска нужной записи.
```js
export function deleteTransaction(id) {
  const index = transactions.findIndex(t => t.id === id);
  if (index !== -1) transactions.splice(index, 1);
}
```

**utils.js**
Модуль предоставляет вспомогательные функции, которые используются для генерации уникальных идентификаторов и форматирования даты.

Реализация:
- Функция generateId генерирует уникальный идентификатор транзакции с использованием случайного числа. Идентификатор начинается с символа _ и содержит 9 символов из алфавитно-цифрового набора.
```js
export function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}
```

- Функция formatDate возвращает текущую дату и время в удобном для чтения формате. Используется метод toLocaleString() для локализованного форматирования даты и времени.
```js
export function formatDate() {
  return new Date().toLocaleString();
}
```

**ui.js**

Модуль отвечает за отображение данных в интерфейсе, включая рендеринг таблицы и показ полного описания транзакции.

Реализация:

- Функция **renderTable** очищает текущее содержимое таблицы и перерисовывает её на основе массива transactions. Каждая строка получает класс **positive** или **negative** в зависимости от суммы транзакции.
```js
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
```

- Функция **showFullDescription** обновляет содержимое секции **#full-description**, показывая полное описание выбранной транзакции.
```js
export function showFullDescription(fullDescription) {
  document.getElementById('full-description').textContent = fullDescription;
}
```

**index.js**

Главный модуль, который связывает все остальные модули. Обрабатывает события пользовательского интерфейса и управляет логикой приложения.
 
Реализация:
- Импортируются все необходимые функции из остальных модулей.
```js
import { generateId, formatDate } from "./utils.js";
import { transactions, addTransaction, deleteTransaction } from "./transactions.js";;
import { renderTable, showFullDescription } from "./ui.js";
```

- Функция **calculateTotal** пересчитывает общую сумму всех транзакций и обновляет значение в интерфейсе.
```js
function calculateTotal() {
  const total = transactions.reduce((sum, tr) => sum + tr.amount, 0);
  document.getElementById('total').textContent = total.toFixed(2);
}
```

- Обработчик события submit для формы добавляет новую транзакцию, вызывая функции **generateId**, **formatDate**, **addTransaction**, **renderTable** и **calculateTotal**.
```js
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
```

- Обработчик события **click** для таблицы удаляет транзакцию при нажатии на кнопку "Удалить" или показывает полное описание при клике на строку.
```js
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
```

### Документация
---
Код задокументирован по стандарту JSDoc для того, чтоб другой разработчик мог понять работу функций и кода в принципе.

### Контрольные вопросы
---
1. Каким образом можно получить доступ к элементу на веб-странице с помощью JavaScript?
---
Для олучения доступа к элементам DOM в JavaScript используются следующие методы:

- **document.getElementById(id)**: Возвращает элемент по его уникальному идентификатору (id).

- **document.querySelector(selector)**:
Возвращает первый элемент, соответствующий указанному CSS-селектору.

- **document.querySelectorAll(selector)**:
Возвращает NodeList всех элементов, соответствующих указанному CSS-селектору.

- **document.getElementsByTagName(tagName)**:
Возвращает HTMLCollection элементов с указанным тегом.

2.  Что такое делегирование событий и как оно используется для эффективного управления событиями на элементах DOM?
---
Делегирование событий — это техника, при которой обработчик события добавляется не к каждому элементу индивидуально, а к их общему родительскому элементу. Это позволяет эффективно управлять событиями для большого количества динамически создаваемых или изменяемых элементов. События "всплывают" от целевого элемента к его родителям. Обработчик на родительском элементе проверяет, какой именно дочерний элемент вызвал событие, используя свойство **event.target**.

3. Как можно изменить содержимое элемента DOM с помощью JavaScript после его выборки?
---
Содержимое элемента DOM можно изменить несколькими способами:
- Используя свойство **textContent** для изменения текстового содержимого.

- Используя свойство **innerHTML** для изменения содержимого HTML-документа.

- Используя методы **setAttribute** или напрямую обращайтесь к свойствам элемента.

- Используя свойство **style** изменять стили документа.

4. Как можно добавить новый элемент в DOM дерево с помощью JavaScript?
---
Новый элемент добавляется в DOM через **createElement**, настройку его свойств и использование методов например **appendChild** или **insertBefore**.

## Вывод:
В ходе работы был разработан модульный проект для учета транзакций с четким разделением функционала между файлами. Были использованы современные подходы JavaScript: ES6-модули,делегирование событий и работа с DOM что позволило создать удобное и масштабируемое приложение для добавления удаления и отображения транзакций с подсчетом общей суммы.
