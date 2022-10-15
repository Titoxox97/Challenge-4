// Function to fetch the results of the quiz and display thhem on the highscores.html page

function fetchResults() {

    // Retrieve the scores from local storage, if no scores are present the page will be blank
    var quizResults = JSON.parse(window.localStorage.getItem('quizResults')) || [];

    // Sort the results by score value in ascending order
    quizResults.sort(function (x, y) {
        return x.score - y.score;
    });

    for (var i = 0; i < quizResults.length; i += 1) {
        
        // li tag for each score
        var listTag = document.createElement('li');
        listTag.textContent = quizResults[i].initials + ' - ' + quizResults[i].score;

        // display on the page
        var olistTag = document.getElementById('quizResults');
        olistTag.appendChild(listTag);
    }

}

function clearResults() {
    window.localStorage.removeItem('quizResults');
    window.location.reload();
}

document.getElementById('clear').onclick = clearResults

// run when page loads
fetchResults();