var snakeLadderNumbers = [];
var numberOne = 100;
var numberTwo = 81;

var boxes = document.querySelectorAll(".num");
var divBox = document.querySelectorAll(".box");


// Function to get URL parameters
function getParameterByName(name, url) {
  console.log(window.location.href);

  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Retrieve player names from URL
var player1Name = getParameterByName('player1');
var player2Name = getParameterByName('player2');

// Save player names into JavaScript variables
var player1 = player1Name;
var player2 = player2Name;
document.getElementById("player1name").innerText=player1;
document.getElementById("player2name").innerText=player2;
document.getElementById("displayUser").innerText=player1;
document.getElementById("listUser1").innerText=player1;
document.getElementById("listUser2").innerText=player2;

// Initialize a counter for the box index
var boxIndex = 0;
for (var i = 0; i < 10; i++) {
  snakeLadderNumbers[i] = []; // Initialize inner array
  for (var j = 0; j < 10; j++) {
    if (i % 2 == 0) {
      snakeLadderNumbers[i][j] = numberOne;
      boxes[boxIndex].innerText = numberOne;
      boxIndex++;
      numberOne--;
    } else {
      snakeLadderNumbers[i][j] = numberTwo;
      boxes[boxIndex].innerText = numberTwo;
      boxIndex++;
      numberTwo++;
    }
  }
  if (i % 2 == 0) {
    numberOne -= 10;
  } else {
    numberTwo -= 30;
  }
}
console.log(snakeLadderNumbers);

//function to show the output numbers on board
var diceResult;
function showOutput() {
  diceResult = Math.floor(Math.random() * 6) + 1;
  document.getElementById("number").innerText = diceResult;
  moveIcon();
}

var user = true;
//boolean variables to check if one came or not in the first attempt of rolling a dice
var player1FirstNumberBoolean=false;
var player2FirstNumberBoolean=false;

function moveIcon() {
  if (user) {

    //checking for user-One
    var player1FirstNumber=diceResult;
    
    if(player1FirstNumber==1){
      player1FirstNumberBoolean=true;
    }
    //if one comes it will be executed 
    if(player1FirstNumberBoolean){
      moveUserOne();
    }


    if(diceResult==6){
      user=true;
    }else{
      document.getElementById("turn-one").style.display = "none";
      document.getElementById("turn-two").style.display = "contents";
      document.getElementById("displayUser").innerText = player2;
      user = false;
    }
  } else {
    //checking for user-two
    var player2FirstNumber=diceResult;
    
    if(player2FirstNumber==1){
      player2FirstNumberBoolean=true;
    }
    //if one comes it will be executed 
    if(player2FirstNumberBoolean){
      moveUserTwo();
    }

    if(diceResult==6){
      user=false;
    }else{
      document.getElementById("turn-two").style.display = "none";
      document.getElementById("turn-one").style.display = "contents";
      document.getElementById("displayUser").innerText = player1;
      user = true;
    }
    // console.log("User2");
  }
}

//moving first user
var nextPositionOne = 0;
function moveUserOne() {
  nextPositionOne += diceResult;
  if (nextPositionOne > 100) {
    nextPositionOne -= diceResult;
    return;
  }

  //updating nextposition if ladder is used
  getLadderOne();
  // updating if snake bite the user
  snakeBiteOne();

  var iconElement = document.querySelector(".fa-person-military-rifle");
  // Get the destination box
  var destination = 0;
  // console.log(nextPositionOne);

  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      if (snakeLadderNumbers[i][j] == nextPositionOne) {
        destination = ".r" + (i + 1) + "-c" + (j + 1);
        var destinationBox = document.querySelector(destination);
        destinationBox.appendChild(iconElement);
        if (nextPositionOne == 100) {
          setTimeout(function () {
            alert(player1+" is the Winner");
            location.reload();
          }, 1000);
          //Storing it in local storage
          incrementWinCount(player1);
        }

        return;
      }
    }
  }
}

//moving second user
var nextPositionTwo = 0;
function moveUserTwo() {
  nextPositionTwo += diceResult;
  if (nextPositionTwo > 100) {
    nextPositionTwo -= diceResult;
    return;
  }

  //updating nextposition if ladder is used
  getLadderTwo();
  // updating if snake bite the user
  snakeBiteTwo();

  var iconElement = document.querySelector(".fa-user");
  // Get the destination box
  var destination = 0;
  // console.log(nextPositionTwo);

  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      if (snakeLadderNumbers[i][j] == nextPositionTwo) {
        destination = ".r" + (i + 1) + "-c" + (j + 1);
        var destinationBox = document.querySelector(destination);
        destinationBox.appendChild(iconElement);
        if (nextPositionTwo == 100) {
          setTimeout(function () {
            alert(player2+" is the Winner");
            location.reload();
          }, 1000);
          //Storing it in local storage
          incrementWinCount(player2);
        }

        return;
      }
    }
  }
}

// ladder and snakebites updation for user1
function getLadderOne() {
  if (nextPositionOne == 10) {
    nextPositionOne = 29;
  } else if (nextPositionOne == 15) {
    nextPositionOne = 36;
  } else if (nextPositionOne == 20) {
    nextPositionOne = 39;
  } else if (nextPositionOne == 54) {
    nextPositionOne = 74;
  } else if (nextPositionOne == 71) {
    nextPositionOne = 91;
  } else if (nextPositionOne == 76) {
    nextPositionOne = 95;
  } else if (nextPositionOne == 80) {
    nextPositionOne = 99;
  }
}
function snakeBiteOne() {
  if (nextPositionOne == 14) {
    nextPositionOne = 9;
  } else if (nextPositionOne == 19) {
    nextPositionOne = 4;
  } else if (nextPositionOne == 34) {
    nextPositionOne = 27;
  } else if (nextPositionOne == 37) {
    nextPositionOne = 17;
  } else if (nextPositionOne == 53) {
    nextPositionOne = 32;
  } else if (nextPositionOne == 57) {
    nextPositionOne = 43;
  } else if (nextPositionOne == 62) {
    nextPositionOne = 42;
  } else if (nextPositionOne == 66) {
    nextPositionOne = 46;
  } else if (nextPositionOne == 72) {
    nextPositionOne = 68;
  } else if (nextPositionOne == 83) {
    nextPositionOne = 64;
  } else if (nextPositionOne == 94) {
    nextPositionOne = 88;
  } else if (nextPositionOne == 97) {
    nextPositionOne = 85;
  }
}

// ladder and snakebites updation for user2
function getLadderTwo() {
  if (nextPositionTwo == 10) {
    nextPositionTwo = 29;
  } else if (nextPositionTwo == 15) {
    nextPositionTwo = 36;
  } else if (nextPositionTwo == 20) {
    nextPositionTwo = 39;
  } else if (nextPositionTwo == 54) {
    nextPositionTwo = 74;
  } else if (nextPositionTwo == 71) {
    nextPositionTwo = 91;
  } else if (nextPositionTwo == 76) {
    nextPositionTwo = 95;
  } else if (nextPositionTwo == 80) {
    nextPositionTwo = 99;
  }
}
function snakeBiteTwo() {
  if (nextPositionTwo == 14) {
    nextPositionTwo = 9;
  } else if (nextPositionTwo == 19) {
    nextPositionTwo = 4;
  } else if (nextPositionTwo == 34) {
    nextPositionTwo = 27;
  } else if (nextPositionTwo == 37) {
    nextPositionTwo = 17;
  } else if (nextPositionTwo == 53) {
    nextPositionTwo = 32;
  } else if (nextPositionTwo == 57) {
    nextPositionTwo = 43;
  } else if (nextPositionTwo == 62) {
    nextPositionTwo = 42;
  } else if (nextPositionTwo == 66) {
    nextPositionTwo = 46;
  } else if (nextPositionTwo == 72) {
    nextPositionTwo = 68;
  } else if (nextPositionTwo == 83) {
    nextPositionTwo = 64;
  } else if (nextPositionTwo == 94) {
    nextPositionTwo = 88;
  } else if (nextPositionTwo == 97) {
    nextPositionTwo = 85;
  }
}

// Function to initialize or retrieve win count for a specific user from local storage
function initializeWinCount(userId) {
  // Check if win count exists in local storage for the user
  if (localStorage.getItem(userId)) {
    // Retrieve win count from local storage
    return parseInt(localStorage.getItem(userId));
  } else {
    // If win count doesn't exist, initialize it to 0
    localStorage.setItem(userId, "0");
    return 0;
  }
}
// Function to increment win count for a specific user and update local storage
function incrementWinCount(userId) {
  // Get current win count for the user from local storage
  var winCount = initializeWinCount(userId);
  // Increment win count
  winCount++;
  // Update win count in local storage for the user
  localStorage.setItem(userId, winCount.toString());
//   console.log(userId+" "+winCount);
}
document.getElementById("games-won-by-user1").innerText=" "+localStorage.getItem(player1);
document.getElementById("games-won-by-user2").innerText=" "+localStorage.getItem(player2);

var winner = false;
function winnerList(){
    if(winner==false){
        document.getElementById("displayWinner").style.display="contents";
        winner=true;
    }else{
        document.getElementById("displayWinner").style.display="none";
        winner=false;
    }
}
