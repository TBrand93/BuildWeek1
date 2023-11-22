/* ARRAY CON DOMANDE E RISPOSTE */
const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a letiable to make sure it doesn't get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

/*Timer*/

const dashArray = 283;
const timeLimit = 20;
let timePassed = 0;
let timeLeft = timeLimit;
let timerInterval = null;

document.getElementById("timer").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;

function onTimesUp() {
  clearInterval(timerInterval);
  checkAnswer(false);
  nextQuestion();
}

function startTimer() {
  clearInterval(timerInterval);
  timePassed = 0;

  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = timeLimit - timePassed;
    document.getElementById("base-timer-label").innerHTML =
      formatTime(timeLeft);
    setCircleDasharray();

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  let seconds = time % 60;
  return seconds;
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / timeLimit;
  return rawTimeFraction - (1 / timeLimit) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(calculateTimeFraction() * dashArray).toFixed(
    0
  )} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}



/* FUNZIONE SCALETTA */

/* 
CONTENUTO:
 domande timer Casistica Progresso
 */

/* FUNZIONE QUIZ */
let currentQuestionIndex = 0;
let correctAnswers = 0;

const testDiv = document.getElementById("test");
const resultsDiv = document.getElementById("results");
const domandaElement = document.getElementById("domanda");
const risposteElement = document.getElementById("risposte");
const conteggioElement = document.getElementById("conteggio");
const risultatoElement = document.getElementById("risultato");
const esitoTrueElement = document.getElementById("True");
const esitoTestoElement = document.getElementById("descrizioneEsito");
const graficoElement = document.getElementById("progressChart");
const esitoFalseElement = document.getElementById("False");
const btnQuizElements = document.querySelectorAll(".btnQuiz");


function startQuiz() {
  currentQuestionIndex = 0;
  correctAnswers = 0;
  testDiv.style.display = "block";
  resultsDiv.style.display = "none";
  nextQuestion();
}

function nextQuestion() {
  if (currentQuestionIndex < questions.length) {
    startTimer();
    const currentQuestion = questions[currentQuestionIndex];
    displayQuestion(currentQuestion);
  } else {
    showResults();
  }
}


/* FUNZIONE Casistica */

function displayQuestion(question) {
  domandaElement.textContent = question.question;

  const allAnswers = [...question.incorrect_answers, question.correct_answer];
  const shuffledAnswers = shuffleArray(allAnswers);

  risposteElement.innerText = "";

  shuffledAnswers.forEach((answer) => {
    const button = document.createElement("button");
    button.classList.add("btnQuiz");
    button.innerText = answer;
    button.onclick = () => checkAnswer(answer === question.correct_answer);
    risposteElement.appendChild(button);
  });
  updateConteggio();
}

function checkAnswer(isCorrect) {
  if (isCorrect) {
    correctAnswers++;
  }

  currentQuestionIndex++;
  nextQuestion();
}

function updateConteggio() {
  conteggioElement.textContent = `QUESTION ${currentQuestionIndex + 1} / ${
    questions.length
  }`;
}

/* FUNZIONE PROGRESSO */
function showResults() {
  testDiv.style.display = "none";
  resultsDiv.style.display = "block";

  const domandeSbagliate = questions.length - correctAnswers;

  // Calcola il valore percentuale
  const percentualeCorrette = (correctAnswers / questions.length) * 100;
  const percentualeSbagliate = (domandeSbagliate / questions.length) * 100;

  // Mostra i risultati
  esitoTrueElement.innerHTML = `<h2>Correct<br>${percentualeCorrette.toFixed(
    2
  )}%</h2><br><p>${correctAnswers}/${questions.length} questions</p>`;
  esitoFalseElement.innerHTML = `<h2>Wrong<br>${percentualeSbagliate.toFixed(
    2
  )}%</h2><br><p>${domandeSbagliate}/${questions.length} questions</p>`;

  // Aggiungi il testo dell'esito
  stampaTesto(percentualeCorrette);



  // Grafico

  const ctx = document.getElementById("progressChart");
  const progressChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: [percentualeCorrette, percentualeSbagliate],
          backgroundColor: ["#00FFFF", "#D20094"],
        },
      ],
    },
    options: {
      cutoutPercentage: 80,
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      plugins: {
        doughnutlabel: {
          labels: [
            {
              text:
                percentualeCorrette >= 60
                  ? "Congratulazioni!"
                  : "Hai Sbagliato",
              font: {
                size: "20",
              },
            },
          ],
        },
      },
    },
  });
}

function stampaTesto(percentuale) {
  if (percentuale >= 60) {
    esitoTestoElement.innerText = "Congrats! 😎";
  } else {
    esitoTestoElement.innerText = "Oops 😱";
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Inizia il quiz quando la pagina si carica
window.onload = startQuiz;
