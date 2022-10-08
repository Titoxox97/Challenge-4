// Variables tracking current state of quiz
var currentQuestIndex = 0;
var timeLeft = quizQuestions.length * 10;
var timerId;

// Variables referencing DOM elements
var quizQuestions = document.getElementById("questions");
var quizTimer = document.getElementById("time");
var quizChoices = document.getElementById("choices");
var submitScoreBtn = document.getElementById("submitScore");
var startQuizBtn = document.getElementById("startbtn");
var userInitials = document.getElementById("initials");
var quizFeedback = document.getElementById("feedback");

function startQuiz() {
   // hide opening page
    openpage.style.display = "none";

    // unhide questions
    quizQuestions.style.display = "block";

    //Begin timer
    timerId = setInterval(function() {
        // Count down
        timeLeft--;
        // Display time remaining
        quizTimer.textContent = "Time left: " + timeLeft;

        getQuestion();
    })

function getQuestion() {
    // Retrieve current question from question array
    var currentQuest = quizQuestions[currentQuestIndex];
    
    //update question title with current question 
    var currentTitle = document.getElementById('question-title');
    currentTitle.textContent = currentQuest

    // Clear previous question choices
    quizChoices.innerHTML = '';

    // For loop choosing the choice elements
    for (var i=0; i < currentQuest.choices.length; i++) {

    }

}
}