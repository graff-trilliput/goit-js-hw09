import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const btnStartRef = document.querySelector('[data-start]');
const inputRef = document.querySelector('#datetime-picker');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');
let selectedDate = null;
btnStartRef.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      selectedDate = null;
      btnStartRef.disabled = true;
      return;
    }
    selectedDate = selectedDates[0];
    btnStartRef.disabled = false;
  },
};

btnStartRef.addEventListener('click', onbtnStartClick);

let intervalId = null;

function onbtnStartClick(event) {
  inputRef.disabled = true;
  btnStartRef.disabled = true;
  intervalId = setInterval(() => {
    const difference = selectedDate - Date.now();
    if (difference <= 0) {
      clearInterval(intervalId);
      selectedDate = null;
      intervalId = null;
      inputRef.disabled = false;
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(difference);
    daysRef.textContent = addLeadingZero(days);
    hoursRef.textContent = addLeadingZero(hours);
    minutesRef.textContent = addLeadingZero(minutes);
    secondsRef.textContent = addLeadingZero(seconds);
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

flatpickr(inputRef, options);
