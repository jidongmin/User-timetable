(function($) {
    "use strict";
  
    // Call the dataTables jQuery plugin
    $(document).ready(function() {
      $('#dataTable').DataTable();
    });
  
  })(jQuery);
  
  // Chart.js scripts
  // -- Set new default font family and font color to mimic Bootstrap's default styling
  Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
  Chart.defaults.global.defaultFontColor = '#292b2c';
  
  // -- Area Chart Example
  var ctx = document.getElementById("myAreaChart");
  var myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"],
      datasets: [{
        label: "Sessions",
        lineTension: 0.3,
        backgroundColor: "rgba(2,117,216,0.2)",
        borderColor: "rgba(2,117,216,1)",
        pointRadius: 5,
        pointBackgroundColor: "rgba(2,117,216,1)",
        pointBorderColor: "rgba(255,255,255,0.8)",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(2,117,216,1)",
        pointHitRadius: 20,
        pointBorderWidth: 2,
        data: [1000, 30162, 26263, 18394, 18287, 28682, 31274, 33259, 25849, 24159, 32651, 31984, 38451],
      }],
    },
    options: {
      scales: {
        xAxes: [{
          time: {
            unit: 'date'
          },
          gridLines: {
            display: false
          },
          ticks: {
            maxTicksLimit: 7
          }
        }],
        yAxes: [{
          ticks: {
            min: 0,
            max: 40000,
            maxTicksLimit: 5
          },
          gridLines: {
            color: "rgba(0, 0, 0, .125)",
          }
        }],
      },
      legend: {
        display: false
      }
    }
  });
  
  // -- Pie Chart Example
  var ctx = document.getElementById("myPieChart");
  var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ["공부", "게임", "기타"],
      datasets: [{
        data: [12.21, 14.58, 11.25],
        backgroundColor: ['#FE000F', '#3302F9', '#010100'],
      }],
    },
  });
  
//Timer Function
var secPassed = 0;

var startTime;
var finishTime;

var sec = 0;
var min = 0;
var hour = 0;
var month = null;
var date = null;

var timeIntervalController;

// create local storage 
if(!window.localStorage) {
    alert('현재 사용중인 브라우저는 localStorage를 지원하지 않습니다.');
} else {
    localStorage.setItem("Date", "StudyTime");
    
    // for testData
    
    localStorage.setItem("8/21", "300");
    localStorage.setItem("8/22", "240");
    localStorage.setItem("8/23", "170");
    localStorage.setItem("8/24", "350");
    localStorage.setItem("8/25", "400");
    localStorage.setItem("8/26", "230");
    localStorage.setItem("8/27", "120");
    localStorage.setItem("8/28", "170");
    
};

var innerTimerFeature = {
    timerIncrease : function () {
        secPassed++;
    },
    
    getSecond : function () {
        sec = parseInt(secPassed%60);
    },
    
    getMinute : function () {
        min = parseInt((secPassed%3600)/60);
    },
    
    getHour : function () {
        hour = parseInt(secPassed/3600);
    }
};

var timerInterface = {
    checkStartTime : function() {
        startTime = new Date();
        timeIntervalController = setInterval(timerInterface.returnPassTime, 1000);
        var timerStartButton = document.getElementById("startButton");
        timerStartButton.removeEventListener('click', timerInterface.checkStartTime, false); 
    },
    
    returnPassTime : function() {
        innerTimerFeature.timerIncrease();
        innerTimerFeature.getSecond();
        innerTimerFeature.getMinute();
        innerTimerFeature.getHour();		
        
        // 자릿수 보정을 위함
        if (sec < 10) {
            sec = '0' + sec;
        }
        if (min < 10) {
            min = '0' + min;
        }
        if (hour < 10) {
            hour = '0' + hour;
        }		
    
        var timerView = document.getElementById("timerView");
        timerView.innerHTML = hour + ':' + min + ':' + sec ;
    },
    
    startPause : function() {
        clearInterval(timeIntervalController);
    
        //localStorage.clear();
        
        timerPauseButton.removeEventListener('click', timerInterface.startPause, false);
        timerPauseButton.addEventListener('click', timerInterface.stopPause, false);
    },
    
    stopPause : function() {
        timeIntervalController = setInterval(timerInterface.returnPassTime , 1000);
    
        timerPauseButton.removeEventListener('click', timerInterface.stopPause, false);
        timerPauseButton.addEventListener('click', timerInterface.startPause, false);
    },
    
    changeImage_toRefresh : function() {
        document.getElementById("stopImage").src = "./source/refresh.png";
    },
    
    changeImage_toStop : function() {
        document.getElementById("stopImage").src = "./source/stop.png";
    },
    
    stopTimer : function () {
        
        clearInterval(timeIntervalController);
        
        timerInterface.changeImage_toRefresh();
        
        finishTime = new Date();
        
        dataLocalStorage.setUserData();
        
        timerInterface.timeFeatureReset();
        
        timerStopButton.removeEventListener('click', timerInterface.stopTimer, false);
        timerStopButton.addEventListener('click', timerInterface.resetTimer, false);
        
        var timerStartButton = document.getElementById("startButton");
        timerStartButton.addEventListener('click', timerInterface.checkStartTime, false);
    },
    
    resetTimer : function() {		
        var timerView = document.getElementById("timerView");
        timerView.innerHTML = "00:00:00";
        
        timerInterface.changeImage_toStop();
        
        timerInterface.timeFeatureReset();
        
        logInterface.insertChart();
        
        timerStopButton.removeEventListener('click', timerInterface.resetTimer, false);
        timerStopButton.addEventListener('click', timerInterface.stopTimer, false); 
    },
    
    timeFeatureReset : function() {
        secPassed = 0;
        sec = 0;
        min = 0;
        hour = 0;	
    }
};

var dateFeature = {
    setMonth : function() {
        month = finishTime.getMonth();
        month++; // .getMonth() starts from 0 (Date Object)
    },
    
    setDate : function() {
        date = finishTime.getDate();
    }
};

var logInterface = {	
    insertChart : function() {
        
        logInterface.transferLog();
        
        var logChartElement = document.getElementById("logChart").getContext("2d");
        var logChart = new Chart(logChartElement).Line(logData_forChart);
        var logView = document.getElementById(logGraph);
        logView.innerHTML = logChart;
    },
    
    transferLog : function() {
        var labels = logData_forChart["labels"];
        var dataArray = logData_forChart["datasets"][0]["data"];
        
        labels = [];
        dataArray = [];
        
        for (var i = localStorage.length; i>4; i--) {
            labels.push(localStorage.key(i-2));
            dataArray.push(localStorage[localStorage.key(i-2)]);
        };
        
        labels.reverse();
        dataArray.reverse();
    }
};

var logData_forChart = {
    labels : [],
    datasets : [
        {
            fillColor : "rgba(220,220,220,0)",
            strokeColor : "rgba(54,54,54,1)",
            pointColor : "rgba(255,255,255,1)",
            pointStrokeColor : "#363636",
            data : []
        }
    ]
}

var dataLocalStorage = {
    userDate : null,
    userStudyTime : null, // save as second
    userLog : null,
    
    setUserDate : function() {			
        dateFeature.setMonth();
        dateFeature.setDate();
        this.userDate = month + '/' + date;
    },
    
    setUserStudyTime : function() {
        this.setUserDate();
        var latestKey = localStorage.key((localStorage.length)-2);
        if (latestKey === this.userDate) {
            this.userStudyTime = parseInt(localStorage[latestKey]) + secPassed;
        }
        else {
            this.userStudyTime = secPassed;
        }		
    },
    
    setUserData : function() {
        this.setUserStudyTime();
        localStorage.setItem(this.userDate, this.userStudyTime);
    }
};

var timerStartButton = document.getElementById("startButton");
timerStartButton.addEventListener('click', timerInterface.checkStartTime, false);

var timerPauseButton = document.getElementById("pauseButton");
timerPauseButton.addEventListener('click', timerInterface.startPause, false);

var timerStopButton = document.getElementById("stopButton");
timerStopButton.addEventListener('click', timerInterface.stopTimer, false);

window.onload = logInterface.insertChart();
