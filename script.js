const questions = [
    { 
        question: "You have an idea but no validation. What do you do?", 
        options: [
            { text: "Run user interviews (Costs 2 tokens)", tokens: -2, pmf: 2 },
            { text: "Build a quick MVP (Costs 3 tokens)", tokens: -3, pmf: 3 },
            { text: "Launch immediately (No cost)", tokens: 0, pmf: -2 }
        ]
    },
    { 
        question: "Your MVP works, but users aren’t excited. What next?", 
        options: [
            { text: "Pivot based on feedback (Costs 3 tokens)", tokens: -3, pmf: 3 },
            { text: "Improve marketing (Costs 2 tokens)", tokens: -2, pmf: 1 },
            { text: "Ignore feedback and push forward (No cost)", tokens: 0, pmf: -2 }
        ]
    },
    { 
        question: "A competitor is working on a similar idea. How do you react?", 
        options: [
            { text: "Focus on differentiation (Costs 3 tokens)", tokens: -3, pmf: 2 },
            { text: "Speed up development to beat them (Costs 4 tokens)", tokens: -4, pmf: 3 },
            { text: "Ignore them (No cost)", tokens: 0, pmf: -2 }
        ]
    }
];

let currentQuestionIndex = 0;
let tokens = 10;
let pmfScore = 0;
let teamName = "";

function startGame() {
    teamName = document.getElementById("teamInput").value || "Team Unknown";
    document.getElementById("teamName").innerText = teamName;
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameArea").style.display = "block";
    loadQuestion();
}

function loadQuestion() {
    document.getElementById('questionText').innerText = questions[currentQuestionIndex].question;
    document.getElementById('options').innerHTML = "";
    questions[currentQuestionIndex].options.forEach((option, index) => {
        let btn = document.createElement("button");
        btn.innerText = option.text;
        btn.onclick = () => selectOption(index);
        document.getElementById('options').appendChild(btn);
    });
}

function selectOption(index) {
    const selectedOption = questions[currentQuestionIndex].options[index];
    tokens += selectedOption.tokens;
    pmfScore += selectedOption.pmf;

    document.getElementById('tokensLeft').innerText = tokens;
    document.getElementById('pmfScore').innerText = pmfScore;

    setTimeout(nextQuestion, 500); // Auto-advance after 0.5s delay
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        document.getElementById('gameArea').innerHTML = "<h2>Game Over!</h2><p>Final PMF Score: " + pmfScore + "</p><p>Remaining Tokens: " + tokens + "</p>";
    }
}

window.onload = function() {
    document.getElementById("gameArea").style.display = "none";
};
