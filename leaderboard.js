leaderboard = document.getElementById("leaderboard");
highScores = JSON.parse(localStorage.getItem("highScores")) || [];

leaderboard.innerHTML = highScores
  .map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
  })
  .join("");