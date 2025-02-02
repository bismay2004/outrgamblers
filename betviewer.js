document.getElementById("darkModeToggle").addEventListener("change", (e) => {
    document.body.classList.toggle("dark-mode", e.target.checked);
});

// Load saved bets
let bets = JSON.parse(localStorage.getItem("bets")) || [];

function updateBetsTable() {
    const betList = document.getElementById("betList");
    betList.innerHTML = "";

    bets.forEach(bet => {
        const row = document.createElement("tr");

        // Format date, if invalid or missing, replace with '--/--'
        let formattedDate = new Date(bet.time);
        if (isNaN(formattedDate.getTime())) {
            formattedDate = '--/--';
        } else {
            formattedDate = formattedDate.toLocaleString();
        }

        row.innerHTML = `<td>${bet.name}</td><td>₹${bet.betAmount}</td><td>Team ${bet.team}</td><td>${formattedDate}</td>`;
        betList.appendChild(row);
    });

    updatePredictions();
}

// Predict Winnings
function updatePredictions() {
    const totalBetA = bets.filter(bet => bet.team === "A").reduce((sum, bet) => sum + bet.betAmount, 0);
    const totalBetB = bets.filter(bet => bet.team === "B").reduce((sum, bet) => sum + bet.betAmount, 0);
    const totalMoney = totalBetA + totalBetB;
    const commissionRate = 0.1;
    const winningPool = totalMoney * (1 - commissionRate);

    let teamAWinText = totalBetA > 0 ? bets.filter(bet => bet.team === "A").map(bet => `${bet.name} gets ₹${((bet.betAmount / totalBetA) * winningPool).toFixed(2)}`).join("\n") : "No bets on Team A.";
    let teamBWinText = totalBetB > 0 ? bets.filter(bet => bet.team === "B").map(bet => `${bet.name} gets ₹${((bet.betAmount / totalBetB) * winningPool).toFixed(2)}`).join("\n") : "No bets on Team B.";

    document.getElementById("teamAWins").textContent = teamAWinText;
    document.getElementById("teamBWins").textContent = teamBWinText;
}



// Initialize
updateBetsTable();





document.addEventListener("DOMContentLoaded", function () {
    let loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
        window.location.href = "login.html"; // Redirect if not logged in
    }

    document.getElementById("welcomeText").textContent = `Welcome, ${loggedInUser}`;
    
    let profileIcon = document.getElementById("profileIcon");
    let dropdown = document.getElementById("profileDropdown");

    profileIcon.addEventListener("click", function () {
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    });

    document.getElementById("logoutButton").addEventListener("click", function () {
        localStorage.removeItem("loggedInUser");
        window.location.href = "login.html"; // Logout and redirect
    });
});






// Function to initialize dark mode based on localStorage
function initDarkMode() {
    const darkModePreference = localStorage.getItem("darkMode") === "true";
    if (darkModePreference) {
        document.body.classList.add("dark-mode");
        document.getElementById("darkModeToggle").checked = true;
    } else {
        document.body.classList.remove("dark-mode");
        document.getElementById("darkModeToggle").checked = false;
    }
}

// Apply dark mode preference when the toggle is changed
document.getElementById("darkModeToggle").addEventListener("change", (e) => {
    if (e.target.checked) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "true");
    } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "false");
    }
});

// Initialize dark mode on page load
window.addEventListener("load", initDarkMode);
