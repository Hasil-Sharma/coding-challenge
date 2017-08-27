var firstPlayerValue;
var statusMessage;
var restartButton;
var startButton;
var initSection;
var currentPlayer;
var cellIndex;

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
      alert(playerMarkMapping[currentPlayer]);
      // Strategy when AI has to run first
      $(".tile:nth-child(5)").text(playerMarkMapping[currentPlayer]);
      switchPlayer();
      statusMessage.text("AI played, your turn now !");
    } else {
      alert(playerMarkMapping[currentPlayer]);
      // Stragey when player has to run first
      statusMessage.text("Waiting for you to start the move!");
    }
  });
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
      $(this).text(playerMarkMapping[currentPlayer]);
      switchPlayer();
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
