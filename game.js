const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("btn"));
var vidUrl = document.getElementById("myvideo");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'Is this cake or a shoe?',
      choice1: "Cake",
      choice2: "Shoe",
      videoLinkShort: "shoecake_start.mp4",
      videoLinkFull: "shoecake_full.mp4",
      answer: 1
        
     },
     {
        question: 'Is this cake or some loo roll?',
      choice1: "Cake",
      choice2: "Loo Roll",
      videoLinkShort: "loorollcake_start.mp4",
      videoLinkFull: "loorollcake_full.mp4",
      answer: 1

     },
     {
        question: 'Is this cake or a bar of soap?',
      choice1: "Cake",
      choice2: "Soap",
      videoLinkShort: "soapreal_start.mp4",
      videoLinkFull: "soapreal_full.mp4",
      answer: 2

     },
     {
        question: 'Is this cake or a banana',
      choice1: "Cake",
      choice2: "Banana",
      videoLinkShort: "bananareal_start.mp4",
      videoLinkFull: "bananareal_full.mp4",
      answer: 1

     }
   ]
   
   //constants
   const CORRECT_BONUS = 10;
   const MAX_QUESTIONS = 4;

   startGame = () => {

    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();

   };

   getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //go to the end page
        return window.location.assign('/index.html');
    }
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];

    question.innerText = currentQuestion.question; //question is the class id
    vidUrlSrc = currentQuestion.videoLinkShort;
    vidUrl.src = vidUrlSrc;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = selectedAnswer != currentQuestion.answer ? "correct" : "incorrect";

        selectedChoice.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
        
    });
});

startGame();
