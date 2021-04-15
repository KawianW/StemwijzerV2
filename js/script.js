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

parties.forEach(party =>{
    party.points = 0;
  })

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
    showAnswer(subjects[statementOrder].myAnswer);
  }
  // Als die bij de laatste vraag is gaat het alle punten bij elkaar optellen
  else (calculatePoints());
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
    answerbtn[f].style.background = "white";
  }
  if (answer == "") {
    return false;
  } else {
    document.getElementById(answer).style.background = "green";
  }
}

/**
 * Deze functie zorgt er voor dat de punten bij elkaar worden opgeteld
 */
function calculatePoints() {
    // Hier loop je door de subjects
    for(var s = 0; s < subjects.length; s++) {
        // Hier loop je door de subject partijen
        for(var p = 0; p < subjects[s].parties.length; p++) {
            // hier pak je je antwoord en vergelijk je antwoord met welke vraag je hebt beantwoord
            if(subjects[s].myAnswer == subjects[s].parties[p].position) {
                //hier worden de punten nij de partij getelt
                var findParty = parties.find(party => party.name == subjects[s].parties[p].name);

                findParty.points +=1;
            }
        }
    }
}
