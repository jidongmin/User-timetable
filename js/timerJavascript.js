var startTime_click;
var curTime;

var startPauseTime;
var finishPauseTime;
var totalPauseTime = {};

totalPauseTime.totalPauseSec = 0;
totalPauseTime.totalPauseMin = 0;
totalPauseTime.totalPauseHour = 0;

var sec;
var min;
var hour;

var intervalController;

var timerStartButton = document.getElementById("startButton");
timerStartButton.addEventListener('click', checkStartTime, false);

var timerPauseButton = document.getElementById("pauseButton");
timerPauseButton.addEventListener('click', startPause, false);

var timerStopButton = document.getElementById("stopButton");
timerStopButton.addEventListener('click', stopTimer, false);


function checkStartTime() {
    startTime_click = new Date();
    
    intervalController = setInterval(returnPassTime , 100);    
}

function setCurTime() {
    curTime = new Date();
    
    sec = curTime.getSeconds() - startTime_click.getSeconds() - totalPauseTime.totalPauseSec;
    min = curTime.getMinutes() - startTime_click.getMinutes() - totalPauseTime.totalPauseMin;
    hour = curTime.getHours() - startTime_click.getHours() - totalPauseTime.totalPauseHour;

    if (sec < 10) {
        sec = '0' + sec;
    }
    if (min < 10) {
        min = '0' + min;
    }
    if (hour < 10) {
        hour = '0' + hour;
    }
}

function addPauseTime() {
    var pauseSec = finishPauseTime.getSeconds() - startPauseTime.getSeconds();
    var pauseMin = finishPauseTime.getMinutes() - startPauseTime.getMinutes();
    var pauseHour = finishPauseTime.getHours() - startPauseTime.getHours();
    
    totalPauseTime.totalPauseSec += pauseSec;
    totalPauseTime.totalPauseMin += pauseMin;
    totalPauseTime.totalPauseHour += pauseHour;
}

function returnPassTime() {
    setCurTime();
    
    var timerView = document.getElementById("timerView");
    timerView.innerHTML = hour + ':' + min + ':' + sec ;
}

function startPause() {
    startPauseTime = new Date;
    clearInterval(intervalController);
    
    timerPauseButton.removeEventListener('click', startPause, false);
    timerPauseButton.addEventListener('click', stopPause, false);
}

function stopPause() {
    finishPauseTime = new Date;
    addPauseTime();
    
    intervalController = setInterval(returnPassTime , 100);
    
    timerPauseButton.removeEventListener('click', stopPause, false);
    timerPauseButton.addEventListener('click', startPause, false);
}

function changeImage_toRefresh() {
    document.getElementById("stopImage").src = "./source/refresh.png";
}

function changeImage_toStop() {
    document.getElementById("stopImage").src = "./source/stop.png";
}

function stopTimer() {
    clearInterval(intervalController);
    
    changeImage_toRefresh();
    
    timerStopButton.removeEventListener('click', stopTimer, false);
    timerStopButton.addEventListener('click', resetTimer, false);
}

function resetTimer() {
    var timerView = document.getElementById("timerView");
    timerView.innerHTML = "00:00:00";
    
    changeImage_toStop();

    resetParam();
    
    timerStopButton.removeEventListener('click', resetTimer, false);
    timerStopButton.addEventListener('click', stopTimer, false);    
}

function resetParam() {
    startTime_click = null;
    curTime = null;
    startPauseTime = null;
    finishPauseTime = null;
    totalPauseTime = {};

    totalPauseTime.totalPauseSec = 0;
    totalPauseTime.totalPauseMin = 0;
    totalPauseTime.totalPauseHour = 0;

    sec = 0;
    min = 0;
    hour = 0;    
}
