//Vars

var timerDisplay = document.getElementById("timer")
var timer = 3590

var work = 1500 // 25 * 60 = 1500
var rest = 300 //5*60 = 300
var longRest = 1800 // 30 * 60 = 1800
var mode //"work" "rest" "long rest"
var modeDisplay = document.getElementById("mode")
var restCount = 0
var restInterval = 4

var startBtn = document.getElementById("start")
var pauseBtn = document.getElementById("pause")
var skipBtn = document.getElementById("skip")
var submitBtn = document.getElementById("submit")
var active

var alarmAudio = new Audio("alarm.mp3")
//Setup
mode = "work"
timer = work
active = false 

startBtn.addEventListener("click",function(){
    start()
})

pauseBtn.addEventListener("click",function(){
    pause()
})
skipBtn.addEventListener("click", function() {
    switchModes()
})
submitBtn.addEventListener("click", function(){
    submit()
})

modeDisplay.innerHTML = mode.toUpperCase();
timerDisplay.innerHTML = secToMin(timer)

setInterval(mainLoop, 1000)
//Main loop
function mainLoop() {
    if(active == true){
        timer--
    }
    if (timer <= 0) {
        alarmAudio.play()
        switchModes()
    }
    //Displays
    modeDisplay.innerHTML = mode.toUpperCase();
    timerDisplay.innerHTML = secToMin(timer)
}

//Button functions 


function start(){
    active = true
}
function pause(){
    active = false
}
function submit(){
    work = document.getElementById("work").value * 60
    rest = document.getElementById("rest").value * 60
    longRest = document.getElementById("long rest").value * 60
    restInterval = document.getElementById("interval").value
    if(restCount % restInterval == 0 && mode == "rest"){
        mode = "long rest"
    }
    if(mode == "work"){
        timer = work
    }
    if(mode == "rest"){
        timer = rest
    }
    if (mode == "long rest"){
        timer = longRest
    }
    modeDisplay.innerHTML = mode.toUpperCase();
    timerDisplay.innerHTML = secToMin(timer)
}






//Utility functions


function switchModes() {
    if (mode == "work") {
        mode = "rest"
        timer = rest
        restCount++
        if(restCount % restInterval == 0){
            mode = "long rest"
            timer = longRest
        }

    } else if (mode == "rest" || mode == "long rest") {
        mode = "work"
        timer = work
    }
    modeDisplay.innerHTML = mode.toUpperCase()
    timerDisplay.innerHTML = secToMin(timer)
}

function secToMin(seconds) {
    var hour = Math.floor(seconds / 3600)
    var min = Math.floor((seconds % 3600) / 60)
    var sec = Math.floor( seconds % 60)
    if (min < 10) {
        min = "0" + min.toString()
    }
    if (sec < 10) {
        sec = "0" + sec.toString()
    }
    var output = min + ":" + sec
    if (hour > 0) {
        output = hour + ":" + output
    }
    return output
}