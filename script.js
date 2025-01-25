// Function to update the bets list and table (for showing data on page)
function updateBetsList() {
    const betList = document.getElementById("betList");
    betList.innerHTML = "";
    bets.forEach(bet => {
        const listItem = document.createElement("li");
        listItem.textContent = `${bet.name} bet ₹${bet.betAmount} on Team ${bet.team}`;
        betList.appendChild(listItem);
    });

    const betsTable = document.getElementById("betsTable");
    betsTable.innerHTML = `<tr><th>Name</th><th>Bet Amount</th><th>Team</th></tr>`;
    bets.forEach(bet => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${bet.name}</td><td>₹${bet.betAmount}</td><td>Team ${bet.team}</td>`;
        betsTable.appendChild(row);
    });
}

// When the "Add Bet" button is clicked
document.getElementById("addBet").addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const betAmount = parseFloat(document.getElementById("betAmount").value);
    const team = document.getElementById("team").value;

    if (name && betAmount > 0) {
        const bet = { name, betAmount, team };
        bets.push(bet);

        // Save to localStorage
        localStorage.setItem("bets", JSON.stringify(bets));

        // Clear input fields
        document.getElementById("name").value = "";
        document.getElementById("betAmount").value = "";
        document.getElementById("team").value = "A";

        // Update list and table
        updateBetsList();
    }
});

// When the "Calculate Winnings" button is clicked
document.getElementById("calculate").addEventListener("click", () => {
    const profitPercentage = parseFloat(document.getElementById("profitPercentage").value) / 100;
    const winner = document.getElementById("winner").value;

    if (!winner) {
        alert("Please select a winning team.");
        return;
    }

    const totalBetA = bets.filter(bet => bet.team === "A").reduce((sum, bet) => sum + bet.betAmount, 0);
    const totalBetB = bets.filter(bet => bet.team === "B").reduce((sum, bet) => sum + bet.betAmount, 0);
    const totalMoney = totalBetA + totalBetB;
    const profit = totalMoney * profitPercentage;
    const distributable = totalMoney - profit;

    const winners = bets.filter(bet => bet.team === winner);
    const totalWinnerBet = winners.reduce((sum, bet) => sum + bet.betAmount, 0);

    document.getElementById("managementCut").textContent = `Management Cut: ₹${profit.toFixed(2)}`;
    const winnersList = document.getElementById("winnersList");
    winnersList.innerHTML = "";

    winners.forEach(winner => {
        const amount = ((winner.betAmount / totalWinnerBet) * distributable).toFixed(2);
        const winnerItem = document.createElement("li");
        winnerItem.textContent = `${winner.name} wins ₹${amount}`;
        winnersList.appendChild(winnerItem);
    });
});

// When the "Clear All Data" button is clicked
document.getElementById("clearAll").addEventListener("click", () => {
    // Clear localStorage
    localStorage.removeItem("bets");

    // Reset bets array
    bets = [];

    // Update the bet list and table (which will be empty now)
    updateBetsList();

    // Optional: You can clear the results as well
    document.getElementById("managementCut").textContent = "";
    document.getElementById("winnersList").innerHTML = "";
});

// Retrieve saved bets from localStorage on page load
let bets = JSON.parse(localStorage.getItem("bets")) || [];

// Update the list and table on page load
updateBetsList();
