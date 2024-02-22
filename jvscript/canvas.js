const canva = document.getElementById('canvas1');
const ctx = canva.getContext('2d');
canva.width = window.innerWidth;
canva.height = window.innerHeight;
const particlearray = [];  //pour stocker les ronds formés ou les boules
let hue = 0;
// console.log(ctx);

window.addEventListener('resize',function () {
    canva.width = window.innerWidth;
    canva.height = window.innerHeight;
});

const mouse = {
    x : undefined,
    y : undefined
}

canva.addEventListener('click',function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 100; i++) {
        particlearray.push(new Particle());
    }
    // drawcircle();
});

canva.addEventListener('mousemove',function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 7; i++) {
        particlearray.push(new Particle());
    }
    // drawcircle();
})

/*function drawcircle() {
    ctx.fillStyle = 'blue';
    // ctx.strokeStyle = 'red';
    ctx.beginPath();
    // ctx.lineWidth = 5;
    ctx.arc(mouse.x,mouse.y,30,0,Math.PI*2);
    ctx.fill();
    // ctx.stroke();
}*/

class Particle{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        // this.x = Math.random()*canva.width;
        // this.y = Math.random()*canva.height;
        this.size = Math.random()*15+1;
        this.speedX = Math.random()*3-1;
        this.speedY = Math.random()*3-1;
        this.color = 'hsl('+hue+',100%,50%)'; //manovanova an'ilay couleur ilay hue solon'ny rgba ilay hsl
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.1) {
            this.size -=0.2;
        }
    }

    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.fill();
    }
}

/*function init() {
    for (let i = 0; i < 100; i++) {
        particlearray.push(new Particle())
    }
}*/

// init();
// console.log(particlearray);

function handleparticle() {
    for (let i = 0; i < particlearray.length; i++) {
        particlearray[i].update();
        particlearray[i].draw();
        for (let j = i; j < particlearray.length; j++) {
            const dx = particlearray[i].x - particlearray[j].x;
            const dy = particlearray[i].y - particlearray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = particlearray[i].color;
                ctx.lineWidth =  0.2 /* particlearray[i].size/20*/;
                ctx.moveTo( particlearray[i].x , particlearray[i].y);
                ctx.lineTo( particlearray[j].x , particlearray[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
        if (particlearray[i].size <= 0.3) {
            particlearray.splice(i,1);
            // console.log(particlearray.length);
            i--;
        }
    }
}

function animate() {
    ctx.clearRect(0,0,canva.width,canva.height);
    // ctx.fillStyle = 'rgba(0,0,0,0.1)';           // miaraka foana 
    // ctx.fillRect(0,0,canva.width,canva.height);   //izy mtsam ireto ah
    // drawcircle();   //tsy hilaina rehefa mampiasa an'ilay constructor
    handleparticle();
    hue+=2;
    requestAnimationFrame(animate);
}

animate();