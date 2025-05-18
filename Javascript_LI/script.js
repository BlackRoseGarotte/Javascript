/**
 * @typedef {object} RoundHistory
 * @property {number} round - Номер раунда.
 * @property {string} player - Выбор игрока ('rock', 'paper', 'scissors').
 * @property {string} computer - Выбор компьютера ('rock', 'paper', 'scissors').
 * @property {'win'|'lose'|'draw'} result - Результат раунда ('win', 'lose', 'draw').
 */

import {
    playGameRound, 
    getScores,
    getHistoryData,
    resetGame
} from "./src/game.js";

import {
    updateGameUI, 
    renderHistoryList, 
    setupTabs, 
    isValidFilterValue 
} from "./src/ui.js";



const scoreDiv = document.getElementById('score');
const resultDiv = document.getElementById('result');
const choicesDiv = document.getElementById('choices');
const historyListDiv = document.getElementById('historyList');
const historyFilterSelect = document.getElementById('historyFilter');
const clearHistoryButton = document.getElementById('clearHistory');
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');





choicesDiv.addEventListener('click', (event) => {
    const target = event.target;
    
    if (target.tagName === 'BUTTON' && target.dataset.choice) {
        const playerChoice = target.dataset.choice;
        handlePlayerChoice(playerChoice);
    }
});


historyFilterSelect.addEventListener('change', (event) => {
    const filterValue = event.target.value;
    
    if (!isValidFilterValue(filterValue)) {
        console.warn("Некорректное значение фильтра:", filterValue);
        event.target.value = 'all'; 
        updateHistoryDisplay('all'); 
    } else {
         updateHistoryDisplay(filterValue);
    }
});

clearHistoryButton.addEventListener('click', () => {
    resetGame(); 
    updateGameUI(scoreDiv, resultDiv, getScores()); 
    historyFilterSelect.value = 'all'; 
    updateHistoryDisplay('all'); 
});



/**
 * Обрабатывает выбор игрока, запускает раунд и обновляет UI.
 * @param {string} playerChoice - Выбор игрока ('rock', 'paper', 'scissors').
 */
function handlePlayerChoice(playerChoice) {
    
    const roundResult = playGameRound(playerChoice); 

    updateGameUI(scoreDiv, resultDiv, getScores(), roundResult);

    updateHistoryDisplay(historyFilterSelect.value);
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
    
    updateGameUI(scoreDiv, resultDiv, getScores()); 
    updateHistoryDisplay(historyFilterSelect.value); 
    setupTabs(tabButtons, tabContents); 

     setupTabs(tabButtons, tabContents); 
     
}

document.addEventListener('DOMContentLoaded', initializeGame);
