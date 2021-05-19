// Globale variable en contstanten
const startButton = document.getElementById("startBtn");
const noOpinionBtn = document.getElementById("noOpinion");
const previousQuestionBtn = document.getElementById("previousQuestion");
const proBtn = document.getElementById("pro");
const noneBtn = document.getElementById("none");
const contraBtn = document.getElementById("contra");
const secularParties = document.getElementById("secular");
const allParties = document.getElementById("all");
const bigParties = document.getElementById("big");
const homepage = document.getElementById("homepage");
const scenePage = document.getElementById("scenePage");
const importantCheckboxPage = document.getElementById("importantPage");
const partyPage = document.getElementById("partyPage");
const placeContainer = document.getElementById("placeContainer");
const resultPageBtn = document.getElementById("showResultPage");
// const nextBtn = document.getElementById("nextBtn");
const importantStatements = document.getElementById("importantStatements");
var partyPlace = document.getElementsByClassName("place");
var statementOrder = 0;
var sceneTitle = document.getElementById("sceneTitle");
var sceneDescription = document.getElementById("sceneDescription");

startButton.onclick = start;

subjects.forEach((subject) => {
  subject.myAnswer = "";
});

parties.forEach((party) => {
  party.points = 0;
});

/**
 * De Pagina met de vragen word geladen
 */
function start() {
  homepage.style.display = "none";
  scenePage.style.display = "block";

  //Zet de eerste vraag klaar
  sceneTitle.innerHTML = subjects[0].title;
  sceneDescription.innerHTML = subjects[0].statement;
}
/**
 * @param answer De keuze die je hebt gemaakt (pro, none, contra)
 */

proBtn.onclick = function () {
  setAnswer("pro");
};
noneBtn.onclick = function () {
  setAnswer("none");
};
contraBtn.onclick = function () {
  setAnswer("contra");
};

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

function nextStatement() {
  if (statementOrder < subjects.length - 1) {
    statementOrder++;
    //Nieuwe stelling word geladen
    sceneTitle.innerHTML = subjects[statementOrder].title;
    sceneDescription.innerHTML = subjects[statementOrder].statement;
    showAnswer(subjects[statementOrder].myAnswer);
  }
  // Als die bij de laatste vraag is gaat het alle punten bij elkaar optellen
  else importantPage();
}

/**
 * Als de gebruiker op het pijltje terug klikt dan word de vorige vraag geladen
 */
previousQuestionBtn.onclick = previousStatement;

function previousStatement() {
  console.log(statementOrder);
  if (statementOrder !== 0) {
    statementOrder--;
    //Oude stelling word geladen
    sceneTitle.innerHTML = subjects[statementOrder].title;
    sceneDescription.innerHTML = subjects[statementOrder].statement;
    showAnswer(subjects[statementOrder].myAnswer);
  } else {
    //Als ben je bij de laatste vraag wordt de home pagina weer getoond
    scenePage.style.display = "none";
    homepage.style.display = "block";
  }
}

/**
 * Als de gebruiker terug gaat naar een eerder ingevulde vraag word het antwoord wat je daar in hebt gevuld getoond
 * @param answer de mening die je hebt ingevoerd
 */
function showAnswer(answer) {
  var answerbtn = document.getElementsByClassName("answerbtn");
  for (var f = 0; f < answerbtn.length; f++) {
    answerbtn[f].style.background = "white";
  }
  if (answer == "") {
    return;
  } else {
    document.getElementById(answer).style.background = "green";
  }
}
/**
 * 
 */
function importantPage() {
  scenePage.style.display = "none";
  importantCheckboxPage.style.display = "block";

  subjects.forEach((checked) => {
    var checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.classList.add("subjectCheckBox");
    importantStatements.appendChild(checkbox);
    importantStatements.innerHTML += checked.title + "<br>";
  });
}

/**
 * Deze functie zorgt er voor dat de punten bij elkaar worden opgeteld
 */
function calculatePoints() {
  //hier loop je door de subjects
  for (var s = 0; s < subjects.length; s++) {
    //hier loop je door de subject partijen
    for (var p = 0; p < subjects[s].parties.length; p++) {
      // hier pak je je antwoord en vergelijk je antwoord met welke vraag je hebt beantwoord
      if (subjects[s].myAnswer == subjects[s].parties[p].position) {
        //hier worden de punten bij de partij getelt
        var findParty = parties.find(
          (party) => party.name == subjects[s].parties[p].name
        );
          //hier maak ik de checkboxen aan
        var checkboxes = document.getElementsByClassName("subjectCheckBox");
        // hier loop je door de checkbox array
        if (checkboxes[s].checked == true) {
          console.log(findParty);
          findParty.points += 2;
        } else {
          findParty.points += 1;
        }
      }
    }
  }
  displayPartyPage();
}

/**
 * De pagina met een overzicht van de partijen in volgorde van de meeste punten word geladen
 */
function displayPartyPage() {
  //Nieuwe pagina word geladen
  importantCheckboxPage.style.display = "none";
  partyPage.style.display = "block";

  //De partijen worden op volgorde gezet met de meeste punten
  parties.sort((a, b) => b.points - a.points);
  console.log(parties);

  //Hier worden de partijen getoond
    for(s = 0; s < parties.length; s++) {
      var checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      checkbox.classList.add("partyCheckBox");
      partyPage.appendChild(checkbox);
      partyPage.innerHTML += parties[s].name + "<br>";
    }
  }

/** 
 * De Resultaat pagina word geladen 
 */
function displayResultPage() {

  document.getElementById("partyPage").style.display = "none";
  document.getElementById("resultContainer").style.display = "block";

  var checkboxes = document.getElementsByClassName("partyCheckBox");
  var selectedParties = [];
  // doel: top 3 geselcteerde partijen laten zien
  // stappen:
  // 1. uitvogelen welke we hebben geselecteerd
  // 2. deze partijen laten zien op de html pagina
  for(c = 0; c < checkboxes.length; c++) {
    if(checkboxes[c].checked == true) {
      selectedParties.push(parties[c].name)
    }
  }
  for(partyIndex = 0; partyIndex < selectedParties.length; partyIndex++) {
    var partyElement = document.createElement("p");
    placeContainer.appendChild(partyElement);
    partyElement.innerHTML = selectedParties[partyIndex];
    console.log(placeContainer);
  }
  console.log(selectedParties);

    // for(c = 0; c <= 2; c++){
    //   if(checkboxes.checked == true){
    //     selectedParties.push(checkboxes[c].name)
    //     partyPlace[c].innerHTML += selectedParties[c]
    //     console.log(selectedParties);
    //   }
    // }
}
