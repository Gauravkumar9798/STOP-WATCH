let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let laps = [];

const display = document.getElementById("display");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapsList = document.getElementById("laps");

function startStopwatch() {
  if (!running) {
    startTime = new Date().getTime() - difference;
    tInterval = setInterval(getShowTime, 1);
    running = true;
    startButton.textContent = "Pause";
  } else {
    clearInterval(tInterval);
    running = false;
    startButton.textContent = "Start";
  }
}

function getShowTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  let hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  display.textContent = `${hours}:${minutes}:${seconds}`;
}

function stopStopwatch() {
  clearInterval(tInterval);
  running = false;
  startButton.textContent = "Start";
}

function resetStopwatch() {
  clearInterval(tInterval);
  running = false;
  startButton.textContent = "Start";
  difference = 0;
  display.textContent = "00:00:00";
  laps = [];
  lapsList.innerHTML = "";
}

function recordLap() {
  if (running) {
    const lapTime = display.textContent;
    laps.push(lapTime);
    const lapItem = document.createElement("li");
    lapItem.textContent = lapTime;
    lapsList.appendChild(lapItem);
  }
}

startButton.addEventListener("click", startStopwatch);
stopButton.addEventListener("click", stopStopwatch);
resetButton.addEventListener("click", resetStopwatch);
lapButton.addEventListener("click", recordLap);
