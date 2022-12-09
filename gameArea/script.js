const questions = document.querySelector(".questions");
const buttonAnswer = document.querySelector(".answer-button");
const buttonAnswers = document.querySelectorAll(".answer");
const buttonAns = document.querySelectorAll(".answer");
const score = document.querySelector(".skor");
const wrong = document.querySelector(".wrong");
const buttonGo = document.querySelector(".start");
const restartBotton = document.querySelector(".restart");
const timer = document.querySelector(".timer");
const popUp = document.querySelector(".pop-up");

let angka1 = Math.floor(Math.random() * 10);
let angka2 = Math.floor(Math.random() * 10);
let hitung = operasiHitung();
let skor = 1;

restartBotton.addEventListener("click", () => {
  startButtonGo();
  skor = 1;
  score.textContent = `Sekor : 0`;
  timer.innerHTML = "Restart";
});
function startButtonGo() {
  buttonGo.style.display = "grid";
  buttonGo.style.color = "white";
  buttonAnswer.style.display = "none";
  questions.textContent = "Mulai";
}

buttonGo.addEventListener("click", (button) => {
  buttonGo.style.display = "none";
  buttonAnswer.style.display = "flex";
  runing(button);
  timerFunction(isTimer);
});

buttonAnswers.forEach((buttonAnswer) => {
  buttonAnswer.addEventListener("click", (button) => {
    runing(button);
  });
});

function runing(button) {
  const clickTarget = button.target;
  if (questions.textContent == "Mulai") {
    questions.textContent = 81224084;
  }
  let afterQuestion = questions.textContent;
  let nowQuestion = isQuestion();
  let result = eval(afterQuestion).toString();
  let nowResult = eval(nowQuestion).toString();
  questions.textContent = nowQuestion;
  runRandomAnswer(result, clickTarget);
  runWinner(nowResult);
  changeColor(clickTarget);
}
function operasiHitung() {
  const random = Math.floor(Math.random() * 4) + 1;
  let oprH;
  if (random === 1) {
    oprH = "+";
  } else if (random === 2) {
    oprH = "*";
  } else if (random === 3) {
    oprH = "/";
  } else {
    oprH = "-";
  }
  return oprH;
}
function isQuestion() {
  return randomNumber() + operasiHitung() + randomNumber();
}

function randomNumber() {
  return Math.floor(Math.random() * 10);
}
function randomNumberAnswar() {
  return Math.floor(Math.random() * 100);
}
function intejer() {
  return Math.floor(Math.random() * 4);
}
function runRandomAnswer(result, clickTarget) {
  if (result.length > 4) {
    let hasil = Number(result).toFixed(3);
    const target = Number(clickTarget.innerHTML).toFixed(3);
    winnerCheck(hasil, target);
  } else {
    let hasil = Number(result);
    const target = Number(clickTarget.innerHTML);
    winnerCheck(hasil, target);
  }
}
function randomAnswer(nowResult) {
  buttonAnswers[0].innerHTML = randomNumberAnswar();
  buttonAnswers[1].innerHTML = randomNumberAnswar();
  buttonAnswers[2].innerHTML = randomNumberAnswar();
  buttonAnswers[3].innerHTML = randomNumberAnswar();
  buttonAnswers[intejer()].innerHTML = nowResult;
}
function runWinner(nowResult) {
  if (nowResult.length > 4) {
    let hasil2 = Number(nowResult).toFixed(3);
    randomAnswer(hasil2);
  } else {
    let hasil2 = Number(nowResult);
    randomAnswer(hasil2);
  }
}
function winnerCheck(result, target) {
  if (result === target) {
    score.textContent = `Sekor : ${skor++}`;
  } else if (result === "81224084.000") {
    return;
  } else {
    wrong.style.opacity = "1";
    wrong.style.transform = "scale(.9)";
    setTimeout(() => {
      wrong.style.opacity = "0";
      wrong.style.transform = "scale(1)";
    }, 1000);
  }
}
function changeColor(clickTarget) {
  buttonAnswers.forEach((m) => {
    if (m.classList.contains("ganti-warna")) {
      m.classList.remove("ganti-warna");
    }
  });
  clickTarget.classList.add("ganti-warna");
}

// POP-UP Awal browser di buka dan menentukan gameplay nya
// AWAL
const controls = document.querySelector(".controls");
const buttonControls = document.querySelectorAll(".bottom-control");
const bottomStart = document.querySelector(".bottom-start");
const isWrongSelection = document.querySelector(".wrong-selection");
let isMathOperation;
let isTimer;

buttonControls.forEach((buttons) => {
  buttons.addEventListener("click", (button) => {
    let selectOperation = button.target.dataset.mathOperasi;
    let selectTimer = button.target.dataset.timerSet;
    declarationSelect(selectOperation, selectTimer);
  });
});
bottomStart.addEventListener("click", () => {
  if (isMathOperation == undefined) {
    wrongSelection();
  } else if (isTimer == undefined) {
    wrongSelection();
  } else {
    popUp.classList.add("closeActive");
    controls.classList.add("closeActive");
  }
});

function wrongSelection() {
  if (isMathOperation) {
    isWrongSelection.style.opacity = 1;
    isWrongSelection.innerHTML = "Kamu belum memilih Waktu nya!!!";
  } else if (isTimer) {
    isWrongSelection.style.opacity = 1;
    isWrongSelection.innerHTML = "Kamu belum memilih Operasi Matematika nya!!!";
  } else {
    isWrongSelection.style.opacity = 1;
    isWrongSelection.innerHTML = "Harap pilih keduanya, masing-masing satu!!!";
  }
  isWrongSelection.style.transform = "scale(1)";
  setTimeout(() => {
    isWrongSelection.style.transform = "scale(0)";
  }, 3000);
}


function declarationSelect(selectOperation, selectTimer) {
  if (selectOperation === "random") {
    isMathOperation = "random";
  } else if (selectOperation) {
    isMathOperation = selectOperation;
  } else if (selectTimer === "custom") {
    customTimer();
  } else if (selectTimer) {
    isTimer = selectTimer;
  }
}
//// TIMER / HITUNG MUNDUR
const popupResultss = document.querySelector(".results");
function timerFunction(isTimer) {
  let nowTimer = Number(isTimer) + 1;
  let runingTimer = setInterval(() => {
    let updateTimer = (nowTimer -= 1);
    timer.textContent = `${updateTimer} detik`;
    if (updateTimer <= 0) {
      clearInterval(runingTimer);
      startButtonGo();
      popupResultss.innerHTML = popupResult();
      timer.textContent = "waktu habis";
      popUp.classList.remove("closeActive");
      controls.classList.add("closeActive");
      popupResultss.classList.remove("closeActive");
      clickStartAway();
    }
    restartBotton.addEventListener("click", () => {
      clearInterval(runingTimer);
      popupResultss.innerHTML = "Dibatalkan";
    });
  }, 1000);
}

function popupResult() {
  return `<div class="result-popup ">
            <span>Sekor ${skor - 1}</span>
            <span>Waktu ${isTimer} detik</span>
            <span>Operasi \n (${isMathOperation})</span>
            <button class="control goAway">Main lagi</button>
            <img src="../img/close.png" alt="close" class="closes">
          </div>`;
}
function clickStartAway() {
  const mulaiLagi = document.querySelector(".goAway");
  mulaiLagi.addEventListener("click", () => {
    skor = 1;
    score.textContent = `Sekor : 0`;
    popUp.classList.add("closeActive");
    popupResultss.classList.add("closeActive");
  });
}

function operasiHitung() {
  const random = Math.floor(Math.random() * 4) + 1;
  let oprH;
  if (random === 1) {
    oprH = "+";
  } else if (random === 2) {
    oprH = "*";
  } else if (random === 3) {
    oprH = "/";
  } else {
    oprH = "-";
  }
  return oprH;
}

function isQuestion() {
  if (isMathOperation === "random") {
    return randomNumber() + "    " + operasiHitung() + "    " + randomNumber();
  } else {
    return randomNumber() + isMathOperation + randomNumber();
  }
}
// CUSTOM WAKTU
const popupCustomTimer = document.querySelector(".popup-custom-timer");
const timerInput = document.querySelector("#timerInput");
const fixedTimer = document.querySelector(".fixedTimer");
const dataCostomWaktu = document.querySelectorAll("[data-costomWaktu]");
const addTimerText = document.querySelector(".addTimerHtml");
const wrongInput = document.querySelector(".wrong-input");
let textCustom;


function customTimer() {
  popupCustomTimer.classList.add("active");
}
buttonTimerClick();

function buttonTimerClick() {
  dataCostomWaktu.forEach((button) => {
    button.addEventListener("click", (buttonTimerParameter) => {
      let tombol = buttonTimerParameter.target.dataset.costomwaktu;
      if (tombol === "menit") {
        isTimer = timerInput.value * 60;
        textCustom = "menit";
      } else if (tombol === "detik") {
        isTimer = timerInput.value;
        textCustom = "detik";
      }
    });
  });
}

timerInput.addEventListener("keyup", () => {
  dataCostomWaktu.forEach((m) => {
    if (m.classList.contains("ganti-warna")) {
      m.classList.remove("ganti-warna");
    }
  });
});

fixedTimer.addEventListener("click", () => {
  let i = Array.from(dataCostomWaktu[0].classList);
  let b = Array.from(dataCostomWaktu[1].classList);
  let gabung = i.concat(b);

  if (
    isTimer == undefined &&
    timerInput.value == "" &&
    !gabung.includes("ganti-warna")
  ) {
    wrongInput.innerHTML = "close jika tidak ingin menggunakan!!!";
    addTimerText.innerHTML = `Custom`;
  } else if (timerInput.value.length == 0) {
    wrongInput.innerHTML = "harap masukan angka!!!";
    isTimer = undefined;
  } else if (!gabung.includes("ganti-warna")) {
    wrongInput.innerHTML = "harap masukan detik atau menit!!!";
    isTimer = undefined;
  } else {
    popupCustomTimer.classList.toggle("active");
    addTimerText.innerHTML = `Custom ${timerInput.value} ${textCustom}`;
  }
  console.log(isTimer);
  wrongInput.style.transform = "scale(1)";
  setTimeout(() => {
    wrongInput.style.transform = "scale(0)";
  }, 3000);
});

// CLOSE POPUP
document.addEventListener("click", (buttonClose) => {
  if (buttonClose.target.classList == "closes") {
    buttonClose.target.parentElement.parentElement.parentElement.classList.toggle(
      "closeActive"
    );
    popupResultss.classList.toggle("closeActive");
    score.textContent = `Sekor : 0`;
  } else if (buttonClose.target.classList[0] == "close") {
    buttonClose.target.parentElement.classList.toggle("active");
    console.log(timerInput.value.length);
    console.log(isTimer);
    tetings()
  } else if (buttonClose.target.classList[0] == "calClose") {
    containerCalculator.style.transform = "scale(0)";
  }
});
function tetings(){
  let i = Array.from(dataCostomWaktu[0].classList);
  let b = Array.from(dataCostomWaktu[1].classList);
  let gabung = i.concat(b);

  if(timerInput.value.length == 0){
    isTimer = undefined
    addTimerText.innerHTML = `Custom`
  } else if(!gabung.includes('ganti-warna')){
    isTimer = undefined
    addTimerText.innerHTML = 'Custom'
  }
  else{
    isTimer = isTimer;
    timerInput.value = isTimer;
    // gabung.push('ganti-warna')
    addTimerText.innerHTML = `Custom ${timerInput.value} ${textCustom}`;
  }
}

//// GEAR CLICK
const gear = document.querySelector(".gear");
const closeAwal = document.querySelector(".closeAwal");
gear.addEventListener("click", () => {
  popUp.classList.toggle("closeActive");
  controls.classList.toggle("closeActive");
  closeAwal.classList.add("active");
  popupResultss.classList.add("closeActive");
  // isMathOperation = undefined;
  // isTimer = undefined;
  closeAwal.addEventListener("click", (m) => {
    m.target.parentElement.parentElement.classList.add("closeActive");
    popUp.classList.add("closeActive");
    controls.classList.add("closeActive");
  });
});

// CALCULATOR CLICK
const calculator = document.querySelector(".calculator");
const containerCalculator = document.querySelector(".container-calculator");

calculator.addEventListener("click", () => {
  containerCalculator.style.transform = "scale(1)";
});

// GANTI WARNA POP-UP KETIKA DI KLIK
const timerSets = document.querySelectorAll("[data-timer-set]");
const mathOperations = document.querySelectorAll("[data-math-operasi]");

timerSets.forEach((m) => {
  m.addEventListener("click", (e) => {
    let clickTarget = e.target;
    pecobaan(clickTarget);
  });
});
mathOperations.forEach((m) => {
  m.addEventListener("click", (e) => {
    let clickTarget = e.target;
    pecobaan2(clickTarget);
  });
});
dataCostomWaktu.forEach((m) => {
  m.addEventListener("click", (e) => {
    let clickTarget = e.target;
    clickColor(clickTarget);
  });
});
function pecobaan(clickTarget) {
  timerSets.forEach((m) => {
    if (m.classList.contains("ganti-warna")) {
      m.classList.remove("ganti-warna");
    }
  });
  clickTarget.classList.add("ganti-warna");
}
function pecobaan2(clickTarget) {
  mathOperations.forEach((m) => {
    if (m.classList.contains("ganti-warna")) {
      m.classList.remove("ganti-warna");
    }
  });
  clickTarget.classList.add("ganti-warna");
}
function clickColor(clickTarget) {
  dataCostomWaktu.forEach((m) => {
    if (m.classList.contains("ganti-warna")) {
      m.classList.remove("ganti-warna");
    }
  });
  clickTarget.classList.add("ganti-warna");
}

// AKHIR