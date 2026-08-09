const quiz = [
    {
        question: "বাংলাদেশের রাজধানী কী?",
        answers: ["খুলনা", "বরিশাল", "ঢাকা", "রাজশাহী"],
        correct: 2
    },
    {
        question: "HTML এর পূর্ণরূপ কী?",
        answers: [
            "Hyper Text Markup Language",
            "Home Tool Markup Language",
            "High Text Markup Language",
            "Hyper Tool Main Language"
        ],
        correct: 0
    },
    {
        question: "CSS কী কাজে ব্যবহার হয়?",
        answers: [
            "Design",
            "Database",
            "Programming",
            "Browser"
        ],
        correct: 0
    }
];

let current = 0;
let score = 0;
let wrong = 0;

let time = 10;
let timer;


function loadQuestion() {

    clearInterval(timer);

    time = 10;

    document.getElementById("timer").textContent =
        "সময়: " + time;

    document.getElementById("question").textContent =
        quiz[current].question;

    document.getElementById("questionNumber").textContent =
        "প্রশ্ন " + (current + 1) + " / " + quiz.length;

    let progress =
        ((current + 1) / quiz.length) * 100;

    document.getElementById("progress").style.width =
        progress + "%";

    let html = "";

    quiz[current].answers.forEach((answer, index) => {

        html += `
            <label>
                <input type="radio" name="answer" value="${index}">
                ${answer}
            </label>
        `;

    });

    document.getElementById("answers").innerHTML = html;

    document.getElementById("result").textContent = "";

    startTimer();
}


function startTimer() {

    clearInterval(timer);

    timer = setInterval(function () {

        time--;

        document.getElementById("timer").textContent =
            "সময়: " + time;

        if (time <= 0) {

            clearInterval(timer);

            alert("⏰ সময় শেষ!");

            current++;

            if (current < quiz.length) {

                loadQuestion();

            } else {

                finishQuiz();
            }
        }

    }, 1000);
}


function nextQuestion() {

    clearInterval(timer);

    let selected =
        document.querySelector('input[name="answer"]:checked');

    if (!selected) {

        alert("দয়া করে একটি উত্তর নির্বাচন করুন!");

        startTimer();

        return;
    }

    let selectedIndex = Number(selected.value);

    let correctIndex = quiz[current].correct;


    if (selectedIndex === correctIndex) {

        document.querySelectorAll("#answers label")[correctIndex]
            .classList.add("correct");

        score++;

        document.getElementById("result").textContent =
            "✅ সঠিক উত্তর!";

    } else {

        document.querySelectorAll("#answers label")[selectedIndex]
            .classList.add("wrong");

        document.querySelectorAll("#answers label")[correctIndex]
            .classList.add("correct");

        wrong++;

        document.getElementById("result").textContent =
            "❌ ভুল উত্তর!";
    }


    document.querySelectorAll('input[name="answer"]')
        .forEach(input => input.disabled = true);


    setTimeout(function () {

        current++;

        if (current < quiz.length) {

            loadQuestion();

        } else {

            finishQuiz();
        }

    }, 1000);
}


function finishQuiz() {

    clearInterval(timer);

    document.getElementById("question").textContent =
        "🎉 Quiz Complete!";

    document.getElementById("answers").innerHTML = "";

    let percentage =
        Math.round((score / quiz.length) * 100);

    document.getElementById("result").innerHTML =
        "🏆 আপনার স্কোর: " + score + " / " + quiz.length +
        "<br>✅ সঠিক: " + score +
        "<br>❌ ভুল: " + wrong +
        "<br>📊 শতাংশ: " + percentage + "%";

    document.getElementById("nextBtn").style.display =
        "none";

    document.getElementById("restartBtn").style.display =
        "inline-block";
}


function startQuiz() {

    current = 0;
    score = 0;
    wrong = 0;

    document.getElementById("startBtn").style.display =
        "none";

    document.getElementById("nextBtn").style.display =
        "inline-block";

    document.getElementById("restartBtn").style.display =
        "none";

    loadQuestion();
}


function restartQuiz() {

    current = 0;
    score = 0;
    wrong = 0;

    document.getElementById("nextBtn").style.display =
        "inline-block";

    document.getElementById("restartBtn").style.display =
        "none";
loadQuestion();
}
