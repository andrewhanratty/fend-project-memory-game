//creates a Nodelist of all the card elements
let cards = document.querySelectorAll('.card');

//accesses the deck element
let deck = document.getElementsByClassName('deck');

const len = cards.length;

let moveCount = 0;

let twoCards = [];

var listCards = ["fa fa-diamond","fa fa-paper-plane-o", "fa fa-anchor",
                "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf",
                "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf",
                "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle",
                "fa fa-paper-plane-o", "fa fa-cube"];

let shuffledCards = [];

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

function shuffle_cards(array) {
  var list = $(".deck li");
  for(var i = 0; i < list.length; i++) {
    var curr = list[i];
    //access all of the <i> elements in the '.deck li' list.
    //sets the class within that element to whatever's at the specified
    //index of the input array.
    curr = curr.getElementsByTagName("i")[0].setAttribute("class", array[i]);
    console.log(curr);
  }
}

//compares the 2 cards in the twoCards array.
function compare() {
  //check to see if the cards match
  if (twoCards[0] == twoCards[1]) {
    //loop through the cards and find the two that contain the same
    //HTML as twoCards[0] and twoCards[1], then add and remove certain classes
    //for the card's <li> element.
    for (const card of cards) {
      if (card.innerHTML.includes(twoCards[0] || twoCards[1])) {
        card.classList.add('match');
        card.classList.remove('open', 'show');
      }
      twoCards.pop();
    }
  } else {
      for (const card of cards) {
        if (card.innerHTML.includes(twoCards[0] || twoCards[1])) {
          card.classList.remove('open', 'show');
      }
      twoCards.pop();
      }
    }
  }

//This determines behavior for each turn: first check for length of the twoCards array,
//then listen for click events on any of the cards. If clicked, add classes to it
//that will show the symbol and change card color, increment the move counter,
//and push the innerHTML of the clicked cards into the twoCards array.
function turn() {
  for (i = 0; i < cards.length; i++) {
    if (twoCards.length === 2) {
      break;
    }
    //This shows the clicked card's symbol and changes its color, then
    //increments moveCount, and pushes the cards info into the twoCards array.
    cards[i].addEventListener('click', function(event) {
      event.currentTarget.classList.add("show", "open");
      moveCount++;
      twoCards.push(this.innerHTML.trim());
    });
  }
  //This is meant to prevent the user from being able to click on more than
  //2 cards/turn
  for (i = 0; i < cards.length; i++) {
    cards[i].removeEventListener('click', function(event) {
      event.currentTarget.classList.add("show", "open");
    });
  }
  compare();
}

turn();


//If the turn results in a match, this match function is invoked
//and the 'match' class is added to the two cards' elements. Then
//it should loop through all of the cards to see if they all possess
//the 'match' class. If they do, the end() function is invoked. If
//they don't, the twoCard array is emptied and the turn() function is
//invoked.
function match() {
  for(const twoCard of twoCards) {
    twoCard.classList.add('match');
  }
  turn();
}
//If the turn results in no match, this noMatch function is invoked
//and the 'show' and 'open' classes are removed from the two cards'
//elements. And the twoCard array is emptied.
function noMatch() {
  for (const twoCard of twoCards) {
    card.classList.remove('show', 'open');
  }
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
  document.querySelector('.reset').addEventListener('click', function() {
//turns all of the cards back over and then shuffles them.
    for (const card of cards) {
      card.classList.remove('show', 'open', 'match');
    //takes the listCards array and shuffles it
    }
    listCards = shuffle(listCards);
    //passes the newly shuffled listCards array into shuffle_cards, which
    //newly assigns classes within each '.deck li' (each card)
    shuffle_cards(listCards);
  });
}


/*
 * Create a list that holds all of your cards
 */

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
