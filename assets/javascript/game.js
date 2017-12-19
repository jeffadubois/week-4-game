$(document).ready(function(va){
	
  var targetNumber = 19;
  
  //
  var crystalIdList = [0, 0, 0, 0];
  var images = [];
  var numWins = 0;
  var numLosses = 0;
  var counter = 0;
  var imageIdPrefix = "imgid";
  var LastTimeWinLoss = "";


  // Next we create a for loop to create crystals .
  for (var i = 0; i < crystalIdList.length; i++) {

    // For each iteration, we will create an imageCrystal
    var imageCrystal = $("<img>");

    // First each crystal will be given the class ".crystal-image".
    // This will allow the CSS to take effect.
    imageCrystal.addClass("crystal-image");

    // Each imageCrystal will be given a src link to the crystal image
    imageCrystal.attr("src", "http://cdn.playbuzz.com/cdn/35910209-2844-45c0-b099-f4d82878d54f/00261fda-4062-4096-81fd-8cf96b9034e8.jpg");

    // Each imageCrystal will be given a data attribute called data-crystalValue.
    // This data attribute will be set equal to the array value.
	imageCrystal.attr("data-crystalvalue", crystalIdList[i]);
	
	// Each imageCrystal will be given an id - the ids have a prefix of "imgid" - 
	//  For example first crystal <img> will have an id of "imgid0" ,
	//  the second <img> will have an id of "imgid1" and so on. 
    var imId = imageIdPrefix + i;
    imageCrystal.attr("id", imId);
	 
    // Lastly, each crystal image (with all it classes and attributes) will get added to the page.
    $("#crystals").append(imageCrystal);

  }

   function startGame(){
    targetNumber = getRandomInteger(19,120);
	  counter = 0;
    setDataValuesForCrystals();
	  displayScores();
  }

  function setDataValuesForCrystals(){
	  var imId = "";
	  for (var i = 0; i < crystalIdList.length; i++){
		   imId = imageIdPrefix + i;
		   $("#" + imId).attr("data-crystalvalue", getRandomInteger(1,12));
	  }
  }
   
  function displayScores() {
	    $("#target-number").text(targetNumber);
		  $("#wins").text("Wins: " + numWins);
		  $("#losses").text("Losses: " + numLosses);
		  $("#currentTotal").text("Current total is " +  counter);
      }

  function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
    
  // This time, our click event applies to every single crystal on the page. Not just one.
  $(".crystal-image").on("click", function() {

    // Determining the crystal's value requires us to extract the value from the data attribute.
    // Using the $(this) keyword specifies that we should be extracting the crystal value of the clicked crystal.
    // Using the .attr("data-crystalvalue") allows us to grab the value out of the "data-crystalvalue" attribute.
    // Since attributes on HTML elements are strings, we must convert it to an integer before adding to the counter
    
    var crystalValue = ($(this).attr("data-crystalvalue"));
	  var crystVal = parseInt(crystalValue);
	
    // We then add the crystalValue to the user's "counter" which is a global variable.
    // Every click, from every crystal adds to the global counter.
    counter += crystVal;

    if (counter === targetNumber) {
	  numWins++;
	  displayScores();
    document.getElementById("lastWinLoss").style.visibility = "visible";
    document.getElementById("newSession").style.visibility = "visible";

    $("#lastWinLoss").text("You Won!");
    $("#newSession").text("Next click on a crystal will start a new session");

    console.log("You Win!");
    lastTimeWinLoss = "win";
	  startGame();
    }

    else if (counter >= targetNumber) {
    document.getElementById("lastWinLoss").style.visibility = "visible";
    document.getElementById("newSession").style.visibility = "visible";

    $("#lastWinLoss").text("You Lost");
    $("#newSession").text("Next click on a crystal will start a new session");
	  numLosses++;
	  displayScores();
    lastTimeWinLoss = "loss";
    startGame();
    }
	  else {
        //alert("entered else");
        $("#lastWinLoss").text = "some text";
        document.getElementById("lastWinLoss").style.visibility = "hidden";
        document.getElementById("newSession").style.visibility = "hidden";
	      displayScores();
	  }

  });
  
  //Main program
  startGame();
})
