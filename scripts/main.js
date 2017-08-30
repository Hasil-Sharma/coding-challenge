var firstPlayerValue;
var statusMessage;
var restartButton;
var startButton;
var initSection;
var board;

var playerMarkMapping = {
  AI : 'X',
  You : 'O'
}
var aiMark = playerMarkMapping['AI'];
var youMark = playerMarkMapping['You']
var aiScore = 10;

// Removes the state information stored in js and resets the moves previously made
function refreshHtmlJs(){
  $(".tile").text("");
}

// Method to switch the players
function switchPlayerMark(playerMark){
  return (!playerMark.localeCompare(aiMark)) ? youMark : aiMark;
}

// Method to score the winning board
function scoringMethod(playerMark) {
  return (!playerMark.localeCompare(aiMark)) ? aiScore : -aiScore;
}

/* Inplements restart button behavious : Hides the restart button, shows the start
button and redio buttons to chose the players, removes the state information, resets
the status message */
function restartButtonFunctionality(){
  restartButton.click(function() {
    restartButton.hide();
    initSection.show();
    refreshHtmlJs();
    statusMessage.text('Please choose who plays first and click "Start Game!"');
    board = new BoardState();
  });
}

/* Identify which player started first, following necessary strategy, hides and
show necessary html sections and continue the game
*/
function identifyWhichPlayerFirst(){
  startButton.click(function(){
    firstPlayerValue = $("input[name=FirstPlayer]").filter(':checked').val();

    initSection.hide();
    restartButton.show();

    if (!firstPlayerValue.localeCompare("AI")){
      // Instantiate the object with starting player as AI
      board = new BoardState(playerMarkMapping["AI"], switchPlayerMark, scoringMethod)

      // Initialize first step to reduce the recursion stack
      var possibleStates = [0, 2, 4, 6, 8]; // corner and center
      var stateChange = possibleStates[Math.floor(Math.random() * possibleStates.length)];

      board.setCell(stateChange, playerMarkMapping["AI"]);
      $("#" + stateChange).text(playerMarkMapping["AI"]);
      statusMessage.text("AI played, your turn now !");
    } else {
      // Instantiate the obejct with starting player as You
      board = new BoardState(playerMarkMapping["You"], switchPlayerMark, scoringMethod)
      statusMessage.text("Waiting for you to start the move!");
    }
  });
}

// Method to check if doing the last move is redundant and game is going to tie anyways
// Shouldn't call after manual setting as it is possible AI wins by making the last update
function checkIfLastMove(playerKey){
  if (board.getPossibleMoves().length == 1) {
    statusMessage.text("Nobody won its a tie !");
    var stateChange = board.getPossibleMoves()[0];
    board.setCell(stateChange, playerMarkMapping[playerKey]);
  }
}

function runAI() {
  var possibleStates = board.getPossibleMoves();

  // Always a state to change else method wouldn't have been called
  // var stateChange = possibleStates[Math.floor(Math.random() * possibleStates.length)]
  var stateChange = findBestMoveDriver(board, 0);

  // Set the cells in board object
  var flags = board.setCell(stateChange, playerMarkMapping["AI"]);


  // update the UI
  $("#" + stateChange).text(playerMarkMapping["AI"]);

  // Implicit that tile will be set.


  // Check if update caused a tie
  if(board.isTie()){
    // for the case when AI makes the last move
    statusMessage.text("Nobody won its a tie !");
  } else if (flags.gameWon){
    // Check if update is a winning move
    statusMessage.text("AI Won !")
  } else {
    // wait for the other player
    statusMessage.text("AI played, your turn now !");

    checkIfLastMove(playerMarkMapping["You"])
  }
}

/* Identify which cell is clicked as per the index (starts with 0, upper left)
and request user to start the game before clicking on tiles.
*/
function identifyWhichCellClicked(){
  $(".tile").click(function(){
    if(!firstPlayerValue){
      // case when start button isn't pressed and tiles are clicked
      statusMessage.css("font-weight","Bold");
    } else {

      // get the id of the tile clicked
      var tileId = $(this).attr("id");

      //try setting the tile which was clicked
      var flags = board.setCell(tileId, playerMarkMapping["You"])

      // if tile is set
      if(flags.tileSet){

        // set the HTML to show the change
        $(this).text(playerMarkMapping["You"]);

        // Check if current update wons the game
        if (flags.gameWon) {
          statusMessage.text("You won !");
        } else if (board.isTie()){ // Check if current update ties the game
          statusMessage.text("Nobody won its a tie !");
        } else {

          runAI(); // Run the AI
        }
      }
    }
  });
}

// Driver method for the script
$(document).ready(function(){

  statusMessage = $("#status-message");
  restartButton = $("#restart-button");
  startButton = $("#start-button");
  initSection = $("#init");

  restartButton.hide();

  identifyWhichPlayerFirst();
  identifyWhichCellClicked();
  restartButtonFunctionality();
});
