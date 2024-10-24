const readline = require('readline');

// Set up readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Quiz data: 10 questions with 4 possible answers each
const quizQuestions = [
    { question: 'What is the capital of France?', options: ['a) Paris', 'b) London', 'c) Berlin', 'd) Madrid'], answer: 'a' },
    { question: 'Which planet is known as the Red Planet?', options: ['a) Earth', 'b) Mars', 'c) Jupiter', 'd) Venus'], answer: 'b' },
    { question: 'What is the largest ocean?', options: ['a) Atlantic', 'b) Indian', 'c) Arctic', 'd) Pacific'], answer: 'd' },
    { question: 'Who wrote "Hamlet"?', options: ['a) Charles Dickens', 'b) Mark Twain', 'c) William Shakespeare', 'd) J.K. Rowling'], answer: 'c' },
    { question: 'Which element has the chemical symbol "O"?', options: ['a) Oxygen', 'b) Gold', 'c) Silver', 'd) Iron'], answer: 'a' },
    { question: 'What is the hardest natural substance?', options: ['a) Gold', 'b) Iron', 'c) Diamond', 'd) Platinum'], answer: 'c' },
    { question: 'Which country hosted the 2016 Summer Olympics?', options: ['a) China', 'b) Brazil', 'c) Russia', 'd) UK'], answer: 'b' },
    { question: 'What is the largest mammal?', options: ['a) Elephant', 'b) Blue Whale', 'c) Giraffe', 'd) Rhino'], answer: 'b' },
    { question: 'How many continents are there?', options: ['a) 5', 'b) 6', 'c) 7', 'd) 8'], answer: 'c' },
    { question: 'What is the square root of 144?', options: ['a) 10', 'b) 11', 'c) 12', 'd) 13'], answer: 'c' },
];

let currentQuestionIndex = 0;
let score = 0;
let totalQuizTime = 100; // Total quiz duration (seconds)
let questionTime = 10; // Time for each question (seconds)
let globalTimer, questionTimer;

// Helper function to display the next question
function askQuestion() {

    const { question, options } = quizQuestions[currentQuestionIndex];
    console.log(`\nQuestion ${currentQuestionIndex + 1}: ${question}`);
    options.forEach(option => console.log(option));

    questionTime = 10;
    questionTimer = setInterval(() => {
        questionTime--;
        process.stdout.write(`\rTime remaining: ${questionTime} seconds`);
        if (questionTime <= 0) {
            clearInterval(questionTimer);
            console.log('\nTime\'s up for this question!');
            moveToNextQuestion(); // Proceed to the next question
        }
    }, 1000);

    rl.question('\nYour answer: ', handleAnswer);
}

// Function to handle user's answer input
function handleAnswer(answer) {
    clearInterval(questionTimer);
    const correctAnswer = quizQuestions[currentQuestionIndex].answer.toLowerCase();

    if (answer.toLowerCase() === correctAnswer) {
        score++;
        console.log('Correct!\n');
    } else {
        console.log(`Wrong! The correct answer was: ${correctAnswer.toUpperCase()}\n`);
    }
    
    moveToNextQuestion();
}



// Start the quiz
startQuiz();
