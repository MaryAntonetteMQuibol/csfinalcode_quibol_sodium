const questions = [
  {
    question: "What do you think is the first way in showing interest towards your peers?",
    options: ["Ignore them", "Tell them mean things", "Show some friendly intent", "Leave them be"],
    answer: "Show some friendly intent"
  },
  {
    question: "How do you clear out misunderstandings?",
    options: ["Owe up to your mistakes", "Blame everyone for it", "Pin-point people", "Leave it be"],
    answer: "Owe up to your mistakes"
  },
  {
    question: "In what way do you think you can promote peace to everyone?",
    options: ["Post mean things on social media", "Make posters about a peaceful society within your neighbourhood", "Trashtalk everyone", "I don't want to spread peace"],
    answer: "Make posters about a peaceful society within your neighbourhood"
  },
  {
    question: "How often do you want to speak with your peers?",
    options: ["Never.", "Sometimes", "As much as I can", "I don't like talking to my peers"],
    answer: "As much as I can"
  },
  {
    question: "Do you think the world will become better just by sharing this site?",
    options: ["No","Perhaps","Yes","Sharing it is worth a try"],
    answer: "Sharing it is worth a try"
  }
];

let currentQuestionIndex = 0;
let score = 0;
let answeredQuestions = [];

function displayQuestion(index) {
  const questionsDiv = document.getElementById("questions");
  questionsDiv.innerHTML = "";

  const q = questions[index];
  const questionDiv = document.createElement("div");
  questionDiv.classList.add("question");
  questionDiv.innerHTML = `<p>${index + 1}. ${q.question}</p>`;

  q.options.forEach(option => {
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `question`;
    radio.value = option;
    const label = document.createElement("label");
    label.textContent = option;
    questionDiv.appendChild(radio);
    questionDiv.appendChild(label);
    questionDiv.appendChild(document.createElement("br"));
  });
  questionsDiv.appendChild(questionDiv);
  updateButtonVisibility();
}

function nextQuestion() {
  const selectedOption = document.querySelector(`input[name="question"]:checked`);
  if (!selectedOption) {
    alert("Please select an answer.");
    return;
  }
  answeredQuestions[currentQuestionIndex] = selectedOption.value;

  if (selectedOption.value === questions[currentQuestionIndex].answer) {
    score++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    displayQuestion(currentQuestionIndex);
  } else {
    document.getElementById("nextButton").classList.add("hidden");
    document.getElementById("submitButton").classList.remove("hidden");
    displayResults();
  }
}

function previousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion(currentQuestionIndex);
  }
}

function calculateScore() {
  displayResults();
  const resultDiv = document.getElementById("result");
  resultDiv.textContent = `You scored ${score} out of ${questions.length}.`;
}

function displayResults() {
  const questionsDiv = document.getElementById("questions");
  questionsDiv.innerHTML = "";
  questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");
    questionDiv.innerHTML = `<p>${index + 1}. ${q.question}</p>`;
    q.options.forEach(option => {
      const label = document.createElement("label");
      label.textContent = option;
      if (option === q.answer) {
        label.classList.add("correct");
      } else if (option === answeredQuestions[index]) {
        label.classList.add("incorrect");
      }
      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement("br"));
    });
    questionsDiv.appendChild(questionDiv);
  });
  updateButtonVisibility();
}

function updateButtonVisibility() {
    const prevButton = document.getElementById("prevButton");
    if(currentQuestionIndex === 0){
        prevButton.classList.add("hidden");
    } else {
        prevButton.classList.remove("hidden");
    }
}

displayQuestion(currentQuestionIndex);