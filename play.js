const question = document.getElementById("question");
console.log(question)

// splits each selective answer in an array, example = ["17", "11", "19", "21"]
const options = Array.from(document.getElementsByClassName("option-text"));
console.log(options)

let currentQuestion = {};
let acceptingAnswers = true;
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
    questionCounter++;
    randomQuestionIndex = Math.floor(Math.random() * availableQuestions.length);
    console.log("The index is " + randomQuestionIndex);
    chosenQuestion = availableQuestions[randomQuestionIndex];
    console.log("The question " + chosenQuestion.question)
    question.innerText = chosenQuestion.question
    console.log(question.innerText)
    
    options.forEach(option => {
        // grabs value connected to data-number in html
        const number = option.dataset['number'];
        console.log(number)
    
        // grabs each answer 
        option.innerText = chosenQuestion['option' + number];

    })
}
startGame();