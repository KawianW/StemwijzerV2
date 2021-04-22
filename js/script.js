// Globale variable en contstanten
const startButton = document.getElementById("startBtn");
const noOpinionBtn = document.getElementById("noOpinion");
const previousQuestionBtn = document.getElementById("previousQuestion");
const proBtn = document.getElementById("pro");
const noneBtn = document.getElementById("none");
const contraBtn = document.getElementById("contra");
var statementOrder = 0;
var sceneTitle = document.getElementById("sceneTitle");
var sceneDescription = document.getElementById("sceneDescription");
var answerQuistjion = [];

startButton.onclick = start;

subjects.forEach(subject=> {
  subject.myAnswer = '';
});

parties.forEach(party =>{
  party.points = 0;
})

/**
 * De Pagina met de vragen word geladen
 */
function start() {
  document.getElementById("homepage").style.display = "none";
  document.getElementById("scenePage").style.display = "block";

  //Zet de eerste vraag klaar
  sceneTitle.innerHTML = subjects[0].title;
  sceneDescription.innerHTML = subjects[0].statement;
}
/**
 * @param answer De keuze die je hebt gemaakt (pro, none, contra)
 */

 proBtn.onclick = function() {setAnswer('pro')};
 noneBtn.onclick = function() {setAnswer('none')};
 contraBtn.onclick = function() {setAnswer('contra')};
 

function setAnswer(answer) {
  //De mening word toegevoegd aan answer
  subjects[statementOrder].myAnswer = answer;
  //Nieuwe functie word uitgevoerd
  nextStatement();
}


/**
 * Nieuwe stelling word geladen, wanneer je bij de laatste vraag bent word er een functie aangeroepen.
 */

 noOpinionBtn.onclick = nextStatement;

function nextStatement(){
  if(statementOrder < subjects.length -1){
    statementOrder++;
    //Nieuwe stelling word geladen
    sceneTitle.innerHTML = subjects[statementOrder].title;
    sceneDescription.innerHTML = subjects[statementOrder].statement;
    showAnswer(subjects[statementOrder].myAnswer);
  }
  // Als die bij de laatste vraag is gaat het alle punten bij elkaar optellen
  else (calculatePoints());
}

/**
 * Als de gebruiker op het pijltje terug klikt dan word de vorige vraag geladen 
 */

previousQuestionBtn.onclick = previousStatement;

  function previousStatement(){
    console.log(statementOrder);
    if(statementOrder !== 0){
        statementOrder--;
        //Oude stelling word geladen
        sceneTitle.innerHTML = subjects[statementOrder].title;
        sceneDescription.innerHTML = subjects[statementOrder].statement;
        showAnswer(subjects[statementOrder].myAnswer);
    }else{
      //Als ben je bij de laatste vraag wordt de home pagina weer getoond
        document.getElementById("scenePage").style.display = "none";
        document.getElementById("homepage").style.display = "block";
    }
}

/**
 * Als de gebruiker terug gaat naar een eerder ingevulde vraag word het antwoord wat je daar in hebt gevuld getoond
 * @param answer de mening die je hebt ingevoerd
 */
function showAnswer(answer) {
  var answerbtn = document.getElementsByClassName('answerbtn');
  for(var f = 0; f < answerbtn.length; f++) {
    answerbtn[f].style.background = 'white';
  }
  if(answer == ''){
    return
  } else {
    document.getElementById(answer).style.background = 'green';
  }
}

/**
 * Deze functie zorgt er voor dat de punten bij elkaar worden opgeteld
 */
function calculatePoints() {
  //hier loop je door de subjects
  for(var s=0; s<subjects.length; s++) {
    //hier loop je door de subject partijen
    for(var p=0; p<subjects[s].parties.length; p++) {
      // hier pak je je antwoord en vergelijk je antwoord met welke vraag je hebt beantwoord
      if(subjects[s].myAnswer == subjects[s].parties[p].position) {
        //hier worden de punten bij de partij getelt
        var findParty = parties.find(party => party.name == subjects[s].parties[p].name);

        
          findParty.points +=1;
      }
    }
  }
}



