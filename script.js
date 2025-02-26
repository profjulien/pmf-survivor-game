let currentQuestionIndex = 0;
let tokens = 15;  // Ensures enough resources for strategic play
let pmfScore = 0;
let teamName = "";

function startGame() {
    teamName = document.getElementById("teamInput").value.trim();
    
    if (teamName === "") {
        alert("Please enter a team name!");
        return;
    }

    document.getElementById("teamNameDisplay").innerText = teamName;
    
    // Hide start screen and show game area
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameArea").style.display = "block";
    document.getElementById("status").style.display = "block";

    // 🚀 Ensure the first question loads
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endGame(`Game Over! Final PMF Score: ${pmfScore}, Remaining Tokens: ${tokens}`);
        return;
    }

    document.getElementById('questionText').innerText = questions[currentQuestionIndex].question;
    document.getElementById('options').innerHTML = "";
    
    questions[currentQuestionIndex].options.forEach((option, index) => {
        let btn = document.createElement("button");
        btn.innerText = option.text;
        btn.onclick = () => selectOption(index);
        btn.classList.add("option-button");
        document.getElementById('options').appendChild(btn);
    });
}

function selectOption(index) {
    const selectedOption = questions[currentQuestionIndex].options[index];
    
    // Disable all buttons to prevent multiple selections
    document.querySelectorAll(".option-button").forEach(btn => btn.disabled = true);

    tokens += selectedOption.tokens;

    if (tokens < 0) {
        endGame("You ran out of resources! Your startup failed.");
        return;
    }

    if (selectedOption.pmf === "random") {
        const randomOutcome = Math.random() < 0.5 ? 3 : -2;
        pmfScore += randomOutcome;
    } else {
        pmfScore += selectedOption.pmf;
    }

    document.getElementById('tokensLeft').innerText = tokens;
    document.getElementById('pmfScore').innerText = pmfScore;

    setTimeout(nextQuestion, 800);
}

function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

function endGame(message) {
    document.getElementById('gameArea').innerHTML = `<h2>${message}</h2>`;
}

window.onload = function() {
    document.getElementById("gameArea").style.display = "none";
    document.getElementById("status").style.display = "none";
};
