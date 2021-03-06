$(document).ready(function(va){
	
  var targetNumber = 19;
  var numberOptions = [0, 0, 0, 0];
  var numWins = 0;
  var numLosses = 0;
  var counter = 0;

  startGame();
  function startGame(){
    targetNumber = getRandomInteger(19,120);
	counter = 0;
    setDat	aValuesForCrystals();
	displayScores();
  }

  function setDataValuesForCrystals(){
	  for (var i = 0; i < numberOptions.length; i++){
		  numberOptions[i] = getRandomInteger(1,12);
		  alert("setDataValuesForCrystals numberOption[" + i + "] = " + numberOptions[i]);
	  }
	  
  }
  /*
  ImageInfo
      amount.

  */
  
  function displayScores() {
		  $("#wins").text("Wins: " + numWins);
		  $("#losses").text("Losses: " + numLosses);
		  $("#currentTotal").text("Current total is " +  counter);
      }

  function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

    
  $("#number-to-guess").text(targetNumber);

  // Now for the hard part. Creating multiple crystals each with their own unique number value.

  // Next we create a for loop to create crystals for every numberOption.
  for (var i = 0; i < numberOptions.length; i++) {

    // For each iteration, we will create an imageCrystal
    var imageCrystal = $("<img>");

    // First each crystal will be given the class ".crystal-image".
    // This will allow the CSS to take effect.
    imageCrystal.addClass("crystal-image");

    // Each imageCrystal will be given a src link to the crystal image
    imageCrystal.attr("src", "http://cdn.playbuzz.com/cdn/35910209-2844-45c0-b099-f4d82878d54f/00261fda-4062-4096-81fd-8cf96b9034e8.jpg");

    // Each imageCrystal will be given a data attribute called data-crystalValue.
    // This data attribute will be set equal to the array value.
	
    imageCrystal.attr("data-crystalvalue", numberOptions[i]);
	alert("assigning image the data-crystalvalue  attribute " + i + " =" + numberOptions[i]);

    // Lastly, each crystal image (with all it classes and attributes) will get added to the page.
    $("#crystals").append(imageCrystal);
  }

  // This time, our click event applies to every single crystal on the page. Not just one.
  $(".crystal-image").on("click", function() {

    // Determining the crystal's value requires us to extract the value from the data attribute.
    // Using the $(this) keyword specifies that we should be extracting the crystal value of the clicked crystal.
    // Using the .attr("data-crystalvalue") allows us to grab the value out of the "data-crystalvalue" attribute.
    // Since attributes on HTML elements are strings, we must convert it to an integer before adding to the counter
    
    var crystalValue = ($(this).attr("data-crystalvalue"));
	console.log("this type is " + typeof(this));
	alert("click pressed - crystalValue is " + crystalValue);
	var crystVal = parseInt(crystalValue);
    // We then add the crystalValue to the user's "counter" which is a global variable.
    // Every click, from every crystal adds to the global counter.
    counter += crystVal;

    // All of the same game win-lose logic applies. So the rest remains unchanged.
    alert("New total: " + counter);

    if (counter === targetNumber) {
	  numWins++;
	  displayScores()
      alert("You win!");
	  numWins++;
	  startGame();
    }

    else if (counter >= targetNumber) {
	  numLosses++;
	  displayScores();
      alert("You lose!!");
	  startGame();
    }
	else {
	  displayScores();
	}

  });
  startGame();
})
