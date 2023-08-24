// ! -------------------------------- GESTION DES CARTES ---------------------------------------------------- 

// Création d'un tableau pour stocker les cartes
let cards = [];

// Tableau contenant les images pour les cartes
let cardImages = [
  "img/ant_man.jpg",
  "img/black_panther.jpg",
  "img/black_widow.jpg",
  "img/captain_america.jpg",
  "img/captain_marvel.jpg",
  "img/doctor_strange.jpg",
  "img/drax.jpg",
  "img/falcon.jpg",
  "img/gamora.jpg",
  "img/groot.jpg",
  "img/hawkeye.jpg",
  "img/hulk.jpg",
  "img/iron_man.jpg",
  "img/loki.jpg",
  "img/mighty_thor.jpg",
  "img/rocket_raccoon.jpg",
  "img/scarlett_witch.jpg",
  "img/spiderman.jpg",
  "img/star_lord.jpg",
  "img/vision.jpg",
  "img/valkyrie.jpg",
  "img/war_machine.jpg",
  "img/wasp.jpg",
  "img/winter_soldier.jpg",
];

// Stocker les cartes retournées
let returnedCard = [];

// Stocker les paires de cartes trouvées
let matchedCards = [];

// Mélanger le tableau de cartes
function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function createCards() {
  // Mélanger les images des cartes
  cardImages = shuffle(cardImages.concat(cardImages));

  // Créer les cartes
  for (let i = 0; i < cardImages.length; i++) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.dataset.cardIndex = i;
    card.dataset.card;

    // Ajouter l'image de dos pour toutes les cartes
    card.style.backgroundImage = "url(img/back.jpg)";
    // Ajouter la carte créer au game board
    document.getElementById("game-board").appendChild(card);
    cards.push(card);

    // Ajouter l'écouteur d'événement pour retourner la carte
    card.addEventListener("click", flipCard);
  }
}

// Créer une variable pour stocker le nombre de coups
let numMoves = 0;

// Incrémenter le nombre de coups et mettre à jour l'affichage
function incrementMoves() {
  numMoves++;
  document.getElementById("num-moves").textContent = "Nombres de coups : " + numMoves;
}

// Retourner une carte
function flipCard() {
  // Si la carte est déjà retournée ou si deux cartes ont déjà été retournées, ne rien faire
  if (returnedCard.length === 2 || this.classList.contains("flipped")) {
    return;
  }
  
  // Ajouter la carte au tableau des cartes retournées
  incrementMoves(); // Appel de la fonction pour incrementer le compteur de coup
  returnedCard.push(this);
  this.classList.add("flipped");
  this.style.backgroundImage = `url(${cardImages[this.dataset.cardIndex]})`;

  // Si deux cartes ont été retournées, vérifier si elles sont identiques
  if (returnedCard.length === 2) {
        if (returnedCard[0].style.backgroundImage === returnedCard[1].style.backgroundImage) {
      // Si les cartes sont identiques, ajouter les deux cartes au tableau des paires trouvées
      matchedCards.push(returnedCard[0], returnedCard[1]);
      returnedCard = [];
    } else {
      // Si les cartes ne sont pas identiques, retourner les cartes après un court délai
      setTimeout(() => {
        returnedCard[0].classList.remove("flipped");
        returnedCard[0].style.backgroundImage = `url(img/back.jpg)`;
        returnedCard[1].classList.remove("flipped");
        returnedCard[1].style.backgroundImage = `url(img/back.jpg)`;
        returnedCard = [];
      }, 1000);
    }
  }
}

// ! -------------------------------- TIMER ---------------------------------------------------- 

// const GAME_TIME = 3* 60; // Temps de jeu 3minutes
const GAME_TIME = 6; // ! 5sec pour les TEST
let timeLeft = GAME_TIME; // Temps restant en secondes

// Mettre à jour l'affichage du timer
function updateTimer() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  document.getElementById("time-left").textContent = "Temps restant : " + `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// Décrémenter le temps restant toutes les secondes
function launchTimer() {
  let timerInterval = setInterval(() => {
    timeLeft--;
    updateTimer();
  
    // Si le temps est écoulé, afficher GAME OVER
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      // Envoi de la fonction GAME OVER
      gameOver();
    }
  
    // Vérifier si toutes les paires ont été trouvées
    if (matchedCards.length === cardImages.length) {
      // Arrêter le timer
      clearInterval(timerInterval); 
      // le User a réussi lancer la fonction VICTORY
      victory();
    }
  }, 1000);
};

// ! -------------------------------- DEMARRAGE DU JEU ---------------------------------------------------- 

// Appel de la fonction pour créer les cartes au chargement de la page
function startGame() {
  // Récupération des éléments HTML par leur ID 
  let rulesDisplay = document.getElementById("welcome");
  let audio = document.getElementById("mainTheme");

  // Cacher les regles et création des cartes de jeu et lancement du timer
  rulesDisplay.style.display="none";
  createCards();
  launchTimer();

  // Lancer l'audio pour la durée du jeu  
  if (audio.readyState === 4){
    audio.play()
  }
}

// ! -------------------------------- VICTOIRE OU DEFAITE ---------------------------------------------------- 

// Enlever toutes les cartes et afficher la vidéo GAME OVER
function gameOver(){
  // Récupération des éléments HTML par leur ID 
  let video = document.getElementById("snapThanos");
  let gameboard = document.getElementById("game-board");
  let gameOver = document.getElementById("gameOver");
  let newGame = document.getElementById("newGame");
  // Changement du display des éléments afin de cacher/afficher
  gameboard.style.display="none";
  video.style.display="block";
  // Si la vidéo est chargée alors lancer la lecture
  if (video.readyState === 4){
    video.play()
  }
  // Instancier un timeout le temps de la vidéo 
  setTimeout(()=>{
    // pour la faire disparaitre a nouveau
    video.style.display="none";
    // afficher le message GAME OVER et la possibilité de relancer une partie 
    gameOver.style.display="block";
    newGame.style.display="block";
  },10000)
}

// Fonction pour enlever toutes les cartes et afficher la vidéo victoire
function victory(){
  // Récupération des éléments HTML par leur ID 
  let video = document.getElementById("thanosDeath");
  let gameboard = document.getElementById("game-board");
  let victory = document.getElementById("victory");
  let newGame = document.getElementById("newGame");
  // Changement du display des éléments afin de cacher/afficher
  gameboard.style.display="none";
  video.style.display="block";
  // Si la vidéo est chargée alors lancer la lecture
  if (video.readyState === 4){
    video.play()
  }
  // Instancier un timeout le temps de la vidéo
  setTimeout(()=>{
    // pour la faire disparaitre a nouveau
    video.style.display="none";
    // afficher l'image victoire et la possibilité de relancer une partie 
    victory.style.display="block";
    newGame.style.display="block";
  },10000)
}