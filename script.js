// Declare balance as a global variable
let balanceOnRefresh = parseInt(localStorage.getItem("balance")) || 1500;
const lootboxCost = 50; // Cost of each lootbox

// Display the balance on load
updateBalanceDisplay();

// Event listener for opening a lootbox
document.getElementById("openLootbox").addEventListener("click", () => {
  if (balanceOnRefresh >= lootboxCost) {
    balanceOnRefresh -= lootboxCost; // Deduct lootbox cost
    const prize = openLootbox(); // Get the prize
    balanceOnRefresh += prize; // Update the balance with the prize
    displayResult(prize); // Show the result
    updateBalance(); // Update balance display in local storage
  } else {
    alert("Not enough NL to open a lootbox!");
  }
});

// Function to open a lootbox and determine the prize
function openLootbox() {
  const randomNum = Math.random();

  // 50% chance for nothing
  if (randomNum < 0.5) {
    return 0;
  }
  // 25% chance for 10 NL
  else if (randomNum < 0.75) {
    return 10;
  }
  // 15% chance for 50 NL
  else if (randomNum < 0.9) {
    return 50;
  }
  // 10% chance for 100 NL
  else if (randomNum < 0.99) {
    return 100;
  }
  // 1% chance for 200 NL
  else {
    return 200;
  }
}

// Function to display the result of the lootbox opening
function displayResult(prize) {
  const resultText =
    prize > 0
      ? `You won ${prize} NL!`
      : `You won nothing. Better luck next time!`;
  document.getElementById("result").innerText = resultText;
}

// Function to update balance display
function updateBalanceDisplay() {
  document.getElementById("balance").innerText = balanceOnRefresh; // Update balance display
}

// Function to update balance in local storage
function updateBalance() {
  localStorage.setItem("balance", balanceOnRefresh); // Save balance to local storage
  updateBalanceDisplay(); // Update the UI with the new balance immediately
}

// Event listener to go to challenges page
document.getElementById("goToChallenges").addEventListener("click", () => {
  window.location.href = "challenge.html"; // Redirect to challenges page
});

// RPS Game Logic
document.querySelectorAll(".rps-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const playerChoice = button.dataset.choice;
    const computerChoice = getComputerChoice();
    const betAmount = parseInt(document.getElementById("betAmount").value);

    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balanceOnRefresh) {
      alert("Please enter a valid bet amount.");
      return;
    }

    const result = determineWinner(playerChoice, computerChoice, betAmount);
    displayChallengeResult(playerChoice, computerChoice, result, betAmount);

    // Update balance based on the result
    balanceOnRefresh += result.payout;
    updateBalance(); // Save updated balance to local storage and update display
  });
});

// Function to get the computer's choice
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

// Function to determine the winner of RPS
function determineWinner(player, computer, bet) {
  if (player === computer) {
    return { message: "It's a draw! 🤝", payout: bet }; // Return the bet amount
  }
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return { message: "You win! 🎉", payout: bet * 2 }; // Win, payout 2x
  }
  return { message: "You lose! 😢", payout: 0 }; // Lose, payout 0
}

// Function to display the result of the RPS game
function displayChallengeResult(player, computer, result, bet) {
  const challengeResultDiv = document.getElementById("challengeResult");
  challengeResultDiv.innerHTML = `You chose: ${player} <br> Computer chose: ${computer} <br> ${
    result.message
  } <br> You ${result.payout > 0 ? "receive" : "lost"}: ${result.payout} NL.`;
}

// Back to home button functionality
document.getElementById("backToHome").addEventListener("click", () => {
  window.location.href = "index.html"; // Redirect to main page
});

// Call the function to start earning for cursor movement (if implemented)
// startActivityReward();
