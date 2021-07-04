'use strict';
//selecting elements
const playerEl0 = document.querySelector('.player--0');
const playerEl1 = document.querySelector('.player--1');
const scoreEl0 = document.querySelector('#score--0');
const scoreEl1 = document.getElementById('score--1');
const dice = document.querySelector('.dice');
const currScoreEl0 = document.getElementById('current--0');
const currScoreEl1 = document.getElementById('current--1');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
//starting conditions
scoreEl0.textContent = 0;
scoreEl1.textContent = 0;
dice.classList.add('hidden'); //hidign the dice at the start of game
let activeUser = 0;
let currScore = 0;
let scores = [0, 0];
let playing = true;
//functions
//changing the active user function
const changePlayer = () => {
  scores[activeUser] += currScore;
  document.getElementById(`score--${activeUser}`).textContent =
    scores[activeUser];
  currScore = 0;
  playerEl0.classList.toggle('player--active');
  playerEl1.classList.toggle('player--active');
  document.getElementById(`current--${activeUser}`).textContent = currScore;
  activeUser = activeUser === 0 ? 1 : 0;
};
//when dice rolled
btnRoll.addEventListener('click', () => {
  if (playing) {
    //generating a random dice value
    const diceValue = Math.trunc(Math.random() * 6) + 1;
    //displaying dice value
    dice.classList.remove('hidden');
    dice.src = `dice-${diceValue}.png`;
    //checking if dice value is equalto 1
    if (diceValue != 1) {
      currScore += diceValue;
      document.getElementById(`current--${activeUser}`).textContent = currScore;
    } else {
      //changing the active user
      changePlayer();
    }
  }
});
//when pressed hold
btnHold.addEventListener('click', () => {
  if (playing) {
    //changing the player
    //if score is greater than 100
    if (scores[activeUser] + currScore >= 100) {
      document.querySelector(`#score--${activeUser}`).textContent =
        scores[activeUser] + currScore;
      document.getElementById(`current--${activeUser}`).textContent = 0;
      document
        .querySelector(`.player--${activeUser}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activeUser}`)
        .classList.add('player--winner');
      playing = false;
      dice.classList.add('hidden');
    } else changePlayer();
  }
});
//new game
btnNew.addEventListener('click', () => {
  location.reload();
});
