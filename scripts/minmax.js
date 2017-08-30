function findBestMoveDriver(board, depth) {
    return minmax(board, depth)['move'];
}

function minmax(board, depth) {
  var bestMove, bestScore, possibleStates = board.getPossibleMoves(), tempScore;

  // The AI is trying to get the maximum possible score
  if (!board.getPlayerWhoseTurn().localeCompare('X')){
    bestScore = -Infinity;
    for(var i = 0; i < possibleStates.length; i++){

      // more depth means less score (this agent is trying to maximize score)
      tempScore = makeMove(board, possibleStates[i], depth)['score'] - depth;
      if (tempScore > bestScore) {
        bestMove = possibleStates[i];
        bestScore = tempScore;
      }
    }
  } else {
    // Assuming the other player is trying score the minimum score, in which case
    // it wins
    bestScore = +Infinity;
    for(var i = 0; i < possibleStates.length; i++){

      // more depth means more score (this agent is trying to minimize score)
      tempScore = makeMove(board, possibleStates[i], depth)['score'] + depth;
      if (tempScore < bestScore) {
        bestMove = possibleStates[i];
        bestScore = tempScore;
      }
    }
  }

  // returns best move and score given the other player plays most optimally
  return {
    score: bestScore,
    move: bestMove
  };
}

function makeMove(board, index, depth) {
  var newBoard = board.cloneBoardObject();
  var flag = newBoard.setCell(index);

  // it is implicit that tile will be set
  if (flag.gameWon) {
    // if game is won
    return {
      score: newBoard.getGameScore()['gameScore'],
      move: index
    };
  } else if (newBoard.isTie()) {
    return {
      score: newBoard.getGameScore()['gameScore'],
      move: index
    };
  } else {
    return minmax(newBoard, depth + 1);
  }
}
