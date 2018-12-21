/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/* step-by-step logic

1. set current accumulated roll to current below player activePlayer.
2. make the dice disappear pre-roll and appear upon roll.
    2a. remember class is .class not #id.
3. set event handler for roll dice button.
    3a. random number.
    3b. display the result of the roll as dice.
    3c. update the roundScore if not 1.
4. set initial player scores to zero.
5. move red active dot between turns.
6. give functionality to hold button.
7. keep the dice from rolling after the game (var gamePlaying).

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;

document.querySelector('.btn-roll').addEventListener('click', function() {                  // 3
    // random number
    if (gamePlaying) {
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;


        // display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        if (dice1 !== 1 && dice2 !== 1) {
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;        // 1
        } else {
            nextPlayer();
        }


        /*
        // update the roundScore IF the rolled number is not 1
        if (dice === 6 && lastDice === 6) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        } else if (dice !== 1) {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;        // 1
        } else {
        nextPlayer();
    }
    lastDice = dice;
    }
});

*/

        document.querySelector('.btn-hold').addEventListener('click', function () {                   // 6
            if (gamePlaying) {
                // add current score to global score
                scores[activePlayer] += roundScore;

                // update the ui
                document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

                var winningScore;

                var input = document.querySelector('.final-score').value;
                if (input) {
                    winningScore = input;
                } else {
                    winningScore = 100;
                }

                // check if player won the game
                if (scores[activePlayer] >= winningScore) {
                    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
                    document.getElementById('dice-1').style.display = 'none';
                    document.getElementById('dice-2').style.display = 'none';
                    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
                    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
                    gamePlaying = false;
                } else {
                    nextPlayer();
                }

            }
        });

        function nextPlayer() {
            activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
            roundScore = 0;

            document.getElementById('current-0').textContent = '0';
            document.getElementById('current-1').textContent = '0';

            // document.querySelector('.player-0-panel').classList.toggle('active');               // 5 - toggles red dot
            //  document.querySelector('.player-1-panel').classList.toggle('active');               // between players

            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
        }

        function init() {
            scores = [0, 0];
            roundScore = 0;
            activePlayer = 0;
            gamePlaying = true;

            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';                                     // 2

            document.getElementById('score-0').textContent = '0';                                       // 4
            document.getElementById('score-1').textContent = '0';                                       // 4
            document.getElementById('current-0').textContent = '0';                                     // 4
            document.getElementById('current-1').textContent = '0';
            document.querySelector('#name-0').textContent = 'Player 1';
            document.querySelector('#name-1').textContent = 'Player 2';
            document.querySelector('.player-0-panel').classList.remove('winner');
            document.querySelector('.player-1-panel').classList.remove('winner');
            document.querySelector('.player-0-panel').classList.remove('active');
            document.querySelector('.player-1-panel').classList.remove('active');
            document.querySelector('.player-0-panel').classList.add('active');
        }


        document.querySelector('.btn-new').addEventListener('click', init);


/*///////////////////////////////
// CODING CHALLENGE 3

1. When a player rolls 2 sixes in a row, they lose their ENTIRE score. After that, it's the next
player's turn. (Hint: always save the previous dice roll in a separate variable).

2. Add an input field to the HTML where players can set the winning score, so that they can
change the predefined score of 1-- (Hint: you can read that value with the .value property in JS.
This is a good opportunity to use google to figure this out).

3. Add another dice to the game, so that there are two dice. The player loses his current score
when one of them is a 1 (Hint: you will need CSS to position the second dice, so take a look at
the CSS code for the first one).

*/