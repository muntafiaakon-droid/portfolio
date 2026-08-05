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
function loadQuestion(){

document.getElementById("question").innerHTML = quiz[current].question;

let html = "";

quiz[current].answers.forEach((answer,index)=>{

html += `
<label>
<input type="radio" name="answer" value="${index}">
${answer}
</label>
`;

});

document.getElementById("answers").innerHTML = html;

}

function nextQuestion(){

let selected = document.querySelector('input[name="answer"]:checked');

if(selected){

if(Number(selected.value) === quiz[current].correct){
score++;
}

}

current++;

if(current < quiz.length){

loadQuestion();

}else{

document.querySelector("button").style.display = "none";

document.getElementById("question").innerHTML = "Quiz Finished!";

document.getElementById("answers").innerHTML = "";

document.getElementById("result").innerHTML =
"আপনার স্কোর: " + score + " / " + quiz.length;

}

}

loadQuestion();
