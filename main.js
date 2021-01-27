const canvas = document.getElementById('tutorial');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d');




function randomColor() {
    let hexValue = '123456789ABCDEF';
    let color = '#';
    for(let i = 0; i < 6; i++) {
        color += hexValue[Math.floor(Math.random() * hexValue.length)]; 
    }
    return color;
}

let circleArray = [];
for(let i = 0; i < 100; i++) {
    
    let radius = Math.round(Math.random() * 50) + 5;
    let x = Math.round(Math.random() * (innerWidth - (radius * 2)) + radius);
    let y = Math.round(Math.random() * (innerHeight- (radius * 2)) + radius);
    let speedX = Math.round(Math.random() * 8);
    let speedY =  Math.round(Math.random() * 8);
    circleArray.push(new Circle(x, y, speedX, speedY, radius))
    
}
console.log(circleArray);
ctx.fillStyle = randomColor();
function Circle(x, y, speedX, speedY, radius) {
    console.log('passed')
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.radius = radius;

    

    //Creates a circle and color it
    this.draw = () => {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
       
    }

    //allows the circle to bounce on window border and update it
    this.update = () => {
        if(this.x + this.radius> innerWidth || this.x - this.radius < 0) {
            //changes direction 
            this.speedX = -this.speedX;
            // changes color
            ctx.fill();
            
        }
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.speedY = -this.speedY;
            ctx.fill();
        }

        //increases speed
        this.x += this.speedX;
        this.y += this.speedY;

        this.draw();
    }
}

animate();
function animate() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    requestAnimationFrame(animate);

    for(let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }

   
}
