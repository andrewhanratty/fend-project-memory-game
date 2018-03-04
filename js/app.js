
var match_list = [];
let card1, card2;

let moveCount = 0;
let count = document.querySelector('.moves');
let cText = document.querySelector('.move_text');
let movesNum = document.querySelector('.moves_num');

let shuffledCards = [];
let twoCards = [];

let firstStar = document.querySelector('.first');
let secondStar = document.querySelector('.second');
let thirdStar = document.querySelector('.third');

let starRating = 3;
var timer;
var listCards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor",
                "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf",
                "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf",
                "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle",
                "fa fa-paper-plane-o", "fa fa-cube"];

//Creating the modal
//Get modal element
var modal = document.getElementById('simpleModal');
// Get close modal button
var closeBtn = document.getElementsByClassName('close')[0];

//Display the modal
function endGame() {
  active = false;
  modal.style.display = 'block';
  //Add content to the modal: finish time and star rating.
  movesNum.textContent = 'You finished in ' + timer + '!  Earning a ' + starRating + '-star rating.';
  //Add a paragraph below the above content to prompt the player to close the
  //modal.
  let newP = document.createElement('p');
  newP.textContent = "Click on 'X' if you'd like to play again.";
  movesNum.appendChild(newP);
}


// Function to close modal
function closeModal() {
  modal.style.display = 'none';
  reset();
}

// Function to close modal if outside click
function outsideClick() {
  //if (e.target == modal) {
  //  modal.style.display = 'none';
  //}
  reset();
}

// Listen for close click outside of modal
window.addEventListener('click', outsideClick);


// Listen for close click on modal's X
closeBtn.addEventListener('click', closeModal);

//A function to randomize the order of an array that will hold
//all sixteen cards.
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


//Shuffles the cards by changing the class in every card's <i> element
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

//Upon refreshing the screen, randomizes the order of the listCards array by passing it into the shuffle function.
//Then passes the resulting shuffled array into the shuffle_cards function which
//adds the classes to the cards one by one.
window.onload = function() {
    listCards = shuffle(listCards);
    shuffle_cards(listCards);
};

//During each turn, compares the 2 cards in the 'twoCards' array.
function isMatch() {
  //Accesses the classes within the cards' <i> element
  let card1 = $(twoCards[0]).children('i').attr('class');
  let card2 = $(twoCards[1]).children('i').attr('class');
  console.log("card1:", card1);
  console.log("card2:", card2);
  //Check to see if the classes within the cards' <i> elements match
  //And make sure the same card can't be pressed twice and be considered
  //a match.
  if (card1 === card2 && twoCards[0] !== twoCards[1]) {
    console.log("match card");
    //remove the flipInY class, so that it can be added again on the
    //next turn, and therefore have the same effect
    $(twoCards[0]).removeClass("flipInY");
    $(twoCards[1]).removeClass("flipInY");
    //Locks the card as a match and keeps it open, while adding a
    //rubberBand effect.
    $(twoCards[0]).addClass("match rubberBand");
    $(twoCards[1]).addClass("match rubberBand");
    //Places the matched cards in an array
    match_list.push(twoCards[0]);
    match_list.push(twoCards[1]);
  } else {
    console.log("mismatch card");
    //Removes the flipInY class so that the same effect can occur the
    //next time the card is clicked.
    $(twoCards[0]).removeClass("flipInY");
    $(twoCards[1]).removeClass("flipInY");
    //Shakes the cards when they are found not to match
    $(twoCards[0]).addClass("tada");
    $(twoCards[1]).addClass("tada");
    //turns the card back over by hiding its image and returning the
    //color to black.
    $(twoCards[0]).removeClass("open show");
    $(twoCards[1]).removeClass("open show");
  }
  //Counts the number of cards in the match_list to determine if all
  //the matches have been identified... and if so, the endGame function is called
  if (match_list.length === 16) {
    endGame();
  //Empties the twoCards array for next turn.
  } else {
    twoCards.length = 0;
  }
  return;
}

// Count the # of moves
function mCount() {
  console.log("I'm counting the moves:", moveCount);
  moveCount++;
  // Change 'moves' from plural to singular when needed
  count.textContent = moveCount;
  if (moveCount == 1) {
    cText.textContent = 'Move';
  } else {
    cText.textContent = 'Moves';
  }
}


//Stars to remove based on number of moves
function removeStar() {
  if (moveCount === 18) {
    //Makes the card flash red as a warning that player's about to
    //lose a star.
    firstStar.classList.add('flash');
  } else if (moveCount === 28) {
    //Makes the card flash red as a warning that player's about to
    //lose a second star.
    secondStar.classList.add('flash');
  } else if (moveCount === 22) {
    console.log("Remove a star!");
    firstStar.classList.remove('fa-star');
    starRating--;
  } else if (moveCount === 32) {
    console.log("Remove another star!");
    secondStar.classList.remove('fa-star');
    starRating--;
  }
}

//This determines behavior for each turn: access the deck and its <li> children,
//then listen for click events on any of the cards.
$(document).ready(function() {
  $("ul.deck li").click(function() {
    twoCards.push(this);
    //This removes the 'tada' class, so that the 'tada' effect can later be
    //added again if the cards don't match.
    $(this).removeClass("tada");
    //Adds the 'flipInY' class so that the card appears to flip over when pressed
    $(this).addClass("flipInY");
    //Add classes 'show' and 'open' to show its symbol and change color
    $(this).addClass("show open");
    //Increments the move counter
    mCount();
    //Checks to see the number of moves in order to determine whether a star
    //should be removed.
    removeStar();
    console.log(twoCards);
    //Checks to see if the players has clicked on 2 cards, and if the array
    //contains two elements the isMatch function is called for the purpose of
    //checking to see if the cards match.
    if(twoCards.length === 2) {
      //The setTimeout() method calls the isMatch function after a specified
      //number of milliseconds. 1000 = 1 second
      setTimeout(isMatch, 1000);
    }
    console.log(match_list);
  });
});


//Create the clock
var active = false;

function startTimer(){
  if (active) {
    timer = document.getElementById('my_timer').innerHTML;
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
  //Reloads the page.
  location.reload();
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
 //document.getElementById('my_timer').innerHTML = "00" + ":" + "00";
 //turns all of the cards back over and then shuffles them.
 //$("ul.deck li").removeClass("open show match");
 //count.textContent = 0;
 //moveCount = 0;
 //addStar();
   //takes the listCards array and shuffles it
 //listCards = shuffle(listCards);
   //passes the newly shuffled listCards array into shuffle_cards, which
   //newly assigns classes within each '.deck li' (each card)
 //shuffle_cards(listCards);
 //changeState();
