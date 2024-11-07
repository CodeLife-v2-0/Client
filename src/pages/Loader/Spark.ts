function gaussianRandom(mean = 0, stdev = 1) {
  const u = 1 - Math.random();
  const v = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return z * stdev + mean;
}

class Spinner {
  holst: HTMLCanvasElement;
  amountSpark: number;
  sparks: Spark[];
  centerX: number;
  centerY: number;
  initialRadius: number;
  maxRadius: number;
  angleStep: number;
  radiusStep: number;
  sparkSpeed: number;
  ctx: CanvasRenderingContext2D;
  stopFlag: boolean;
  constructor(canvas: HTMLCanvasElement) {
    this.holst = canvas;
    this.ctx = this.holst.getContext("2d")!;
    this.amountSpark = 500;
    this.sparks = [];
    this.centerX = this.holst.width / 2;
    this.centerY = this.holst.height / 2;
    this.initialRadius = this.holst.width * 0.1;
    this.maxRadius = Math.min(this.holst.height, this.holst.width) * 0.15;
    this.angleStep = 0.5;
    this.radiusStep = 0.15;
    this.sparkSpeed = 0.05;
    this.stopFlag = false;
    for (let i = 0; i < this.amountSpark; i++) {
      const angle = i * this.angleStep;
      const spark = new Spark(angle, 0, this.sparkSpeed, 1, this.maxRadius, this.initialRadius ,  this.centerX ,  this.centerY);
      this.sparks.push(spark);
    }
  }

  animate = () => {
    this.ctx.clearRect(0, 0, this.holst.width, this.holst.height);
    
    this.sparks.forEach((spark) => {
      spark.update(this.maxRadius, this.radiusStep);
    });

    this.sparks.forEach((spark) => spark.draw(this.ctx));
    if (!this.stopFlag)
    requestAnimationFrame(this.animate);
  }

  clear() {
    this.sparks = [];
    this.stopFlag = true;
  }

}

class Spark {
  x: number;
  y: number;
  xline1: number;
  yline1: number;
  xline2: number;
  yline2: number;
  xline3: number;
  yline3: number;
  angle: number;
  radius: number;
  speed: number;
  color: string;
  size: number;
  side: boolean;
  multiline1: number;
  maxRadius: number;
  initialRadius: number;
  centerX: number;
  centerY: number;

  constructor(angle: number, radius: number, speed: number, size: number, maxRadius: number, initialRadius: number , centerX: number , centerY: number) {
    this.angle = angle;
    this.radius = radius;
    this.speed = speed;
    this.size = size;
    this.color = "rgb(255, 255, 255)"; 
    this.x = 0;
    this.y = 0;
    this.side = false;
    this.xline1 = 0;
    this.yline1 = 0;
    this.xline2 = 0;
    this.yline2 = 0;
    this.xline3 = 0;
    this.yline3 = 0;
    this.maxRadius = maxRadius;
    this.multiline1 = Math.random();
    this.updatePosition();
    this.updateProperties(this.maxRadius);
    this.initialRadius = initialRadius;
    this.centerX = centerX;
    this.centerY = centerY;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const grad1 = ctx.createLinearGradient(this.xline1, this.yline1, this.xline2, this.yline2);
    grad1.addColorStop(0, "blue");
    grad1.addColorStop(0.25, "white");
    grad1.addColorStop(0.3, "#009afd");
    grad1.addColorStop(0.9, "white");
    grad1.addColorStop(1, "blue");
    ctx.strokeStyle = grad1;
    ctx.beginPath();
    ctx.lineWidth = 0.1;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.xline1, this.yline1);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.lineWidth = 0.1;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.xline2, this.yline2);
    ctx.stroke();
    ctx.closePath();
  }

  update(maxRadius: number, radiusStep: number) {
    if (this.side == false)
      if (this.radius < maxRadius) {
        this.radius += radiusStep;
      }
    this.angle += this.speed;
    this.updatePosition();
    this.updateProperties(maxRadius);
  }
  updatePosition() {
    const deviationX = (Math.random() - 0.5) * this.radius * 0.02; // Отклонение по X
    const deviationY = (Math.random() - 0.5) * this.radius * 0.02; // Отклонение по Y
    const spiralRadius = this.initialRadius + this.radius;
    const multiline2 = 0.2 * (Math.random());
    this.multiline1 = gaussianRandom(0.5, 0.2);
    this.x = this.centerX + Math.cos(this.angle) * spiralRadius + deviationX;
    this.y = this.centerY + Math.sin(this.angle) * spiralRadius + deviationY;
    this.xline1 = this.x + spiralRadius * this.multiline1 * Math.cos(-Math.PI / 1.9 + this.angle);
    this.yline1 = this.y + spiralRadius * this.multiline1 * Math.sin(-Math.PI / 1.9 + this.angle);
    this.xline2 = this.x + spiralRadius * multiline2 * Math.cos(Math.PI * 1.37 + this.angle);
    this.yline2 = this.y + spiralRadius * multiline2 * Math.sin(Math.PI * 1.37 + this.angle);
  }

  updateProperties(maxRadius: number) {
    const ratio = this.radius / maxRadius;
    const red = 255 - Math.floor(ratio * 220);
    const green = 255 - Math.floor(ratio * 80);
    const blue = 255 - Math.floor(ratio * 20);
    this.color = `rgb(${red}, ${green}, ${blue})`;

    this.size = Math.floor(1 + ratio * 0.5);
  }

}


export default  Spinner;