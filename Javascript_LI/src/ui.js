/**
 * @typedef {import("./app.js").RoundHistory} RoundHistory // Импорт типа из другого модуля
 */

/**
 * Обновляет текстовое отображение счета и результата раунда.
 * @param {HTMLElement} scoreElement - Элемент для отображения счета.
 * @param {HTMLElement} resultElement - Элемент для отображения результата раунда.
 * @param {{player: number, computer: number}} scores - Объект с текущим счетом.
 * @param {RoundHistory} [lastRoundData] - Объект с данными последнего раунда (необязательно).
 */
export function updateGameUI(scoreElement, resultElement, scores, lastRoundData) {
    scoreElement.textContent = `Счет: ${scores.player} - ${scores.computer}`;

    if (lastRoundData) {
        let resultText = `Раунд ${lastRoundData.round}: Вы выбрали ${choiceToText(lastRoundData.player)}, Компьютер выбрал ${choiceToText(lastRoundData.computer)}. `;
        if (lastRoundData.result === 'win') {
            resultText += 'Вы победили!';
        } else if (lastRoundData.result === 'lose') {
            resultText += 'Вы проиграли.';
        } else {
            resultText += 'Ничья.';
        }
        resultElement.textContent = resultText;
    } else {
         resultElement.textContent = 'Сделайте ваш выбор.'; // Начальное или сброшенное состояние
    }
}

/**
 * Рендерит список истории раундов в указанный DOM-элемент.
 * @param {HTMLElement} containerElement - Элемент, куда рендерить список истории (например, div).
 * @param {RoundHistory[]} historyData - Массив объектов истории раундов для отображения.
 */
export function renderHistoryList(containerElement, historyData) {
    containerElement.innerHTML = ''; // Очищаем текущий список

    if (historyData.length === 0) {
        containerElement.textContent = 'История пуста.'; // Простой текст, если история пуста
        return;
    }

    // Отображаем каждый раунд как параграф (или другой простой элемент)
    historyData.forEach(round => {
        const roundElement = document.createElement('p');
        roundElement.textContent = `Раунд ${round.round}: Игрок - ${choiceToText(round.player)}, Компьютер - ${choiceToText(round.computer)}, Результат - ${resultToText(round.result)}`;
        // Можно добавить простой класс для стилизации результата
         roundElement.style.color = resultColor(round.result);

        containerElement.appendChild(roundElement);
    });
}


/**
 * Настраивает переключение между вкладками.
 * @param {NodeListOf<HTMLButtonElement>} tabButtons - NodeList кнопок вкладок.
 * @param {NodeListOf<HTMLElement>} tabContents - NodeList элементов содержимого вкладок.
 */
export function setupTabs(tabButtons, tabContents) {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTabId = button.dataset.tab;
            showTab(targetTabId, tabButtons, tabContents);
        });
    });

    // Показываем вкладку, которая изначально помечена как active в HTML
     const initialActiveTab = document.querySelector('.tab-button.active');
     if (initialActiveTab) {
         showTab(initialActiveTab.dataset.tab, tabButtons, tabContents);
     } else {
         // Если active не установлен, показываем первую вкладку
          if (tabButtons.length > 0) {
              showTab(tabButtons[0].dataset.tab, tabButtons, tabContents);
          }
     }
}

/**
 * Показывает вкладку с указанным ID и скрывает остальные.
 * @param {string} targetTabId - ID вкладки для показа (например, 'game', 'history').
 * @param {NodeListOf<HTMLButtonElement>} tabButtons - NodeList кнопок вкладок.
 * @param {NodeListOf<HTMLElement>} tabContents - NodeList элементов содержимого вкладок.
 */
export function showTab(targetTabId, tabButtons, tabContents) {
    tabButtons.forEach(button => {
        if (button.dataset.tab === targetTabId) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    tabContents.forEach(content => {
        if (content.id === `tab-${targetTabId}`) {
            content.classList.remove('hidden');
        } else {
            content.classList.add('hidden');
        }
    });
}

/**
 * Проверяет, является ли значение фильтра истории корректным.
 * В данном простом варианте эта функция находится в UI, т.к. используется только здесь.
 * Для более сложной валидации лучше вынести в отдельный модуль.
 * @param {string} value - Значение для проверки.
 * @returns {boolean} true, если значение корректно, иначе false.
 */
export function isValidFilterValue(value) {
    const validFilters = ['all', 'win', 'lose', 'draw'];
    return validFilters.includes(value);
}


/**
 * Преобразует выбор из строки в удобочитаемый текст.
 * @param {string} choice - Выбор ('rock', 'paper', 'scissors').
 * @returns {string} Текстовое представление выбора.
 */
function choiceToText(choice) {
    switch (choice) {
        case 'rock': return 'Камень';
        case 'paper': return 'Бумага';
        case 'scissors': return 'Ножницы';
        default: return choice;
    }
}

/**
 * Преобразует результат из строки в удобочитаемый текст.
 * @param {'win'|'lose'|'draw'} result - Результат ('win', 'lose', 'draw').
 * @returns {string} Текстовое представление результата.
 */
function resultToText(result) {
    switch (result) {
        case 'win': return 'Победа';
        case 'lose': return 'Поражение';
        case 'draw': return 'Ничья';
        default: return result;
    }
}

/**
 * Возвращает цвет для результата раунда.
 * @param {'win'|'lose'|'draw'} result - Результат раунда.
 * @returns {string} CSS цвет.
 */
function resultColor(result) {
     switch (result) {
         case 'win': return 'green';
         case 'lose': return 'red';
         case 'draw': return 'orange';
         default: return 'black';
     }
}