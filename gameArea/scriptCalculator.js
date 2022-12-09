const cells = document.querySelectorAll(".cell");
const inputNumber = document.querySelector(".input-num");
const result = document.querySelector(".result");
const numAtas = document.querySelector(".num-atas");

// inputNumber.value.innerHTML = '2'

cells.forEach((cell) => {
  cell.addEventListener("click", (tombol) => {
    let target = tombol.target.dataset.num;
    jalankan(target);
    clear(target);
  });
});

function jalankan(target) {
  let number = inputNumber.value;
  if (number == "0") {
    inputNumber.value = target;
  } else if (target === "=") {
    numberAtas();
    inputNumber.value = eval(inputNumber.value);
  } else if (target === "%") {
    inputNumber.value /= 100;
  } else if (target === "C") {
    inputNumber.value = inputNumber.value.substring(
      0,
      Number(inputNumber.value.length) - 1
    );
  } else {
    inputNumber.value += target;
  }
}
function clear(target) {
  if (target === "AC") {
    inputNumber.value = "0";
    numAtas.innerHTML = "";
  }
}
function numberAtas() {
  numAtas.innerHTML = inputNumber.value;
  numAtas.addEventListener("click", () => {
    inputNumber.value = numAtas.innerHTML;
    console.log(numAtas);
  });
}

const wrapper = document.querySelector(".container-calculator");
header = wrapper.querySelector("header");
function onDrag({ movementX, movementY }) {
  let getStyle = window.getComputedStyle(wrapper);
  let left = parseInt(getStyle.left);
  let top = parseInt(getStyle.top);
  wrapper.style.left = `${left + movementX}px`;
  wrapper.style.top = `${top + movementY}px`;
  console.log(left, top);
}
document.addEventListener("mousedown", () => {
  header.classList.add("active");
  header.addEventListener("mousemove", onDrag);
});
document.addEventListener("mouseup", () => {
  header.classList.remove("active");
  header.removeEventListener("mousemove", onDrag);
});
