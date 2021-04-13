// Globale variable en contstanten
const startButton = document.getElementById("startBtn");
const noOpinionBtn = document.getElementById("noOpinion");
const previousQuestionBtn = document.getElementById("previousQuestion");
var statementOrder = 0;
var sceneTitle = document.getElementById("sceneTitle");
var sceneDescription = document.getElementById("sceneDescription");

startButton.onclick = Start;

//Deze foreach looped door de subjects en voegt de objecten toe
subjects.forEach((subject) => {
  subject.myAnswer = "";
});

function Start() {
  document.getElementById("homepage").style.display = "none";
  document.getElementById("scenePage").style.display = "block";

  //Zet de eerste vraag klaar
  sceneTitle.innerHTML = subjects[0].title;
  sceneDescription.innerHTML = subjects[0].statement;
}

/**
 * @param answer Is de keuze die je hebt gemaakt (pro, none, contra)
 */
function setAnswer(answer) {
  //De mening word toegevoegd aan answer
  subjects[statementOrder].myAnswer = answer;
  //Nieuwe functie word uitgevoerd
  nextStatement();
}

noOpinionBtn.onclick = nextStatement;

function nextStatement() {
  if (statementOrder < subjects.length - 1) {
    statementOrder++;
    //Nieuwe stelling word geladen
    sceneTitle.innerHTML = subjects[statementOrder].title;
    sceneDescription.innerHTML = subjects[statementOrder].statement;
  }
}

previousQuestionBtn.onclick = previousStatement;

function previousStatement() {
  if (statementOrder !== 0) {
    statementOrder--;
    //Oude stelling word geladen
    sceneTitle.innerHTML = subjects[statementOrder].title;
    sceneDescription.innerHTML = subjects[statementOrder].statement;
    showAnswer(subjects[statementOrder].myAnswer);
  } else {
    //Als ben je bij de laatste vraag wordt de home pagina weer getoond
    document.getElementById("scenePage").style.display = "none";
    document.getElementById("homepage").style.display = "block";
  }
}

/**
 * Als de gebruiker terug gaat naar een eerder ingevulde vraag word het antwoord wat je daar in hebt gevuld getoond
 * @param answer Is de mening die je hebt ingevoerd
 */
var answerbtn = document.getElementsByClassName("answerbtn");
function showAnswer(answer) {
  for (var f = 0; f < answerbtn.length; f++) {
    answerbtn[f].style.background = "red";
  }
  if (answer == "") {
    return false;
  } else {
    document.getElementById(answer).style.background = "green";
  }
}
