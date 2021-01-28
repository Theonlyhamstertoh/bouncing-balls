const canvas = document.getElementById('tutorial');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d');



let colorArray = [ 
    '#7FB069',
    '#FFFBBD',
    '#E6AA68',
    '#CA3C25',
    '#1D1A05'];



let mouse = {
    x: undefined,
    y: undefined
}

let maxRadius = 60;
let minRadius = 2;
window.addEventListener('mousemove', function(e) {
    mouse.x = e.x;
    mouse.y = e.y;
    console.log(mouse.x, mouse.y);
})
let circleArray = [];
initialize();
function initialize() {
    circleArray = [];
    for(let i = 0; i < 600; i++) {   
        let radius = Math.round(Math.random() * 10) + 5;
        let x = Math.round(Math.random() * (innerWidth - (radius * 2)) + radius);
        let y = Math.round(Math.random() * (innerHeight- (radius * 2)) + radius);
        let speedX = Math.round(Math.random() * 3);
        let speedY =  Math.round(Math.random() * 3);
        circleArray.push(new Circle(x, y, speedX, speedY, radius))
        
    }
}

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    initialize();
})

function Circle(x, y, speedX, speedY, radius) {
    console.log('passed')
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.radius = radius;
    this.value = this.radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
 
    
    

    //Creates a circle and color it
    this.draw = () => {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
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

        //interactivity
        if (Math.abs(mouse.x - this.x) < 100 && Math.abs(mouse.y - this.y) < 100) {
            if(this.radius <= maxRadius){
                this.radius += 1;
        }
        } else if(this.radius > this.value) {
            this.radius -= minRadius;

        }

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
