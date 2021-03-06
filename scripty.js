// Canvas start point
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];
const numofPart = 100;
//get mouse position
const mouse = {
    x:null,
    y:null
}
window.addEventListener('mousemove', function(event){
     mouse.x = event.x;
    mouse.y = event.y;
});

setInterval(function(){
   mouse.x = undefined;
    mouse.y = undefined;
});

// Create patricles
class Particle {
    constructor(x,y,size,color,width){
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.width = width;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size, 0 ,Math.PI *2,false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update(){
        this.size -= 0.05;
        if(this.size < 0){
            this.x = (mouse.x + ((Math.random() * 20) - 10));
            this.y = (mouse.y + ((Math.random() * 20) - 10));
            this.size = (Math.random() *10) *2;
            this.weight = (Math.random() *2)
        }
        this.y += this.weight;
        this.weight += 0.2;
        
        if(this.y > canvas.height - this.size){
            this.weight *= -1;
        };
    }
}

function init(){
    particleArray = [];
    for(let i = 0; i < numofPart; i++ ){
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let size = (Math.random() * 5 ) * 2;
        let color = 'black';
        let weight = 1;
        particleArray.push(new Particle(x, y, size, color, weight));
    }
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
      for(let i = 0; i < particleArray.length; i++ ){
           particleArray[i].update();
           particleArray[i].draw();
      }
    requestAnimationFrame(animate);
}
init();
animate();
