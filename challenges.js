// Load balance from local storage (not necessary, it's already declared in script.js)
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
    localStorage.setItem("balance", balanceOnRefresh); // Save updated balance
    updateBalanceDisplay(); // Update balance display after the game
  });
});

// Update balance display function
function updateBalanceDisplay() {
  const balanceDisplay = document.createElement("p");
  balanceDisplay.innerText = `Current Balance: ${balanceOnRefresh} NL`;
  document
    .querySelector(".container")
    .insertBefore(balanceDisplay, document.querySelector(".bet-info"));
}

// Show balance on challenge page load
updateBalanceDisplay();

// Remaining functions...
