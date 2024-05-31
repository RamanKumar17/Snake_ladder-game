//fetching input
var player1Name = "";
var player2Name = "";

//validating inputs
function validateInputs() {

    player1Name = document.getElementById("player1-name").value;    
    player2Name = document.getElementById("player2-name").value;
  // Check if the inputs are empty
  if (player1Name.trim() === "" || player2Name.trim() === "") {
    alert("Input field cannot be empty");
  }else if(player1Name==player2Name){
    alert("Players name can't be identical (Case Sensitive)!!!!");
  }else {
    initializeLocalStorage();
    redirectToAnotherPage();
  }
}

//calling another function to open the game page
function redirectToAnotherPage() {
  window.location.href = "./Snake ladder/GameHtml.html?player1="+ player1Name + '&player2=' + player2Name;
}

//local storage values
function initializeLocalStorage() {
  localStorage.setItem(player1Name, "0");
  localStorage.setItem(player2Name, "0");
}
