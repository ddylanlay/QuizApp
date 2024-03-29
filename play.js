question = document.getElementById("question");
console.log(question)

// splits each selective answer in an array, example = ["17", "11", "19", "21"]
options = Array.from(document.getElementsByClassName("option-text"));
console.log(options)

questionScoreText = document.getElementById("questionScore");
progressBarText = document.getElementById("progressBarIncrement")
actualScoreText = document.getElementById("actualScore");


let chosenQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'What is 9 + 10?',
        option1: '90',
        option2: '21',
        option3: '19',
        option4: '1',
        answer: 3,
    },
    {
        question:
            "What is the capital of Australia?",
        option1: "Melbourne",
        option2: "Sydney",
        option3: "Kangaroo",
        option4: "Canberra",
        answer: 4,
    },
    {
        question: "Who founded 'Amazon'?",
        option1: "Jeff Bozos",
        option2: "Elon Musk",
        option3: "John Smith",
        option4: "Bill Gates",
        answer: 1,
    },
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

function startGame(){
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    console.log(availableQuestions);
    generateNewQuestion();
};

function generateNewQuestion(){
    if (availableQuestions.length == 0 || questionCounter-1 >= MAX_QUESTIONS)
    {
        localStorage.setItem("mostRecentScore", score)
        progressBarText.style.width = `${((questionCounter)/MAX_QUESTIONS) * 100}%`
        // moves the user to the end page once there are no more questions in the bank left
        // after progress bar completion is shown to the user after 1000 miliseconds
        setTimeout(() =>{
        return window.location.assign("/endpage.html")
        },1000);
    }

    if (questionCounter < MAX_QUESTIONS){
        questionCounter++;
    }
    questionScoreText.innerText = "Question " + questionCounter + "/"  + MAX_QUESTIONS;
    randomQuestionIndex = Math.floor(Math.random() * availableQuestions.length);
    console.log("The index is " + randomQuestionIndex);
    chosenQuestion = availableQuestions[randomQuestionIndex];
    console.log(chosenQuestion.question)
    question.innerText = chosenQuestion.question
    console.log(question.innerText)
    // updates bar each question, closer and closer to 100%
    progressBarText.style.width = `${((questionCounter)/MAX_QUESTIONS) * 100}%`
    options.forEach(option => {
        // grabs value connected to data-number in html
        number = option.dataset['number'];
        console.log(number)

        // grabs each answer
        option.innerText = chosenQuestion['option' + number];

    })
    // removes seen questions from random selection
    availableQuestions.splice(randomQuestionIndex,1)
    console.log("The length" + availableQuestions.length);
    acceptingAnswers = true;

}

options.forEach(option => {
    option.addEventListener("click", selectedAnswer => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        selectedScript = selectedAnswer.target; // the answer that the user selected
        finalSelectedAnswer = selectedScript.dataset['number']
        console.log("This is chosenQuestion" + chosenQuestion.answer) // the actual answer of the question
        console.log(finalSelectedAnswer)

        classToApply = "incorrect"
        rightAnswer = "correct";
        correctAnswer = chosenQuestion.answer
        if (finalSelectedAnswer == chosenQuestion.answer)
        {
            classToApply = "correct";
            updateScore(CORRECT_BONUS);
        }
        else
        {
            options.forEach(option => {
                console.log("Options " + option.dataset['number'])
                // highlights correct answer in green if user's answer is incorrect
                if(option.dataset['number'] == chosenQuestion.answer){
                    option.classList.add(rightAnswer)
                }
                // provides the correct answer for 1000 miliseconds
                setTimeout(() => {
                    option.classList.remove(rightAnswer)
                }, 1000)
            })
        }

        // applies the "correct" or "incorrect" value to the container element
        selectedScript.parentElement.classList.add(classToApply);
        console.log("Correct answer " + chosenQuestion.answer)
        // console.log(selectedScript.parentElement);
        // console.log("The selectedScript " + selectedScript.parentElement);
        // console.log(chosenQuestion)
        // console.log("The chosenQuestion " + chosenQuestion.parentElement);
        // shows if user's answer is correct for 1000 miliseconds then proceeds to next question
        setTimeout(() => {
            selectedScript.parentElement.classList.remove(classToApply);
            generateNewQuestion();
        }, 1000)
    })
})

updateScore = num => {
    score += num;
    actualScoreText.innerText = score;
}
startGame();