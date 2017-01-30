//Declaring arrays of my quiz containg all the data
var questions = [
    "Who is the founder of Pakistan?",
    "Who is the first Prime Minister of Pakistan?",
    "Who suggested the name of Pakistan?",
    "Who has written the national anthem of Pakistan?",
    "Who composed the music of our national anthem?"
];
var options = [
    ["Dr. Iqbal","Muhammad Ali Jinnah","Liaqat Ali Khan","Muhammad Ali Johar"],
    ["Muhammad Ali Jinnah","Moin Udin Chisti","Liaqat Ali Khan","Hafeez Jhaledhri"],
    ["Chaudhry Khaleeq Uz Zama","Liaqat Ali Khan","Chaudhry Rehmat Ali","Sir Syed Ahmed Khan"],
    ["Chaudhry Rehmat Ali","Hafeez Jalendhri","Dr. Israr Ahmed","Allama Iqbal"],
    ["Hafeez Jalendhri","Atif Aslam","Ahmed Chaghla", "Nusrat Fateh Ali"]
];
var answer = [
    "Muhammad Ali Jinnah",
    "Liaqat Ali Khan",
    "Chaudhry Rehmat Ali",
    "Hafeez Jalendhri",
    "Ahmed Chaghla"
];
// Declaring Variables of getting the Dom divs
var questionDiv = document.getElementById('question');
var optionDiv = document.getElementById('options');
var button = document.getElementById('button');
var displayHighScore = document.getElementById('hi-score');
var timeShow = document.getElementById('time');
var timeBox = document.getElementById('timePara');
var img = document.getElementById('image');
//Question number
var questionNumber = -1;
var highscore = [];
var score = 0;
var percentage;
var runTime;
var startBlink;
// Button Function
function start(){
    if(questionNumber == -1){
        runTime = setInterval(startTime,1000);
        img.className="hide";
        questionDiv.className="reveal";
        optionDiv.className="reveal";
        clearInterval(startBlink);
        timeBox.style.color="white";
    }
    if(questionNumber >= 0){
        var a = document.getElementsByClassName('option');
        var b = document.getElementsByClassName('option-select');
        for(var i = 0;i<options[0].length;i++){
            if(a[i].checked && b[i].innerHTML == answer[questionNumber]){
                score++;
            }
        }
    }
    if(questionNumber == 4){
        percentage = score/questions.length*100;
        questionDiv.innerHTML="<h1>Result</h1><p>Your Percentage</p>";
        optionDiv.innerHTML="<center>"+percentage+"%</center>";
        button.innerHTML = "Start Again";
        button.className = "button-start";
        highscore.push(percentage);
        displayHighScore.innerHTML = Math.max.apply(null,highscore)+"%"; 
        score=0;
        questionNumber=-1;
        clearInterval(runTime);
        clearInterval(startBlink);
        timeBox.style.color="white";
        time = 30;
    }
    else{
        questionNumber++;
        timeBox.className="reveal";
        questionDiv.innerHTML = "Q."+ (questionNumber+ 1) + " "+ questions[questionNumber];
        optionDiv.innerHTML="";
        for(var i = 0;i<options[0].length;i++){
            optionDiv.innerHTML += "<input type='radio' onclick='selectAllow()' class='option' name='question' /><span class='option-select'>"+options[questionNumber][i]+"</span><br>";
        }
        button.innerHTML = "NEXT";
        button.className = "button-right";
    }
}
function selectAllow(){
    document.getElementById('button').style.pointerEvents="auto";
}
function mustSelect(){
    var b = false;
    var a = document.getElementsByClassName('option');
    if(questionNumber > -1 && questionNumber < 5){
        for(var i = 0; i<4;i++){
            if(a[i].checked){
                b=true;
            }
        }
        if(b){
            document.getElementById('button').style.pointerEvents="auto";
        }
        else{
            document.getElementById('button').style.pointerEvents="none";
        }
    }
}
var time = 30;
function startTime(){
    timeShow.innerHTML = "00:"+time;
    if(time == 10){
       startBlink = setInterval(blink,1000);
    }
    if(time == 0){
        img.className="reveal";
        timeBox.className="hide";
        questionDiv.className="hide";
        optionDiv.className="hide";
        button.innerHTML="Start Again";
        questionNumber = -1;
        score = 0;
        button.className="button-start";
        time = 31;
        timeBox.style.color="white";
        clearInterval(runTime);
        clearInterval(startBlink);
    }
    time--;
}

function blink(){
    timeBox.style.color= timeBox.style.color == "white" ? "red" : "white";
}