const canvas = document.getElementById("canvas");

const faceColor = document.getElementById("face-color");
const borderColor = document.getElementById("border-color");
const lineColor = document.getElementById("line-color");
const largeHandColor = document.getElementById("large-hand-color");
const secondHandColor = document.getElementById("second-hand-color");
const form = document.querySelector(".form-input");

function clock() {
  const now = new Date();
  const ctx = canvas.getContext("2d");

  //Setup canvas
  ctx.save(); //save the default state
  ctx.clearRect(0, 0, 500, 500);
  ctx.translate(250, 250); // put (0, 0) in the middle
  ctx.rotate(-Math.PI / 2); //rotate -90 degrees

  //set default styles
  ctx.strokeStyle = "black";
  ctx.fillStyle = "#f4f4f4";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";

  //draw clock face/border
  ctx.save();
  ctx.beginPath();
  ctx.lineWidth = 14;
  ctx.strokeStyle = borderColor.value;
  ctx.fillStyle = faceColor.value;
  ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.fill();
  ctx.restore();

  //draw hour lines
  ctx.save();
  ctx.strokeStyle = lineColor.value;
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.rotate(Math.PI / 6);
    ctx.moveTo(100, 0);
    ctx.lineTo(120, 0);
    ctx.stroke();
  }
  ctx.restore();

  //draw minute lines
  ctx.save();
  ctx.strokeStyle = lineColor.value;
  ctx.lineWidth = 4;
  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      ctx.beginPath();
      ctx.moveTo(117, 0);
      ctx.lineTo(120, 0);
      ctx.stroke();
    }
    ctx.rotate(Math.PI / 30);
  }
  ctx.restore();

  // Get the current time
  const hour = now.getHours() % 12;
  const min = now.getMinutes();
  const sec = now.getSeconds();
  const millisec = now.getMilliseconds();

  // console.log(`${hour}:${min}:${sec}`);

  // draw hour hand
  ctx.save();
  ctx.rotate(
    (Math.PI / 6) * hour +
      (Math.PI / 360) * min +
      (Math.PI / 21600) * sec +
      (Math.PI / 1296000) * millisec
  );
  ctx.beginPath();
  ctx.strokeStyle = largeHandColor.value;
  // ctx.lineWidth = 14;
  ctx.moveTo(0, 0);
  ctx.lineTo(40, 0);
  ctx.stroke();
  ctx.restore();

  // draw minute hand
  ctx.save();
  ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
  ctx.strokeStyle = largeHandColor.value;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(112, 0);
  ctx.stroke();
  ctx.restore();

  // draw second hand
  ctx.save();
  ctx.rotate((Math.PI / 30) * sec);
  ctx.strokeStyle = secondHandColor.value;
  ctx.fillStyle = secondHandColor.value;
  ctx.lineWidth = 1;
  ctx.moveTo(0, 0);
  ctx.lineTo(117, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 5, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.restore();

  ctx.restore(); //restore default state

  requestAnimationFrame(clock);
}

requestAnimationFrame(clock);

function saveImage() {
  const dataUrl = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = "clock.png";
  link.href = dataUrl;
  link.click();
}
document.getElementById("save-btn").addEventListener("click", saveImage);
