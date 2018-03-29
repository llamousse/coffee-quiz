let numQuestion = 0;
let score = 0;

function questionList () {
  let len = STORE.length;
  if (numQuestion < len) {
    return `<div class="question-${numQuestion}">
    <h2>${STORE[numQuestion].question}</h2>
    <form>
    <fieldset>
    <legend>Please select from the following answers:</legend>
    <label class="answerOption">
    <input type="radio" value="${STORE[numQuestion].answers[0]}" name="answer" required>
    <span>${STORE[numQuestion].answers[0]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[numQuestion].answers[1]}" name="answer" required>
    <span>${STORE[numQuestion].answers[1]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[numQuestion].answers[2]}" name="answer" required>
    <span>${STORE[numQuestion].answers[2]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[numQuestion].answers[3]}" name="answer" required>
    <span>${STORE[numQuestion].answers[3]}</span>
    </label>
    <button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </form>
    </div>`
  } else {
    renderLastPage();
    quizRestart();
    $('.numQuestion').text(10);
  }
}

function startQuiz () {
  $('.introStart').on('click', '.buttonStart', function(event) {
  $('.introStart').remove();
  // $('.formQA').remove();
  $('.formQA').css('display', 'block');
  $('.numQuestion').text(1);
  });
}

function renderQuestion () {
  $('.formQA').html(questionList()); 
}

function selectAnswer () {
  $('form').on('submit', function(event) {
    event.preventDefault();
    let val = $('input:checked').val();
    let rightAns = `${STORE[numQuestion].correct}`;
    
    if (val === rightAns) {
      correctAnswer();
    } 
    else {
        wrongAnswer();  
    }
  });
}

function correctAnswer() {
  score++;
  $('.score').text(score);
  $('.formQA').html(`<h1>OH YES, YOU SMART.</h1><div style="text-align:center;"><img class="feedback-img" src="https://media0.giphy.com/media/vIqU5gwdCPKO4/giphy.gif" alt="happy alpaca correct answer" /></div><div style="text-align:center;"><button type="button" class="nextPls">Next</button></div>`);
  
}

function wrongAnswer() {
  $('.formQA').html(`<h1>MEH, WRONG - YOU NEED SOME COFFEE.</h1><h2>Pst. Click the cat to start over. <br/>The correct answer is: ${STORE[numQuestion].correct}</h2><div style="text-align:center;"><img class="feedback-img" src="https://media0.giphy.com/media/wofftnAdDtx4s/giphy.gif" alt="wrong answer" /><div style="text-align:center;"><button type="button" class="nextPls">Next</button></div>`);
}

function nextQuestion () {
  $('main').on('click', '.nextPls', function(event) {
    updateQuestion();
    renderQuestion();
    selectAnswer();
  });
}

function updateQuestion() {
  numQuestion++;
  $('.numQuestion').text(numQuestion+1);
}

function renderLastPage() {
  $('.formQA').html(`<h1>Nice, you reached the end! Your total score is: ${score}/10</h1><div style="text-align:center;"><img src="https://media.giphy.com/media/NHUONhmbo448/giphy.gif" alt="insert coffee to continue end gif"/></div><div style="text-align:center;"><button type="button" class="restart">Start Over</button></div>`);
  
}

function quizRestart() {
  $('main').on('click', '.restart', function(event) {
    location.reload();
  });
}

function handleQuiz () {
  // starting quiz
  startQuiz();
  // loading the questions
  renderQuestion();
  // selecting the answer
  selectAnswer();
  nextQuestion();
}

$(handleQuiz);