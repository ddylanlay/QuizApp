username = document.getElementById("username")
saveScoreButton = document.getElementById("saveScoreButton");
mostRecentScore = localStorage.getItem("mostRecentScore");
finalScore = document.getElementById("finalScore");
finalScore.innerText = mostRecentScore;
highScores = JSON.parse(localStorage.getItem("highScores")) || [];
MAX_HIGH_SCORES = 5;
console.log(highScores);
// provides what key on the keyboard is being pressed
username.addEventListener("keyup", () => {
    console.log(username.value);
    // if there is no username inputted then save button does not work
    saveScoreButton.disabled = !username.value;
})


saveHighScore = holder => {
    console.log("clicked saved");
    holder.preventDefault();
    score = {
        score: MostRecentScore,
        name: username.value
    };
    highScores.push(score);
    // to arrange highscores accurately
    highScores.sort( (a,b) => {
        return b.score - a.score;
    })
    // only top 5 highest scores are kept
    highScores.splice(5);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    console.log(highScores);
    window.location.assign("/homepage.html")
}