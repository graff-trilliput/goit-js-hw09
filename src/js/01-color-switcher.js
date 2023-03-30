function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const btnStartRef = document.querySelector('[data-start]');
const btnStopRef = document.querySelector('[data-stop]');
const bodyRef = document.querySelector('body');

btnStartRef.addEventListener('click', onBtnStartClick);
btnStopRef.addEventListener('click', onBtnStopClick);

btnStopRef.disabled = true;
let intervalId = null;

function onBtnStartClick(event) {
  btnStopRef.disabled = false;
  event.target.disabled = true;
  bodyRef.style.backgroundColor = getRandomHexColor();
  intervalId = setInterval(() => {
    bodyRef.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onBtnStopClick(event) {
  btnStartRef.disabled = false;
  event.target.disabled = true;
  clearInterval(intervalId);
}
