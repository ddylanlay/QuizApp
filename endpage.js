username = document.getElementById("username")
saveScoreButton = document.getElementById("saveScoreButton");
mostRecentScore = localStorage.getItem("mostRecentScore");
finalScore = document.getElementById("finalScore");
finalScore.innerText = mostRecentScore;
// provides what key on the keyboard is being pressed
username.addEventListener("keyup", () => {
    console.log(username.value);
    // if there is no username inputted then save button does not work
    saveScoreButton.disabled = !username.value;
})


saveHighScore = holder => {
    console.log("clicked saved");
    holder.preventDefault();
}