const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const stageWidth = document.body.clientWidth;
const stageHeight = document.body.clientHeight;

const totalPoints = 6;

document.body.appendChild(canvas);

function point(index, xPoint, yPoint) {
  const order = index;
  const x = xPoint;
  const y = yPoint;
  const fixedY = yPoint;
  const speed = 0.1;
  const cur = index;
  const max = Math.random() * 100 + 150;
  return { order, x, y, fixedY, speed, cur, max };
}

let points = [];
const pointGap = document.body.clientWidth / (totalPoints - 1);

for (let i = 0; i < totalPoints; i++) {
  const newPoint = point(i, pointGap * i, stageHeight / 2);
  points[i] = newPoint;
}

function draw() {
  let prevX = points[0].x;
  let prevY = points[0].y;
  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  points.forEach((point) => {
    if (point.order !== 0 && point.order !== totalPoints - 1) {
      point.cur += point.speed;
      point.y = point.fixedY + Math.sin(point.cur) * point.max;
    }
    ctx.fillStyle = "#ff000";
    const cx = (prevX + point.x) / 2;
    const cy = (prevY + point.y) / 2;
    ctx.quadraticCurveTo(prevX, prevY, cx, cy);
    prevX = point.x;
    prevY = point.y;
  });
  ctx.lineTo(prevX, prevY);
  ctx.lineTo(stageWidth, stageHeight);
  ctx.lineTo(points[0].x, stageHeight);
  ctx.fill();
}

function resize() {
  const resizeStageWidth = document.body.clientWidth;
  const resizrStageHeight = document.body.clientHeight;
  canvas.width = resizeStageWidth * 2;
  canvas.height = resizrStageHeight * 2;
  ctx.scale(2, 2);
}

function animate() {
  ctx.clearRect(0, 0, stageWidth, stageHeight);
  draw();
  requestAnimationFrame(animate.bind());
}

window.addEventListener("resize", resize);
requestAnimationFrame(animate.bind());

resize();
