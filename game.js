const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("btn"));
var vidUrl = document.getElementById("myvideo");
const nextButton = document.getElementById("next_btn");
var a = document.getElementById('next_btn');

var class_name1 = 'correct';
var class_name2 = 'incorrect';
elements1=document.getElementsByClassName(class_name1)
elements2=document.getElementsByClassName(class_name2)

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
   ];
   
   //constants
   const CORRECT_BONUS = 10;
   const MAX_QUESTIONS = 4;

   startGame = () => {

    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
   };

   getNewQuestion = () => {
    nextButton.classList.add("hidden")
    for(element of elements1){
        element.classList.remove(class_name1)
      }
      for(element of elements2){
        element.classList.remove(class_name2)
      }
console.log(questionCounter);

    console.log(questionCounter);
    questionCounter++;
    
    // if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    //     nextButton.innerText = "Finish"
    //    }
   
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    console.log(questionCounter);
    question.innerText = currentQuestion.question; //question is the class id
    vidUrlSrc = currentQuestion.videoLinkShort;
    vidUrl.src = vidUrlSrc;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
       choice.innerText = currentQuestion['choice' + number];
    });
    
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
    endJS();
};

function endJS() {


choices.forEach((choice) => {
    choice.addEventListener('click', e => {

        if (!acceptingAnswers) return;
        
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
       
        selectedChoice.classList.add(classToApply);

        vidUrlSrc = currentQuestion.videoLinkFull;
        vidUrl.src = vidUrlSrc;
        
        console.log(questionCounter);
    nextButton.classList.remove("hidden");

    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        nextButton.innerText = "Finish"
        goHome()
        
        } else {
            nextButton.addEventListener('click', getNewQuestion);
        }
    
 
    });
});
function goHome() {
    nextButton.addEventListener('click', e => {
    window.location.assign("/index.html");
    
});
}}


startGame();
// setTimeout(() => {
    //     selectedChoice.classList.remove(classToApply);
    //     getNewQuestion();
    //   }, 1000);