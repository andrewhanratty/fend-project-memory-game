//creates a Nodelist of all the card elements
let cards = document.querySelectorAll('.card');

//creates an array from the above Nodelist
let gameCards = Array.from(cards);

//accesses the deck element
let deck = document.getElementsByClassName('deck');

const len = cards.length;

let shuffledCards = [];
//
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Begin the game by shuffling and reassigning HTML
function firstTurn() {
  shuffle(gameCards);
  for (i = 0; i < gameCards; i++){
    cards[i].innerHTML = gameCards[i].innerHTML;
  }
  turn();
}

firstTurn();

//This determines behavior for each turn
function turn() {
  for (const card of cards) {
      card.addEventListener('click', function(event) {
          event.currentTarget.classList.add("show", "open");
      });
  }
}

//Just for checking the contents of the gameCards array
function innerGameCards(){
  for (const gameCard of gameCards){
    console.log(gameCard.innerHTML);
  }
}
innerGameCards();

//If the turn results in a match, this match function is invoked
//and the 'match' class is added to the two cards' elements. Then
//it should loop through all of the cards to see if they all possess
//the 'match' class. If they do, the end() function is invoked. If
//they don't, the twoCard array is emptied and the turn() function is
//invoked.
function match() {
  turn();
}
//If the turn results in no match, this noMatch function is invoked
//and the 'show' and 'open' classes are removed from the two cards'
//elements. And the twoCard array is emptied.
function noMatch() {
  turn();
}


//Create the clock
var active = false;

function startTimer(){
  if (active) {
    var timer = document.getElementById('my_timer').innerHTML;
    var arr = timer.split(":");
    var min = arr[0];
    var sec = arr[1];

    if (sec == 59) {
      if (min == 59) {
        min = 0;
      } else {
        min++;
      }
      if (min < 10) min = "0" + min;
      sec = 0;
    } else {
      sec++;
      if (sec < 10) sec = "0" + sec;
    }

    document.getElementById('my_timer').innerHTML = min + ":" + sec;
    setTimeout(startTimer, 1000);
  }
}

function changeState() {
  if (active == false) {
    active = true;
    startTimer();
    console.log("Timer has been started");
    document.getElementById('control').innerHTML = "Pause";
  } else {
    active = false;
    console.log("Timer is on pause");
    document.getElementById('control').innerHTML = "Start";
  }
}

function reset() {
  document.getElementById('my_timer').innerHTML = "00" + ":" + "00";
}


/*
 * Create a list that holds all of your cards
 */



//function closeCard() {
//  for (const card of cards) {
//    card.addEventListener('click', function(event) {
//      if (card.classList.contains("show", "open")) {
//        event.currentTarget.classList.remove("show", "open");
//      }
//    });
//  }
//}
//closeCard();

//function shuffle() {
//  var cardList = document.querySelectorAll('.card'), i;
//  for (i = cardList.length; i >= 0; i--) {
//      cardList.appendChild(cardList.children[Math.random() * i | 0]);
//  }
//}

// cards.addEventListener('click', openCard);

//function shuffle(array) {
//    for (let i = array.length - 1; i > 0; i--) {
//        let j = Math.floor(Math.random() * (i + 1));
//        [array[i], array[j]] = [array[j], array[i]];
//    }
//    return array;
//}
// Shuffle function from http://stackoverflow.com/a/2450976



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
