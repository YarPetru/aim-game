const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = [
  'teal',
  'aqua',
  'blue',
  'lightblue',
  'stateblue',
  'darkblue',
  'seagreen',
];

let time = 0;
let score = 0;

//добавялем слушателя на клик по кнопе начать игру
startBtn.addEventListener('click', e => {
  e.preventDefault();
  screens[0].classList.add('up');
});

//добавляем слушатель на клик по выбранной опции времени
timeList.addEventListener('click', e => {
  if (e.target.classList.contains('time-btn')) {
    time = parseInt(e.target.getAttribute('data-time'));
    screens[1].classList.add('up');
    startGame();
    createRandomCircle();
  }
});

//добавляем слушатель события на клик по кружочку
board.addEventListener('click', e => {
  if (e.target.classList.contains('circle')) {
    score += 1;
    e.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

//выделяем в функцию, чтобы оптимизировать код в функциях стартГейм и дикризТайм, который повторяется
function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  timeEl.parentNode.classList.add('hide'); //удаляем родителя timeEL - h3, чтобы удалилось все вместе с текстом "осталось".
  // timeEl.parentNode.remove();
  board.innerHTML = `<h2>Время вышло<br>Ваш счет: <span class="primary">${score}</span></h2>`;
}

function createRandomCircle() {
  const circle = document.createElement('div');
  const size = getRandomNumber(6, 48); //делаем размер кружка рандомным

  const { width, height } = board.getBoundingClientRect(); // достаем значения ширины и высоты поля через деструктуризацию параметров метода getBoundingClientRect
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);

  circle.classList.add('circle');
  //добавляем рандомный размер кружка
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  //добавляем рандомные координаты
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  //вставляем элемент внутрь дива борд
  board.append(circle);

  circle.style.background = `linear-gradient(90deg, ${getRandomColor()} 0%, ${getRandomColor()} 47%, ${getRandomColor()} 100%)`;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}
