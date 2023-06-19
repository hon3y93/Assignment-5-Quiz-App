const quizForm = document.getElementById('quiz-form');
const scoreElement = document.getElementById('score');
const questionsContainer = document.getElementById('questions-container');
let questions;

// Fetch quiz data from API
fetch('https://5d76bf96515d1a0014085cf9.mockapi.io/quiz')
  .then(response => response.json())
  .then(data => {
    questions = data;

    // Render questions
    questions.forEach((question, index) => {
      const questionElement = document.createElement('div');
      questionElement.className = 'question';
      questionElement.innerHTML = `
        <p>${index + 1}. ${question.question}</p>
      `;

      const optionsContainer = document.createElement('div');
      optionsContainer.className = 'options';

      question.options.forEach(option => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `question-${index}`;
        input.value = option;

        label.appendChild(input);
        label.appendChild(document.createTextNode(option));

        optionsContainer.appendChild(label);
      });

      questionElement.appendChild(optionsContainer);
      questionsContainer.appendChild(questionElement);
    });
  });

// Submit quiz form
quizForm.addEventListener('submit', e => {
  e.preventDefault();

  const selectedAnswers = Array.from(new FormData(quizForm)).map(entry => entry[1]);

  const score = calculateScore(selectedAnswers);
  scoreElement.textContent = `Score: ${score}/${questionsContainer.children.length}`;
});

// Calculate score
function calculateScore(selectedAnswers) {
  let score = 0;

  selectedAnswers.forEach((selectedAnswer, index) => {
    const question = questions[index];
    if (selectedAnswer === question.options[question.answer - 1]) {
      score++;
    }
  });

  return score;
}