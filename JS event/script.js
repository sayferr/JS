const gameField = document.getElementById('gameField');
const timerEl = document.getElementById('timer');
const resultEl = document.getElementById('result');

let blocks = [];
let totalBlocks;
let timeLeft;
let gameInterval;
let timerInterval;

// запрашиваем количество блоков от 5 до 100
do {
  totalBlocks = parseInt(prompt("How many blocks do you need? (от 5 до 100)"), 10);
} while (isNaN(totalBlocks) ||  totalBlocks < 5 || totalBlocks > 100)

// запрашиваем время — можно 10, 20 или 30
do {
  timeLeft = parseInt(prompt("How much time does it take? (from 10 to 60)"), 10);
} while (![10, 20, 30, 40, 50, 60].includes(timeLeft));

// создание блоков
for (let i = 0; i < totalBlocks; i++) {
  let block = document.createElement('div');
  block.classList.add('block');

  block.style.top = Math.random() * (600 - 60) + 'px';
  block.style.left = Math.random() * (800 - 60) + 'px';

  // по клику удаляем блок
  block.addEventListener('click', () => {
    block.remove();
    blocks = blocks.filter(b => b !== block);
    if (blocks.length === 0) endGame(true);
  });

  gameField.appendChild(block);
  blocks.push(block);
}

// движение блоков
gameInterval = setInterval(() => {
  blocks.forEach(block => {
    block.style.top = Math.random() * (600 - 60) + 'px';
    block.style.left = Math.random() * (800 - 60) + 'px';
  });
}, 500);

// таймер
timerInterval = setInterval(() => {
  timeLeft--;
  timerEl.innerText = 'Время: ' + timeLeft;

  if (timeLeft === 0) {
    endGame(false);
  }
}, 1000);

// завершение игры
function endGame(win) {
  clearInterval(gameInterval);
  clearInterval(timerInterval);
  blocks.forEach(b => b.remove());
  blocks = [];

  resultEl.innerText = win ? 'Победа!' : 'Ты проиграл!';
}