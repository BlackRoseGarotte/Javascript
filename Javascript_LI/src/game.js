/**
 * @typedef {object} RoundHistory
 * @property {number} round - Номер раунда.
 * @property {string} player - Выбор игрока ('rock', 'paper', 'scissors').
 * @property {string} computer - Выбор компьютера ('rock', 'paper', 'scissors').
 * @property {'win'|'lose'|'draw'} result - Результат раунда ('win', 'lose', 'draw').
 */

let playerScore = 0;
let computerScore = 0;
let roundNumber = 0;
/** @type {RoundHistory[]} */
let history = []; 


/**
 * Возвращает случайный выбор компьютера.
 * @returns {'rock'|'paper'|'scissors'} Случайный выбор компьютера.
 */
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

/**
 * Определяет победителя раунда.
 * @param {string} playerChoice - Выбор игрока ('rock', 'paper', 'scissors').
 * @param {string} computerChoice - Выбор компьютера ('rock', 'paper', 'scissors').
 * @returns {'win'|'lose'|'draw'} Результат раунда для игрока.
 */
function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'draw';
    }

    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'win';
    } else {
        return 'lose';
    }
}

/**
 * Запускает один раунд игры, обновляет счет и историю.
 * @param {string} playerChoice - Выбор игрока ('rock', 'paper', 'scissors').
 * @returns {RoundHistory} Объект с деталями прошедшего раунда.
 */
export function playGameRound(playerChoice) {
    roundNumber++; 
    const computerChoice = getComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);

    if (result === 'win') {
        playerScore++;
    } else if (result === 'lose') {
        computerScore++;
    }

    const roundData = {
        round: roundNumber,
        player: playerChoice,
        computer: computerChoice,
        result: result
    };
    history.push(roundData);

    return roundData; 
}


/**
 * Возвращает текущий счет.
 * @returns {{player: number, computer: number}} Объект со счетом игрока и компьютера.
 */
export function getScores() {
    return {
        player: playerScore,
        computer: computerScore
    };
}

/**
 * Возвращает массив истории игр, опционально отфильтрованный.
 * @param {'all'|'win'|'lose'|'draw'} [filter='all'] - Значение фильтра.
 * @returns {RoundHistory[]} Отфильтрованный массив истории.
 */
export function getHistoryData(filter = 'all') {
    if (filter === 'all') {
        return [...history]; // Возвращаем копию всего массива
    } else {
        
        return history.filter(round => round.result === filter);
    }
}

/**
 * Сбрасывает счет и историю игр.
 */
export function resetGame() {
    playerScore = 0;
    computerScore = 0;
    roundNumber = 0;
    history = [];
}
