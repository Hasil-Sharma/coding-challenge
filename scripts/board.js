
function BoardState (startPlayerMark, switchPlayerMarkMethod, scoringGameMethod) {

  var cells = ['', '', '', '', '', '', '', '', '']; //State of the board

  /*
    Mark which will be applied on next setCell call, automatically changed as
    per switchPlayerMarkMethod
    */
  var currentPlayerMark = startPlayerMark;

  /*
    Mark which was set when setCell was called this this
  */
  var prevMark = "";

  // Index which was changed in current setCell calls
  var indexChanged = -1;

  // Check whether one of the players won the game
  var gameWon = false;

  // Logic to switch the player mark after every successful setCell
  var switchPlayerMark = switchPlayerMarkMethod;

  // Logic to get score of the board depending on which player won
  var scoringMethod = scoringGameMethod;

// For Debugging
//   this.getAttributes = function() {
//     return {
//       cells: cells.slice(),
//       startPlayerMark: currentPlayerMark,
//       prevMark: prevMark,
//       indexChanged: indexChanged,
//       gameWon: gameWon,
//       switchPlayerMarkMethod: switchPlayerMark,
//       scoringGameMethod: scoringMethod
//   };
// }


  // Setter methods used while cloning the board
  this.setCellArray = function(cellsVal) { cells = cellsVal };
  this.setPrevMark = function(prevMarkVal) { prevMark = prevMarkVal};
  this.setIndexChanged = function(indexChangedVal) {indexChanged = indexChangedVal};
  this.setGameWon = function(gameWonVal) {gameWon = gameWonVal };


  /*
    Private method to test whether current player whose mark (currentPlayerMark)
    was added has won the game. Sets gameWon as true in case the player wins.
    Checks board on the basis of index which was changed in current state
    update
  */
  var checkwin = function(){
    if (indexChanged == -1) {
      return false;
    }
    if (gameWon)
      return true;

    var horizontal = '', vertical = '', diagonal1 = '', diagonal2 = '';
    var index = indexChanged;

    if (index % 3 == 0){
      // new element on left column
      vertical = concatElements([0, 3, 6]);
      horizontal = concatElements([index, index + 1, index + 2]);
    } else if (index % 3 == 2) {
      // new element on the right column
      vertical = concatElements([2, 5, 8]);
      horizontal = concatElements([index, index - 1, index - 2]);
    } else if (index % 3 == 1 ){
      // new elemnt in the middle column
      vertical = concatElements([1, 4, 7]);
      horizontal = concatElements([index - 1, index, index + 1]);
    }

    if (index == 0 || index == 4 || index == 8){
      diagonal1 = concatElements([0, 4, 8]);
    }

    if (index == 2 || index == 4 || index == 6){
      diagonal2 = concatElements([2, 4, 6]);
    }

    if (compareString(diagonal1) || compareString(diagonal2) || compareString(horizontal) || compareString(vertical)){
      gameWon = true;
      return true;
    }
    return false;
  }

  // Helper method to concat the cell values on the basic of their index
  var concatElements = function(indexes){
    var result = '';
    for (i = 0; i < indexes.length; i++){
      result = result + cells[indexes[i]];
    }

    return result;
  }

  /*
    Helper method to compare the strings with the winning string as per the
    player mark which was applied in the current update
  */
  var compareString = function(string){
    return (!string.localeCompare(prevMark.repeat(3))) ? true : false;
  }

  // Return true in case none of the players won and no other move is left
  this.isTie = function() {
      var possibleStates = this.getPossibleMoves();
      return (possibleStates.length == 0 && !gameWon) ? true : false;
  }

  // // Checks whether game will be
  // this.isGameWon = function() {
  //     if (!gameWon) {
  //       checkwin();
  //     }
  //
  //     return gameWon;
  // }

  // Returns the score as per who won the game and scoring method passed
  this.getGameScore = function() {
    if (gameWon) {
      return {gameWon: true, gameScore: scoringMethod(prevMark)};
    }

    return {gameWon: false, gameScore: NaN};
  }

  // Returns array of possible moves
  this.getPossibleMoves = function(){
      var indexes = [], i = -1;
      while ((i = cells.indexOf('', i + 1)) != -1){
        indexes.push(i);
      }

      return indexes;
  }

  /*
    Update the cells as per index passed and return object to update the
    status. Automatically checks whether current update causes game to be won.
  */
  this.setCell = function(index) {
    if (cells[index] == false && gameWon == false){

      cells[index] = currentPlayerMark;

      indexChanged = index;

      prevMark = currentPlayerMark;
      currentPlayerMark = switchPlayerMark(currentPlayerMark);

      return {
        tileSet: true,
        gameWon: checkwin()
      }
    } else {
      return {
      tileSet: false,
      gameWon: false
      }
    }
  }

  // this.getPlayerWhoseTurn = function() {
  //   return currentPlayerMark;
  // }

  // Method to deep clone the object
  this.cloneBoardObject = function() {
    var newBoard = new BoardState(currentPlayerMark, switchPlayerMark, scoringMethod);

    newBoard.setPrevMark(prevMark);
    newBoard.setCellArray(cells.slice());
    newBoard.setIndexChanged(indexChanged);
    newBoard.setGameWon(gameWon);

    return newBoard;
  }

}
