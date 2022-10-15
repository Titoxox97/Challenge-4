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
    var openpagex = document.getElementById('openpage');
    openpagex.setAttribute('class', 'hide');
    // unhide questions
    quizQuestions.removeAttribute('class');

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

    // For loop fetching the choice elements
    for (var i=0; i < currentQuest.choices.length; i++) {

        // Button for each possible choice
        var choice = currentQuest.choices[i];
        var choicex = document.createElement('button');

        choicex.setAttribute('class', 'choice');
        choicex.setAttribute('value', choice);
        choicex.textContent = i + 1 + choice;

        // display choices on the web page
        quizChoices.appendChild(choicex);

    }
}


// Event for when button is clicked

function optClick(event) {
    var buttonx = event.target;

    // Do nothing if the element clicked on is not a button for one of the choices
    if (!buttonx.matches('.choice')) {
        return;
    }

    // Check submission
    if (buttonx.value !== questions[currentQuestIndex].answer) {

        // Subtract time
        time -= 10;

        // Make sure timer doesn't display negative
        if (time < 0) {
            time = 0;
        }


        // Display time
        quizTimer.textContent = time;
    }

    // feedback on question: right/wrong
    quizFeedback.setAttribute('class', 'feedback');
    setTimeout(function () {
        quizFeedback.setAttribute('class', 'feedback hide');
    }, 1000);

    // Generate next question
    currentQuestIndex++;

    // Check to make sure questions have not run out
    if(time <=  0 || currentQuestIndex === questions.length){
        endQuiz();
    } else {
        getQuestion();
    }
}
function endQuiz() {
    // timer stop
    clearInterval(timerId);

    // display end screen
    var endScreen = document.getElementById('gameover');
    endScreen.removeAttribute('class');

    // Final score
    var finalScorex = document.getElementById('finalScore');
    finalScorex.textContent = time;

    // hide questions
    quizQuestions.setAttribute('class', 'hide');
}

function countDown() {
    // time update
    time--;
    quizTimer.textContent = time;

    // check if the user ran out of time
    if (time <= 0) {
        endQuiz();
    }
}





}