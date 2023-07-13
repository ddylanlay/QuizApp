const question = document.getElementById("question");
console.log(question)

// splits each selective answer in an array, example = ["17", "11", "19", "21"]
const options = Array.from(document.getElementsByClassName("option-text"));
console.log(options)

let chosenQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        option1: '<scripting>',
        option2: '<javascript>',
        option3: '<js>',
        option4: '<script>', 
        answer: 4,
    },
    {
        question:
            "What is the correct syntax for referring to an external script called 'xxx.js'?",
        option1: "<script href='xxx.js'>",
        option2: "<script name='xxx.js'>",
        option3: "<script src='xxx.js'>",
        option4: "<script file='xxx.js'>",
        answer: 3,
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        option1: "msgBox('Hello World');",
        option2: "alertBox('Hello World');",
        option3: "msg('Hello World');",
        option4: "alert('Hello World');",
        answer: 4,
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
    if (availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS)
    {
        // moves the user to the end page once there are no more questions in the bank left
        return window.location.assign("/endpage.html");
    }
    questionCounter++;
    randomQuestionIndex = Math.floor(Math.random() * availableQuestions.length);
    console.log("The index is " + randomQuestionIndex);
    chosenQuestion = availableQuestions[randomQuestionIndex];
    console.log(chosenQuestion.question)
    question.innerText = chosenQuestion.question
    console.log(question.innerText)
    
    options.forEach(option => {
        // grabs value connected to data-number in html
        const number = option.dataset['number'];
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
        const selectedScript = selectedAnswer.target; // the answer that the user selected
        const finalSelectedAnswer = selectedScript.dataset['number']
        console.log(chosenQuestion.answer) // the actual answer of the question
        console.log(finalSelectedAnswer)

        const classToApply = "incorrect"
        

        if (finalSelectedAnswer == chosenQuestion.answer)
        {
            classToApply = "correct";
        }
        console.log(selectedScript.parentElement);
        // applies the correct container to the specific right answer
        selectedScript.parentElement.classList.add(classToApply);
        // selectedScript.parentElement.classList.remove(classToApply);

        generateNewQuestion();
    
        
    })
})
startGame();