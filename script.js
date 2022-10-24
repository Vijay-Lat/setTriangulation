let canvas;
let angle = 0;
let angleToReference = 0;
function main() {
  canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  window.addEventListener("deviceorientation", orientationChangeHandler);
}

function orientationChangeHandler(e) {
  angle = e?.alpha;
  const radius = Math.min(canvas.width, canvas.height) * 0.45;
  const offset = -Math.PI / 2;
  const fixedAngle = ((angle - angleToReference) * Math.PI) / 180 + offset;
  const distToReference = document.getElementById("slider").value;
  document.getElementById("label").innerHTML =
    "Distance :" + distToReference + "m";
  let distanceToTarget = Math.abs(
    Math.tan(fixedAngle - offset) * distToReference
  );
  const movingTip = {
    x: (canvas?.width / 2) * Math.cos(fixedAngle) * radius,
    y: (canvas?.width / 2) * Math.sin(fixedAngle) * radius,
  };
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.fillStyle = "blue";
  if (movingTip.y > canvas.height / 2) {
    ctx.fillStyle = "red";
    distanceToTarget = 0;
  }
  if (movingTip.x > canvas.width / 2) {
    ctx.arc(canvas.width / 2, canvas.height / 2, radius, offset, fixedAngle);
  } else {
    ctx.arc(
      canvas.width / 2,
      canvas.height / 2,
      radius,
      offset,
      fixedAngle,
      true
    );
  }
  ctx.lineTo(canvas.width / 2, canvas.height / 2);
  ctx.fill();
  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.moveTo(canvas.width / 2, canvas.height / 2);
  ctx.lineTo(canvas.width / 2, canvas.height / 2 - radius);
  ctx.stroke();
  // drawing a blue line
  ctx.beginPath();
  ctx.strokeStyle = "blue";
  ctx.moveTo(canvas.width / 2, canvas.height / 2);
  // moving the line

  ctx.lineTo(movingTip.x, movingTip.y);
  ctx.stroke();
  ctx.beginPath();
  ctx.font = "55px Arial";
  ctx.textAlign = "center";
  ctx.fillText(
    distanceToTarget.toFixed(1) + "meters",
    canvas.width / 2,
    canvas.height * 0.7
  );
}
function reset() {
  angleToReference = angle;
}
