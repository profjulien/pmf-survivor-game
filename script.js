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
            { text: "Speed up development (-4 tokens, 50% +3 PMF / 50% -1 PMF)", tokens: -4, pmf: "random" },
            { text: "Ignore them (No cost)", tokens: 0, pmf: -2 }
        ]
    },
    { 
        question: "Customers like the product but won’t pay. Next step?", 
        options: [
            { text: "Adjust pricing (Costs 2 tokens)", tokens: -2, pmf: 2 },
            { text: "Offer freemium (-3 tokens, 50% +3 PMF / 50% -1 PMF)", tokens: -3, pmf: "random" },
            { text: "Keep pricing the same (No cost)", tokens: 0, pmf: -1 }
        ]
    },
    { 
        question: "An investor offers funding, but they want fast growth. Accept?", 
        options: [
            { text: "Accept funding (0 tokens, 50% +3 PMF / 50% -2 PMF)", tokens: 0, pmf: "random" },
            { text: "Negotiate better terms (Costs 2 tokens)", tokens: -2, pmf: 2 },
            { text: "Reject and grow organically (Costs 2 tokens)", tokens: -2, pmf: 2 }
        ]
    },
    { 
        question: "Choosing a go-to-market strategy. Best approach?", 
        options: [
            { text: "Paid ads (Costs 3 tokens)", tokens: -3, pmf: 3 },
            { text: "Partnerships (Costs 2 tokens)", tokens: -2, pmf: 2 },
            { text: "Viral marketing (0 tokens, 50% +3 PMF / 50% -1 PMF)", tokens: 0, pmf: "random" }
        ]
    },
    { 
        question: "Investors push for fast growth, but unit economics are weak.", 
        options: [
            { text: "Raise more funding (0 tokens, 50% +3 PMF / 50% -2 PMF)", tokens: 0, pmf: "random" },
            { text: "Focus on profitability (Costs 2 tokens)", tokens: -2, pmf: 2 },
            { text: "Scale aggressively (No cost)", tokens: 0, pmf: -3 }
        ]
    }
];

let currentQuestionIndex = 0;
let tokens = 10;
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

    loadQuestion();
}

function loadQuestion() {
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

    if (selectedOption.pmf === "random") {
        const randomOutcome = Math.random() < 0.5 ? 3 : -2;  // 50% chance
        pmfScore += randomOutcome;
        alert("Random outcome: " + (randomOutcome > 0 ? "+3 PMF!" : "-2 PMF!"));
    } else {
        pmfScore += selectedOption.pmf;
    }

    document.getElementById('tokensLeft').innerText = tokens;
    document.getElementById('pmfScore').innerText = pmfScore;

    setTimeout(nextQuestion, 800); // Auto-advance after 0.8 seconds
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        document.getElementById('gameArea').innerHTML = `<h2>Game Over!</h2>
        <p>Final PMF Score: ${pmfScore}</p>
        <p>Remaining Tokens: ${tokens}</p>`;
    }
}

window.onload = function() {
    document.getElementById("gameArea").style.display = "none";
    document.getElementById("status").style.display = "none";
};
