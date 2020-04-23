// ========================
// Variables & Connections
// ========================
const board = document.querySelector(".board");
const card = document.querySelector(".card");
const start_btn = document.querySelector(".btn__start");
const restart_btn = document.querySelector(".btn__restart");
let toggleCounter = 0;
let pairs = 0;
let cardsChosenIds = [];
let cardsChosen = [];
const cards = [
  "fries",
  "fries",
  "hotdog",
  "hotdog",
  "ice-cream",
  "ice-cream",
  "milkshake",
  "milkshake",
  "cheeseburger",
  "cheeseburger",
  "pizza",
  "pizza",
];

// ========================
// Functions
// ========================

/**
 * Creates the board by injecting the generated cards
 */
function createBoard() {
  shuffleCards(cards);
  for (let i = 0; i < cards.length; i++) {
    let card = buildCard(i);
    board.appendChild(card);
  }
}

/**
 * @param {Array} arr takes an array of strings
 * shuffles the elements
 */
function shuffleCards(arr) {
  arr.sort(() => Math.random() - 0.5);
}

/**
 * Creates the html-element card each time it's called
 * @param {number} index takes the index-value of a loop
 * @returns an multidimensional html-element
 */
function buildCard(index) {
  let card = document.createElement("div");
  card.classList.add("card", `${cards[index]}`);
  card.innerHTML = injectContent(index);
  card.addEventListener("click", checkForMatch);
  return card;
}

/**
 * Creates nested html-elements with dynamic index-values
 * @param {number} index takes the index-value of a loop
 * @returns {String} a String with the nested html-elements
 */
function injectContent(index) {
  return `
  <div class="card__inner">
    <div class="card__front">
    <img src="./imgs/blank.png" alt="">
    </div>
    <div class="card__back">
    <img src="./imgs/${cards[index]}.png" alt="">
    </div>
  </div> `;
}

/**
 * Updates the round data
 * @param {Object} takes the event-object
 */
function updateCards(e) {
  e.currentTarget.classList.toggle("flip");
  cardsChosenIds.push(e.currentTarget.classList[1]);
  cardsChosen.push(e.currentTarget);
  toggleCounter++;
}

/**
 * Resets the round data
 */
function reset() {
  toggleCounter = 0;
  cardsChosenIds = [];
  cardsChosen = [];
}

/**
 * Check for matches
 * @param {object} takes the event-object
 */
function checkForMatch(e) {
  if (e.target.getAttribute("src").includes("blank")) {
    switch (toggleCounter) {
      case 0:
        updateCards(e);
        break;
      case 1:
        updateCards(e);
        if (cardsChosenIds[0] == cardsChosenIds[1]) {
          pairs++;
          setTimeout(() => {
            cardsChosen[0].classList.add("shake");
            cardsChosen[1].classList.add("shake");
          }, 300);
          endGame();
        }
        break;
      case 2:
        if (cardsChosenIds[0] == cardsChosenIds[1]) {
          reset();
          updateCards(e);
        } else {
          cardsChosen[0].classList.toggle("flip");
          cardsChosen[1].classList.toggle("flip");
          reset();
          updateCards(e);
        }
    }
  }
}

/**
 * Ends the game, when pairs reached 6
 */
function endGame() {
  if (pairs == 6) {
    restart_btn.classList.remove("hidden");
    board.classList.add("hidden");
  }
}

// ========================
// Events
// ========================

/**
 * Starts the game by clicking the start button
 */
start_btn.addEventListener("click", () => {
  board.classList.remove("hidden");
  start_btn.classList.add("hidden");
});

/**
 * Restards the game, when the restard button is clicked
 */
restart_btn.addEventListener("click", () => {
  pairs = 0;
  reset();
  board.innerHTML = "";
  createBoard();
  board.classList.remove("hidden");
  restart_btn.classList.add("hidden");
});

// ========================
// Start
// ========================
createBoard();
