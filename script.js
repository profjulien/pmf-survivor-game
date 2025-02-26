let currentQuestionIndex = 0;
let tokens = 15;  // Starting resources
let pmfScore = 0;
let teamName = "";

function startGame() {
    teamName = document.getElementById("teamInput").value.trim();

    if (teamName === "") {
        alert("Please enter a team name!");
        return;
    }

    document.getElementById("teamNameDisplay").innerText = teamName;

    // 🔹 Ensure the start screen disappears
    document.getElementById("startScreen").style.display = "none";
    
    // 🔹 Ensure game area & status become visible
    document.getElementById("gameArea").style.display = "block";
    document.getElementById("status").style.display = "block";

    // 🔹 Explicitly log progress to debug
    console.log("Game started: Team", teamName);
    console.log("Game area should now be visible");

    // 🚀 Load first question immediately
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endGame(`Game Over! Final PMF Score: ${pmfScore}, Remaining Tokens: ${tokens}`);
        return;
    }

    // 🔹 Debugging log
    console.log(`Loading question ${currentQuestionIndex + 1}`);

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

    // 🔹 Debugging logs
    console.log(`Tokens left: ${tokens}, PMF Score: ${pmfScore}`);

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

// 🔹 Ensure proper visibility on page load
window.onload = function() {
    console.log("Page loaded, hiding game area.");
    document.getElementById("gameArea").style.display = "none";
    document.getElementById("status").style.display = "none";
};
