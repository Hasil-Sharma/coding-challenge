var firstPlayerValue;
var statusMessage;
var restartButton;
var startButton;
var initSection;
var currentPlayer;
var cellIndex;
var board;
var playerMarkMapping = {
  AI : 'X',
  You : 'O'
}

// Removes the state information stored in js and resets the moves previously made
function refreshHtmlJs(){
  $(".tile").text("");
}

function switchPlayer(){
  currentPlayer = currentPlayer.localeCompare('AI') ? 'AI' : 'You';
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

    currentPlayer = firstPlayerValue;
    restartButton.show();
    initSection.hide();

    if (!firstPlayerValue.localeCompare("AI")){
      // alert(playerMarkMapping[currentPlayer]);
      // Strategy when AI has to run first
      // $(".tile:nth-child(5)").text(playerMarkMapping[currentPlayer]);
      runAI()
      statusMessage.text("AI played, your turn now !");
    } else {
      // alert(playerMarkMapping[currentPlayer]);
      // Stragey when player has to run first
      statusMessage.text("Waiting for you to start the move!");
    }
  });
}

function runAI() {
  var possibleStates = board.getPossibleMoves();

  // for the case when player makes the last move
  if (possibleStates.length == 0) {
    statusMessage.text("Nobody won its a tie !");
  } else {
    var stateChange = possibleStates[Math.floor(Math.random() * possibleStates.length)]
    board.setCell(stateChange, playerMarkMapping["AI"]);
    $("#" + stateChange).text(playerMarkMapping["AI"]);
    if(board.getPossibleMoves().length == 0){
      // for the case when AI makes the last move
      statusMessage.text("Nobody won its a tie !");
    } else if (board.checkwin()){
      statusMessage.text("AI Won !")
    } else {
      switchPlayer();
      statusMessage.text("AI played, your turn now !");
    }
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
      var tileSet = board.setCell(tileId, playerMarkMapping["You"])

      // if tile can be set
      if(tileSet){
        // set the UI to show the change
        $(this).text(playerMarkMapping["You"]);
        if (board.checkwin()) {
          statusMessage.text("You won !");
        } else {
          switchPlayer();
          runAI();
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
  board = new BoardState();
  restartButton.hide();

  identifyWhichPlayerFirst();
  identifyWhichCellClicked();
  restartButtonFunctionality();
});
