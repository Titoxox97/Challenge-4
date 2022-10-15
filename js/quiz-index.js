// Variables tracking current state of quiz
var currentQuestIndex = 0;
var timeLeft = quizQuestions.length * 10;
var timerId;

// Variables referencing DOM elements
var questionsx = document.getElementById("questions");
var quizTimer = document.getElementById("time");
var choicesx = document.getElementById("choices");
var submitScoreBtn = document.getElementById("submitScore");
var startQuizBtn = document.getElementById("startbtn");
var userInitials = document.getElementById("initials");
var quizFeedback = document.getElementById("feedback");

function startQuiz() {
   // hide opening page
    var openpagex = document.getElementById('openpage');
    openpagex.setAttribute('class', 'hide');
    // unhide questions
    questionsx.removeAttribute('class');

    //Begin timer
    timerId = setInterval(countDown, 1000);
        
    // display start time
    quizTimer.textContent = time;
    
    getQuestion();
 }

function getQuestion() {
    // Retrieve current question from question array
    var currentQuest = questionsx[currentQuestIndex];
    
    //update question title with current question 
    var currentTitle = document.getElementById('question-title');
    currentTitle.textContent = currentQuest.question;

    // Clear previous question choices
    choicesx.innerHTML = '';

    // For loop fetching the choice elements
    for (var i=0; i < currentQuest.choices.length; i++) {

        // Button for each possible choice
        var choice = currentQuest.choices[i];
        var choiceNode = document.createElement('button');

        choiceNode.setAttribute('class', 'choice');
        choiceNode.setAttribute('value', choice);
        choiceNode.textContent = i + 1 + choice;

        // display choices on the web page
        choicesx.appendChild(choiceNode);

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
    questionsx.setAttribute('class', 'hide');
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

function saveHscore() {

    // retrieve input value
    var initials = userInitials.value.trim();

    // make certain of no empty submission
    if(initials !== '') {
        // get saved scored from local storage or return an empty array
        var quizResults = JSON.parse(window.localStorage.getItem('quizResults')) || [];

        // new score display for user
        var newScore = {
            score: time,
            initials: initials,
        };

        // save to local storage
        quizResults.push(newScore);
        window.localStorage.setItem('quizResults', JSON.stringify(quizResults));

        // redirect to next page
        window.location.href = 'highscores.html';
    }
}

    function checkForSub (event) {

        if (event.key === 'Enter') {
            saveHscore();
        }
    }






// submit initials
submitScoreBtn.onclick = saveHscore;

//start quiz button
startQuizBtn.onclick = startQuiz;

//user submission button elements
choicesx.onclick = optClick;
userInitials.onkeyup = checkForSub;