
const startButton = document.getElementById("startBtn");
const noOpinionBtn = document.getElementById("noOpinion")
var statementOrder = 0;
var sceneTitle = document.getElementById("sceneTitle");
var sceneDescription = document.getElementById("sceneDescription");

startButton.onclick = Start;

//Deze foreach looped door de subjects en voegt de objecten toe
subjects.forEach(subject=> {
    subject.myAnswer = '';
  });

function Start() {
    document.getElementById("homepage").style.display = "none";
    document.getElementById("scenePage").style.display = "block";

    //Zet de eerste vraag klaar
    sceneTitle.innerHTML = subjects[0].title;
    sceneDescription.innerHTML = subjects[0].statement;  
}

/**
 * @param answer De keuze die je hebt gemaakt (pro, none, contra)
 */
 function setAnswer(answer) {
    //De mening word toegevoegd aan answer
    subjects[statementOrder].myAnswer = answer;
    //Nieuwe functie word uitgevoerd
    nextStatement();
  }

  noOpinionBtn.onclick = nextStatement;
  
function nextStatement() {
    if(statementOrder < subjects.length -1){
      statementOrder++;
      //Nieuwe stelling word geladen
      sceneTitle.innerHTML = subjects[statementOrder].title;
      sceneDescription.innerHTML = subjects[statementOrder].statement;
    }
  }