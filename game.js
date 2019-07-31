//Holds game pattern
var buttonColors =["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
//current position in the sequence (used as an index)
var currentPos = 0;



//Check to start the game
$(document).keydown(function(){
  //if any key is pressed for the first time, start the game
  if (level === 0 ){
    nextSequence();
  }

});



//Check if a button was pressed
$(".btn").click(function(){
  //adds color to users sequence
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor)
  //console.log(userClickedPattern);

  //plays button sound
  playSound(userChosenColor);
  animatePress(userChosenColor);


  //check if chosen color is right
  checkAnswer(userChosenColor);
});



//Chooses next color in the sequence
function nextSequence(){
  //Change the Level heading
  ++level;
  $("h1").html("LEVEL " + level);

  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  //Flashes next color to user
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);


}


//Plays button sounds
function playSound(name){
  var chosenSound = new Audio("sounds/"+name+".mp3");
  chosenSound.play();
}


//Animates button presses
function animatePress(currentColor){
  $("."+currentColor).addClass("pressed");

  setTimeout(function(){
    $("."+currentColor).removeClass("pressed");
  }, 100);

}




function checkAnswer(chosenColor){
  if(chosenColor === gamePattern[currentPos]){
    ++currentPos;
    if(gamePattern.length === currentPos){
      setTimeout(function(){
        nextSequence();
      }, 1000);

      var userClickedPattern = [];
      currentPos = 0;
    }

  }else{

    restartGame();
    gameOver();
  }


}


function gameOver(){
  //game over audio
  var gameOverSound = new Audio("sounds/wrong.mp3");
  gameOverSound.play();

  //game over screen
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200);


}


function restartGame(){
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  currentPos = 0;
  $("h1").html("Press A Key to Start");
}
