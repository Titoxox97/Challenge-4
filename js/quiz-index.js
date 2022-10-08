// Variables tracking current state of quiz
var currentQuestIndex = 0;
var timeLeft = quizQuestions.length * 10;
var timer;

// Variables referencing DOM elements
var quizQuestions = document.getElementById('questions');
var quizTimer = document.getElementById("time");
var quizChoices = document.getElementById("choices");
var submitScoreBtn = document.getElementById("submitScore");
var startQuizBtn = document.getElementById("startbtn");
var userInitials = document.getElementById("initials");
var quizFeedback = document.getElementById("feedback");