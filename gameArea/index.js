const restartBotton = document.querySelector(".restart");
const score = document.querySelector(".skor");


/////////////////////////////////////////////////

const questions = document.querySelector(".questions");
const buttonAnswer = document.querySelector(".answer-button");
const buttonAnswers = document.querySelectorAll(".answer");
const buttonAns = document.querySelectorAll(".answer");
const wrong = document.querySelector(".wrong");
const buttonGo = document.querySelector(".start");
const timer = document.querySelector(".timer");
const popUp = document.querySelector(".pop-up");

let angka1 = Math.floor(Math.random() * 10);
let angka2 = Math.floor(Math.random() * 10);
let hitung = operasiHitung();
let skor = 1;

restartBotton.addEventListener("click", () => {
  startButtonGo()
  skor = 1;
  score.textContent = `Sekor : ${0}`;
});
function startButtonGo(){
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


// POP-UP Awal browser di buka dan menentukan gameplay nya
// AWAL
const controls = document.querySelector('.controls')
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
const stylePopup = document.querySelector('.style-popup')
bottomStart.addEventListener("click", () => {
  if (isMathOperation == undefined) {
    wrongSelection();
  } else if (isTimer == undefined) {
    wrongSelection();
  } else {
    timerFunction(isTimer);
    popUp.style.display = "none";
    stylePopup.style.display = "none";
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
  setTimeout(() => {
    isWrongSelection.style.opacity = "0";
  }, 5000);
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
const popupResultss = document.querySelector('.popup-result')
function timerFunction(isTimer) {
  let nowTimer = Number(isTimer);
  let runingTimer = setInterval(() => {
    let updateTimer = (nowTimer -= 1);
    timer.textContent = `${updateTimer} detik`;
    if (updateTimer < 0) {
      clearInterval(runingTimer);
      timer.textContent = "waktu habis";
      popupResultss.style.display = "grid";
      startButtonGo()
      popupResultss.innerHTML = popupResult();
    }
    restartBotton.addEventListener("click", () => {
      clearInterval(runingTimer);
      timer.textContent = "Dibatalkan";
    });
  }, 1000);
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
function customTimer() {
  popupCustomTimer.style.display = "grid";
}

dataCostomWaktu.forEach((button) => {
  button.addEventListener("click", (buttonTimerParameter) => {
    let tombol = buttonTimerParameter.target.dataset.costomwaktu;
    if (tombol === "menit") {
      isTimer = timerInput.value * 60;
    } else if (tombol === "detik") {
      isTimer = timerInput.value;
    }
    addTimerText.innerHTML = `Custom ${isTimer} detik`;
  });
});

fixedTimer.addEventListener("click", () => {
  popupCustomTimer.style.display = "none";
});
// AKHIR

// CLOSE POPUP
// AWAL

document.addEventListener("click", (buttonClose) => {
  if (buttonClose.target.classList == "closes") {
    buttonClose.target.parentElement.parentElement.style.display = "none";
    buttonClose.innerHTML = "";
  } 
});
// AKHIR

//// GEAR CLICK
// AWAL
const gear = document.querySelector(".gear");
const closeAwal = document.querySelector(".closeAwal");
gear.addEventListener("click", () => {
  popUp.style.display = "grid";
  closeAwal.style.display = "grid";
  closeAwal.addEventListener('click', (m) => {
      m.target.parentElement.parentElement.style.display = "none";
      console.log('yes');
  })
});
// AKHIR

// POPUP RESULT

function popupResult() {
  return `<div class="result-popup">
            <span>sekor 20</span>
            <span>waktu 1 menit</span>
            <span>jenis random</span>
            <button class="control">Main lagi</button>
            <img src="../img/close.png" alt="close" class="closes">
          </div>`;
}

// GANTI WARNA POP-UP KETIKA DI KLIK
// AWAL
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
function changeColor(clickTarget) {
  buttonAnswers.forEach((m) => {
    if (m.classList.contains("ganti-warna")) {
      m.classList.remove("ganti-warna");
    }
  });
  clickTarget.classList.add("ganti-warna");
}
// AKHIR





// const timerSets = document.querySelectorAll("[data-timer-set]");
// const mathOperations = document.querySelectorAll("[data-math-operasi]");
// const buttonAnswers = document.querySelectorAll(".answer");
// const dataCostomWaktu = document.querySelectorAll("[data-costomWaktu]");


// 25 let dan 30 const = 55

