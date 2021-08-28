var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var scoreDisplayScore = document.getElementById("highscore-score");


// Quiz questions and answers
var quizQuests = [{
    question: "JavaScript file has an extension of:",
    choiceA: ".Java",
    choiceB: ".javascript",
    choiceC: ".js",
    choiceD: "jscript",
    correctAnswer: "c"},
    {
    question: "If this button is clicked, the event handler is invoked:",
    choiceA: "OnSubmit()",
    choiceB: ".OnLoad()",
    choiceC: "IsPostBack()",
    choiceD: "Onclick()",
    correctAnswer: "d"},
    {
    question: "A function associated with an object is called a:",
    choiceA: "Function",
    choiceB: "API",
    choiceC: "ID",
    choiceD: "Method",
    correctAnswer: "d"},
    {
    question: "Which built-in method combines the text of two strings and returns a new string?",
    choiceA: "append()",
    choiceB: "concat()",
    choiceC: "attach()",
    choiceD: "section()",
    correctAnswer: "b"},   
    {
    question: "In JavaScript, what is a block of statement?",
    choiceA: "block containing a single statement",
    choiceB: "a conditional block and a single statement",
    choiceC: "block combining a number of statements into one compound statement",
    choiceD: "A conditional block",
    correctAnswer: "c"},
    {
    question: "The 'function' and 'var' are known as:",
    choiceA: "Keywords",
    choiceB: "Data Types",
    choiceC: "Headers",
    choiceD: "Declaration Statements",
    correctAnswer: "d"},
    {
    question: "In JS what will be used for calling the function definition expression:",
    choiceA: "Function prototype",
    choiceB: "Function literal",
    choiceC: "Function calling",
    choiceD: "Function declaration",
    correctAnswer: "b"},
];

// Global variables
var lastQuestIndex = quizQuests.length;
var currentQuestIndex = 0;
var timeLeft = 100;
var timerInterval;
var score = 0;
var correct;

// Functions purpose is to cycle through the array containing the questions and generate the q & a's

var gameoverDiv = document.getElementById("gameover");

var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

function generateQuizQuest() {
    gameoverDiv.style.display = "none";
    if (currentQuestIndex === finalQuestIndex) {
        return showScore();
    }
    var currentQuest = quizQuestions[currentQuestIndex];
    questionsEl.innerHTML = "<p>" + currentQuest.question + "</p>";
    buttonA.innerHTML = currentQuest.choiceA;
    buttonB.innerHTML = currentQuest.choiceB;
    buttonC.innerHTML = currentQuest.choiceC;
    buttonD.innerHTML = currentQuest.choiceD;
};

// Begins the quiz and starts the timer
var quizTimer = document.getElementById("timer");

function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuest();

    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
        
      }, 1000);
    quizBody.style.display = "block";
}

// Page that displays score once quiz is completed or time has ran out
var highscoreInputName = document.getElementById("initials");
var finalScoreEl = document.getElementById("finalScore");

function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

// On click the function runs the highscore and saves the array of the other scores saved in local storage
// also pushes the initials and score into the array saved in the local storage, then running the function to show the high scores

var submitScoreBtn = document.getElementById("submitScore");
var highscoreContainer = document.getElementById("highscoreContainer");
var endGameBtns = document.getElementById("endGameBtns");
var highscoreDiv = document.getElementById("high-scorePage");



submitScoreBtn.addEventListener("click", function highscore(){
    
    
    if(highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighs = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighs = {
            name : currentUser,
            score : score
        };
    
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighs.push(currentHighs);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});

// Clears past high scores and creates a new list of high scores from storage
var scoreDisplayName = document.getElementById("highscore-initials");
var scoreDisplayScore = document.getElementById("highscore-score");

function generateHighscores(){
    scoreDisplayName.innerHTML = "";
    scoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        scoreDisplayName.appendChild(newNameSpan);
        scoreDisplayScore.appendChild(newScoreSpan);

// Displays the scores page and hides the other pages
function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// Clears the local storage and clears text from the page
function clearScore(){
    window.localStorage.clear();
    scoreDisplayName.textContent = "";
    scoreDisplayScore.textContent = "";
}

// Sets all the var's back to their starting values and allows user to replay the quiz
function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 90;
    score = 0;
    currentQuestionIndex = 0;
}

// Grades quiz questions
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
        score++;
        alert("Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div the answer is correct.
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex) {
        alert("Incorrect.")     
        currentQuestionIndex++;
        timeLeft = timeLeft-10;
        generateQuizQuestion();
       
        //display in the results div the answer is wrong.
    }else { 
        showScore();
    }
}

// EventListener allowing the button to begin the quiz once clicked
// startQuizButton.addEventListener("click",startQuiz)
