const ctx = document.querySelector(".canvas").getContext("2d");

let x = 0;
let direction = 1;
let h = 0;
let squashSize = 0;
let isSquashing = false;
let timeFalling = 0;
let squashingCount = 0;

window.addEventListener("load", loadHandler);

function loadHandler() {
  const timerId = setInterval(() => {
    if (!isSquashing) {
      timeFalling = timeFalling + direction * 0.01;
      h = 500 * timeFalling * timeFalling;
      ctx.clearRect(0, 0, 1000, 800);
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.shadowBlur = 0;
      ctx.fillStyle = "darkviolet";
      ctx.fillRect(100 + x, 20 + h, 50, 50);
      // x += 1; Розкоментувати, щоб рухався в сторону

      if (h > 400) {
        isSquashing = true;
      }
    } else if (squashingCount < 10 || squashingCount < 20) {
      if (squashingCount < 10) {
        squashSize += 3;
      } else {
        squashSize -= 3;
      }
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.shadowBlur = 0;
      ctx.clearRect(0, 0, 1000, 800);
      ctx.fillStyle = "darkviolet";
      ctx.fillRect(
        100 + x - squashSize / 2,
        20 + h + squashSize / 2,
        50 + squashSize,
        50 - squashSize
      );
      squashingCount += 1;
    } else {
      direction *= -1;
      isSquashing = false;
      squashingCount = 0;
    }

    ctx.fillStyle = "white";
    ctx.shadowOffsetY = 3;
    ctx.shadowBlur = 3;
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(130 + x - h / 10, 480, h / 6, 1);

    if (x > 700) {
      clearInterval(timerId);
    }
  }, 10);
}
