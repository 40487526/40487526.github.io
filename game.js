const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("btn"));
var vidUrl = document.getElementById("myVideo");
const nextButton = document.getElementById("next_btn");
var a = document.getElementById('next_btn');

var class_name1 = 'correct';
var class_name2 = 'incorrect';
elements1 = document.getElementsByClassName(class_name1)
elements2 = document.getElementsByClassName(class_name2)

let currentQuestion = {};
let questionCounter = 0;
let availableQuestions = [];
const max_questions = 4;

//array of questions and answers and their respective video
let questions = [{
        question: 'Is this cake or a shoe?',
        choice1: "Cake",
        choice2: "Shoe",
        videoLinkShort: "/videos/shoecake_start.mp4",
        videoLinkFull: "/videos/shoecake_full.mp4",
        answer: 1

    },
    {
        question: 'Is this cake or some loo roll?',
        choice1: "Cake",
        choice2: "Loo Roll",
        videoLinkShort: "/videos/loorollcake_start.mp4",
        videoLinkFull: "/videos/loorollcake_full.mp4",
        answer: 1

    },
    {
        question: 'Is this cake or a bar of soap?',
        choice1: "Cake",
        choice2: "Soap",
        videoLinkShort: "/videos/soapreal_start.mp4",
        videoLinkFull: "/videos/soapreal_full.mp4",
        answer: 2

    },
    {
        question: 'Is this cake or a banana',
        choice1: "Cake",
        choice2: "Banana",
        videoLinkShort: "/videos/bananareal_start.mp4",
        videoLinkFull: "/videos/bananareal_full.mp4",
        answer: 1

    }
];


startGame = () => {

    questionCounter = 0;
    availableQuestions = [...questions];
    newQuestion();
};

newQuestion = () => {

    //hides the next button and removes any of the incorrect or correct classes any element may have
    nextButton.classList.add("hidden")
    for (element of elements1) {
        element.classList.remove(class_name1)
    }
    for (element of elements2) {
        element.classList.remove(class_name2)
    }

    questionCounter++;
    //randomises the question that will be shown next
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];

    //takes the question from the index and puts it into the text of the question container
    question.innerText = currentQuestion.question;
    //adds the video into the video container from the source from the questions array
    vid_UrlSrc = currentQuestion.videoLinkShort;
    vidUrl.src = vid_UrlSrc;

    //for each button there is, the correct answer will be shown in the correct location. 
    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);

    userChoice();
};

function userChoice() {


    let userClicked = false;

    choices.forEach((choice) => {

        choice.addEventListener('click', e => {
            //checks to see if the user has clicked on any choice yet and if so leave the forEach loop
            if (userClicked === true) {
                return; //https://masteringjs.io/tutorials/fundamentals/foreach-break
            }

            //puts in the all of the properties the button the user clicked had into selectedChoice 
            //to be able to determine if they selected the correct or incorrect answer based on the 
            const userSelectedChoice = e.target;
            const selectedAnswer = userSelectedChoice.dataset['number'];

            //this is an operator which works as a if else, if the answer the user selects matches the answer from the array
            //then the correct class will be applied, otherwise incorrect will
            const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

            userSelectedChoice.classList.add(classToApply);
            userClicked = true;

            nextButton.classList.remove("hidden");

            if (availableQuestions.length === 0 || questionCounter >= max_questions) {
                vid_UrlSrc = currentQuestion.videoLinkFull;
                vidUrl.src = vid_UrlSrc;
                nextButton.innerText = "Finish"
                goHome()

            } else {
                vid_UrlSrc = currentQuestion.videoLinkFull;
                vidUrl.src = vid_UrlSrc;
                nextButton.addEventListener('click', newQuestion);
            }

        });


    });
}

function goHome() {
    //waits for user to click on the next button to take back to home page
    nextButton.addEventListener('click', e => {
        window.location.assign("/home.html");
    });
}

startGame();