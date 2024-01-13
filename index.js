// Selecting DOM elements
let modeContainer = document.querySelector('.header'),
    toggleBtn = document.querySelector('.toggle-btn'),
    displayTimerOne = document.querySelector('#startTimeDisplay'),
    mode = document.querySelector('.mode p'),
    iconPlay = document.querySelector('i.fa-play'),
    iconPause = document.querySelector('i.fa-pause'),
    iconFlag = document.querySelector('i.fa-flag'),
    iconReplay = document.querySelector('i.fa-rotate-left'),
    tableContainer = document.querySelector('.table-description'),
    timerCounter2 = document.querySelector('.timer2'),
    tableInfo = document.querySelector('.table-info');

// Event listener for the dark/light mode toggle button
toggleBtn.addEventListener('click', () => {
    if (modeContainer.classList.contains('active')) {
        modeContainer.classList.remove('active');
        document.body.classList.remove('active');
        mode.innerHTML = "Light Mode";
    } else {
        modeContainer.classList.add('active');
        document.body.classList.add('active');
        mode.innerHTML = "Dark Mode";
    }
});

// Event listener for the play button
iconPlay.addEventListener('click', () => {
    iconPlay.style.display = "none";
    iconPause.style.display = "block";
    iconFlag.classList.remove('disable');
    iconReplay.classList.remove('disable');
});

// Event listener for the pause button
iconPause.addEventListener('click', () => {
    iconPlay.style.display = "block";
    iconPause.style.display = "none";
    iconFlag.classList.add('disable');
});

// Variables for the timers
let [hour, minute, second, millisecond] = [0, 0, 0, 0];
let [hour1, minute1, second1, millisecond1] = [0, 0, 0, 0];
let indicator = true;
let timer = null;
let lapCount = 1;
let timer1 = null;
let h, m, s, ms;
let h1, m1, s1, ms1;

// Function to reset timer values
function resetTimer(timerArray) {
    timerArray.forEach((item, index) => (timerArray[index] = 0));
}

// Function to start the flag timer
function flag() {
    [hour1, minute1, second1, millisecond1] = [0, 0, 0, 0];
    timerCounter2.innerHTML = `00:00:00.0`;
    timerCounter2.style.display = tableContainer.style.display = "block";
    if (timer1 !== null) {
        clearInterval(timer1);
        table();
    }
    timer1 = setInterval(startTimer2, 10);
}

// Function to start the play timer
function play() {
    if (timer !== null) {
        clearInterval(timer);
    }
    if (indicator) {
        timer = setInterval(startWatch, 10);
        indicator = false;
    } else if (!indicator) {
        timer = setInterval(startWatch, 10);
        timer1 = setInterval(startTimer2, 10);
    }
}

// Function to pause the timers
function pause() {
    clearInterval(timer);
    clearInterval(timer1);
}

// Function to reset all timers and display
function replay() {
    [hour, minute, second, millisecond, hour1, minute1, second1, millisecond1] = [0, 0, 0, 0, 0, 0, 0, 0];
    clearInterval(timer);
    clearInterval(timer1);
    displayTimerOne.innerHTML = `00:00:00.00`;
    tableInfo.innerHTML = "";
    iconFlag.classList.add('disable');
    iconPlay.style.display = "block";
    lapCount = 1;
    iconPause.style.display = tableContainer.style.display = timerCounter2.style.display = "none";
    iconReplay.classList.add('disable');
    indicator = true;
    timer1 = null;
}

// Function to update the display for the main timer
function startWatch() {
    millisecond++;
    if (millisecond == 99) {
        millisecond = 0;
        second++;
        if (second == 60) {
            second = 0;
            minute++;
            if (minute == 60) {
                minute = 0;
                hour++;
            }
        }
    }

    h = hour < 10 ? `0${hour}` : `${hour}`;
    m = minute < 10 ? `0${minute}` : `${minute}`;
    s = second < 10 ? `0${second}` : `${second}`;
    ms = millisecond < 10 ? `0${millisecond}` : `${millisecond}`;

    displayTimerOne.innerHTML = `${h}:${m}:${s}.${ms}`;
}

// Function to update the display for the flag timer
function startTimer2() {
    millisecond1++;
    if (millisecond1 == 99) {
        millisecond1 = 0;
        second1++;
        if (second1 == 60) {
            second1 = 0;
            minute1++;
            if (minute1 == 60) {
                minute1 = 0;
                hour1++;
            }
        }
    }
    h1 = hour1 < 10 ? `0${hour1}` : `${hour1}`;
    m1 = minute1 < 10 ? `0${minute1}` : `${minute1}`;
    s1 = second1 < 10 ? `0${second1}` : `${second1}`;
    ms1 = millisecond1 < 10 ? `0${millisecond1}` : `${millisecond1}`;

    timerCounter2.innerHTML = `${h1}:${m1}:${s1}.${ms1}`;
}

// Function to add lap information to the table
function table() {
    tableInfo.innerHTML += ` 
        <div class="table">
            <p>${lapCount++}</p>
            <p>${h1}:${m1}:${s1}.${ms1}</p>
            <p>${h}:${m}:${s}.${ms}</p>
        </div>
    `;
}
