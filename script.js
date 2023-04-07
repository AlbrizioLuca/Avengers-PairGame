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
  "img/thanos.jpg",
  "img/vision.jpg",
  "img/valkyrie.jpg",
  "img/war_machine.jpg",
  "img/wasp.jpg",
  "img/winter_soldier.jpg",
];

// Tableau pour stocker les cartes retournées
let returnedCard = [];

// Tableau pour stocker les paires de cartes trouvées
let matchedCards = [];

// Fonction pour mélanger le tableau de cartes
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

    // Ajouter l'écouteur d'événement pour retourner la carte
    card.addEventListener("click", flipCard);

    document.getElementById("game-board").appendChild(card);
    cards.push(card);
  }
}

// Créer une variable pour stocker le nombre de coups
let numMoves = 0;

// Fonction pour incrémenter le nombre de coups et mettre à jour l'affichage
function incrementMoves() {
  numMoves++;
  document.getElementById("num-moves").textContent = "Nombres de coups : " + numMoves;
}

// Ajouter un timer de 5 minutes
const GAME_TIME = 5* 60; // Temps de jeu en secondes
// const GAME_TIME = 5; // !Temps de jeu en secondes
let timeLeft = GAME_TIME; // Temps restant en secondes

// Fonction pour mettre à jour l'affichage du timer
function updateTimeLeft() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  document.getElementById("time-left").textContent = "Temps restant : " + `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// Décrémenter le temps restant toutes les secondes
let timerInterval = setInterval(() => {
  timeLeft--;
  updateTimeLeft();

  // Si le temps est écoulé, afficher GAME OVER
  if (timeLeft === 0) {
    clearInterval(timerInterval);
    // alert("GAME OVER, vous avez perdu!");
    gameOver();
  }

  // Vérifier si toutes les paires ont été trouvées
  if (matchedCards.length === cardImages.length) {
    // Arrêter le timer
    clearInterval(timerInterval); 
    // Afficher message de victoire
    alert("Bravo, vous avez gagné!");
  }
}, 1000);

// Fonction pour enlever toutes les cartes et afficher la vidéo GAME OVER
function gameOver(){
  // Récupération des éléments HTML par leur ID 
  let video = document.getElementById("snapThanos");
  let gameboard = document.getElementById("game-board");
  let gameOver = document.getElementById("gameOver");
  let tryAgain = document.getElementById("tryAgain");
  // Changement du display des éléments afin de cacher/afficher
  gameboard.style.display="none";
  video.style.display="block";
  // Si la vidéo est chargée alors lancer la lecture
  if (video.readyState === 4){
    video.play()
  }
  // Instancier un timeout le temps de la vidéo pour la faire disparaitre a nouveau
  setTimeout(()=>{
    video.style.display="none";
    // afficher le message GAME OVER et la possibilité de relancer une partie 
    gameOver.style.display="block";
    tryAgain.style.display="block";
  },10000)
}

// Fonction pour retourner une carte
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

// Appel de la fonction pour créer les cartes au chargement de la page
window.addEventListener("load", createCards);