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

    // Ajouter l'image de dos pour toutes les cartes
    card.style.backgroundImage = "url(img/back.jpg)";

    // Ajouter l'écouteur d'événement pour retourner la carte
    card.addEventListener("click", flipCard);

    document.getElementById("game-board").appendChild(card);
    cards.push(card);
  }
}

// Fonction pour retourner une carte
function flipCard() {
  // Si la carte est déjà retournée ou si deux cartes ont déjà été retournées, ne rien faire
  if (returnedCard.length === 2 || this.classList.contains("flipped")) {
    return;
  }

  // Ajouter la carte au tableau des cartes retournées
  returnedCard.push(this);
  this.classList.add("flipped");
  this.style.backgroundImage = `url(${cardImages[this.dataset.cardIndex]})`;

  // Si deux cartes ont été retournées, vérifier si elles sont identiques
  if (returnedCard.length === 2) {
    if (returnedCard[0].style.backgroundImage === returnedCard[1].style.backgroundImage) {
      // Si les cartes sont identiques, ajouter les deux cartes au tableau des paires trouvées
      matchedCards.push(returnedCard[0], returnedCard[1]);
      returnedCard = [];

      // Vérifier si toutes les paires ont été trouvées
      if (matchedCards.length === cardImages.length) {
        alert("Bravo, vous avez gagné!");
      }
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