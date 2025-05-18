/**
 * @typedef {object} RoundHistory
 * @property {number} round - Номер раунда.
 * @property {string} player - Выбор игрока ('rock', 'paper', 'scissors').
 * @property {string} computer - Выбор компьютера ('rock', 'paper', 'scissors').
 * @property {'win'|'lose'|'draw'} result - Результат раунда ('win', 'lose', 'draw').
 */

import {
    playGameRound, // Логика раунда и обновление состояния в модуле app
    getScores,
    getHistoryData,
    resetGame
} from "./src/game.js";

import {
    updateGameUI, // Обновление счета и результата на странице
    renderHistoryList, // Отрисовка списка истории
    setupTabs, // Управление вкладками
    isValidFilterValue // Проверка валидности фильтра (вынесено в UI или Utils, здесь в UI)
} from "./src/ui.js";



const scoreDiv = document.getElementById('score');
const resultDiv = document.getElementById('result');
const choicesDiv = document.getElementById('choices');
const historyListDiv = document.getElementById('historyList');
const historyFilterSelect = document.getElementById('historyFilter');
const clearHistoryButton = document.getElementById('clearHistory');
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');




// Слушатель на контейнер выбора (делегирование)
choicesDiv.addEventListener('click', (event) => {
    const target = event.target;
    // Проверяем, является ли кликнутый элемент кнопкой выбора
    if (target.tagName === 'BUTTON' && target.dataset.choice) {
        const playerChoice = target.dataset.choice;
        handlePlayerChoice(playerChoice);
    }
});

// Слушатель на изменение фильтра истории
historyFilterSelect.addEventListener('change', (event) => {
    const filterValue = event.target.value;
    // Простая валидация фильтра
    if (!isValidFilterValue(filterValue)) {
        console.warn("Некорректное значение фильтра:", filterValue);
        event.target.value = 'all'; // Сброс
        updateHistoryDisplay('all'); // Обновляем сброшенным значением
    } else {
         updateHistoryDisplay(filterValue);
    }
});

// Слушатель на кнопку очистки истории
clearHistoryButton.addEventListener('click', () => {
    resetGame(); // Сброс состояния игры и истории в модуле app
    updateGameUI(scoreDiv, resultDiv, getScores()); // Обновить счет (станет 0-0)
    historyFilterSelect.value = 'all'; // Сбросить фильтр
    updateHistoryDisplay('all'); // Обновить отображение истории (станет пустой)
});



/**
 * Обрабатывает выбор игрока, запускает раунд и обновляет UI.
 * @param {string} playerChoice - Выбор игрока ('rock', 'paper', 'scissors').
 */
function handlePlayerChoice(playerChoice) {
    // Запускаем раунд в модуле логики, получаем результат
    const roundResult = playGameRound(playerChoice); // roundResult включает player, computer, result, round

    // Обновляем игровую область UI (счет и текст результата раунда)
    updateGameUI(scoreDiv, resultDiv, getScores(), roundResult);

    // Обновляем отображение истории (с учетом текущего фильтра)
    updateHistoryDisplay(historyFilterSelect.value);

    // Можно добавить автоматическое переключение на вкладку истории
    // showTab('history', tabButtons, tabContents); // Опционально
}

/**
 * Обновляет отображение списка истории на основе текущего фильтра.
 * @param {string} filterValue - Значение фильтра ('all', 'win', 'lose', 'draw').
 */
function updateHistoryDisplay(filterValue) {
     const filteredHistory = getHistoryData(filterValue);
     renderHistoryList(historyListDiv, filteredHistory);
}




/**
 * Инициализирует игру при загрузке страницы.
 */
function initializeGame() {
    console.log("Game Initialized (Simple)");
    // Устанавливаем начальное состояние UI
    updateGameUI(scoreDiv, resultDiv, getScores()); // Показать начальный счет 0-0
    updateHistoryDisplay(historyFilterSelect.value); // Показать пустую историю
    setupTabs(tabButtons, tabContents); // Настроить вкладки

    // Показываем вкладку игры по умолчанию
     setupTabs(tabButtons, tabContents); // setupTabs также устанавливает активную вкладку по умолчанию, если active класс в HTML
     // Или явно: showTab('game', tabButtons, tabContents);
}

// Запускаем инициализацию после загрузки DOM
document.addEventListener('DOMContentLoaded', initializeGame);