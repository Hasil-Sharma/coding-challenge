
function BoardState () {
  this.cells = ['', '', '', '', '', '', '', '', ''];
  this.currentPlayerMark = '';
  this.indexChanged = -1;
  this.boardDone = false;
}

BoardState.prototype.isBoardDone = function() {
    return this.boardDone;
}

BoardState.prototype.getPossibleMoves = function(){
    var indexes = [], i = -1;
    var cells = this.cells;
    while ((i = cells.indexOf('', i + 1)) != -1){
      indexes.push(i);
    }

    return indexes;
}

BoardState.prototype.concatElements = function(indexes){
  var result = '';
  for (i = 0; i < indexes.length; i++){
    result = result + this.cells[indexes[i]];
  }

  return result;
}

BoardState.prototype.compareString = function(string){
  return (!string.localeCompare(this.currentPlayerMark.repeat(3))) ? true : false;
}

BoardState.prototype.setCell = function(index, playerMark) {
  if (this.cells[index] == false){
    this.cells[index] = playerMark;
    this.currentPlayerMark = playerMark;
    this.indexChanged = index;
    return true;
  } else {
    return false;
  }
}

// Check whether the player wins after placing an element at index
BoardState.prototype.checkwin = function(){
  if (this.indexChanged == -1) {
    return false;
  }
  if (this.boardDone)
    return true;

  var horizontal = '', vertical = '', diagonal = '', vertical1 = '', vertical2 = '';
  var index = this.indexChanged;

  if (index % 3 == 0){
    // new element on left column
    vertical = this.concatElements([0, 3, 6]);
    horizontal = this.concatElements([index, index + 1, index + 2]);
  } else if (index % 3 == 2) {
    // new element on the right column
    vertical = this.concatElements([2, 5, 8]);
    horizontal = this.concatElements([index, index - 1, index - 2]);
  } else if (index % 3 == 1 ){
    // new elemnt in the middle column
    vertical = this.concatElements([1, 4, 7]);
    horizontal = this.concatElements([index - 1, index, index + 1]);
  }

  if (index == 0 || index == 4 || index == 8){
    vertical1 = this.concatElements([0, 4, 8]);
  }

  if (index == 2 || index == 4 || index == 6){
    vertical2 = this.concatElements([2, 4, 6]);
  }

  if (this.compareString(vertical1) || this.compareString(vertical2) || this.compareString(horizontal) || this.compareString(vertical)){
    this.boardDone = true;
    return true;
  }
  return false;
}
