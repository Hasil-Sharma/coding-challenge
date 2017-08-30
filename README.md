# Documentation

A standalone web-page application based on javascript which plays tic-tac-toe game against human player. Application never loses in the game and the best outcome for the human player is a tie.

## Playing the game:
Open the web page [index.html](index.html) in a browser. Internet connection is required (for loading necessary javascript library) <sup>[jquery][1]</sup>. After application is loaded successfully, choose who is going to play first - You or AI (Computer) and click on _"Start Game!"_ button.

You can restart the game at any time by clicking _"Restart Game!"_ button during the game. Pressing _"Restart Button"_ takes you back to the main frame from where you can start a new game.

After clicking the _"Start/Restart Game!"_ button click on an empty tile to add your marker to it. You are assigned marker **O** and AI (Computer) marker **X** . THis assignment is fixed for the application.

During the game text below the _"Restart/Start Game!"_ button tells the game status - which player has the current turn, who won and whether or not it is a tie.

## Algorithm Computer Uses

#### Overview

AI (Computer) uses [MiniMax][2] algorithm to decide where to place its marker. It does so by recursively enumerating all the possible states (different tile arrangments) in which game can end from the current game state (current tile arrangment) - assuming that the both player is playing optimally. Of all the possible moves in the given state, algorithm tells best move in the worst case (Case when other player making best moves possible).

#### MiniMax Explained
Let us suppose there are two players - Player 1 and Player 2, and its Player 1's turn and we wish to find the best move it should make in order to not lose the game.

Algorithm starts with placing Player 1's marker at all possible tiles, and from each of the new state realized after placing the marker algorithm places Player 2's marker at all the possible location. This is done recursively and a game tree with all the possible states which can be reached is built. Leafs of the tree are the end games where either one of the player wins or the game is a tie. These end leafs are assigned some value for scoring. Assume, if Player 1 wins a score of _+N_ is assigned, when it loses a _-N_ score is assigned, and in case of a tie a score of _0_ is assigned. This score assignment is arbitrary, and positive and negative score values can be interchanged without any problem. Since, Player 1 has been assigned _+N_ score, any move which helps it to transition towards a state with this score is fine to move. In order to take decision which of the all possible moves it should make (one that guarantees a win), algorithm takes into account possibilty of other player ending game as a tie. Henceforth, algorithm choses the move for Player 1 which precludes Player 2 from ending game as tie or a move which definitely ends game as tie, in case Player 2 might win.

In order to take better decisions depth of the game tree (number of state transitions it took to reach current state from start state) is adjusted into the scoring. For Player - 1, current depth of the state is deducted from the score of the state, higher depth is less favorable than one on a lower depth and player is trying to achive a positive score. For Player - 2, current depth of the state is added to the score of the state, for similar reason as that of Player - 1.

For more understanding refer to the links below:
- http://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-3-tic-tac-toe-ai-finding-optimal-move/
- http://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-1-introduction/


## Libraries and references used while developing
- https://jquery.com/
- https://en.wikipedia.org/wiki/Minimax
- https://www.theodinproject.com/courses/javascript-and-jquery/lessons/tic-tac-toe
- https://stackoverflow.com/questions/125557/what-algorithm-for-a-tic-tac-toe-game-can-i-use-to-determine-the-best-move-for
- https://www.quora.com/Is-there-a-way-to-never-lose-at-Tic-Tac-Toe


[1]: https://jquery.com/
[2]: https://en.wikipedia.org/wiki/Minimax
