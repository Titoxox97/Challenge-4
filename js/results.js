// Function to fetch the results of the quiz and display thhem on the highscores.html page

function fetchResults() {

    // Retrieve the scores from local storage, if no scores are present the page will be blank
    var quizResults = JSON.parse(window.localStorage.getItem('quizResults')) || [];

    // Sort the results by score value in ascending order
    quizResults.sort(function (x, y) {
        return x.score - y.score;
    });

    for (var i = 0; i < quizResults.length; i+-1) {

        var listTag = document.createElement('li');
        listTag.textContent = quizResults[i].

    }


}