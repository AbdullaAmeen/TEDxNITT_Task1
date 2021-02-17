var canvas = document.querySelector('canvas');

var mouse = {
	x: undefined,
	y: undefined
}

var mouseclick = {
	x: undefined,
	y: undefined
}
window.addEventListener('mousemove',function(event){
	mouse.x = event.x;
	mouse.y = event.y;
});

var c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height= window.innerHeight;
var w=innerWidth;
var h=innerHeight;


window.addEventListener('resize', function (event) {
	canvas.width = window.innerWidth;
	canvas.height= window.innerHeight;
	w=innerWidth;
	h=innerHeight;

});


//
const radius = 30;
const outer = radius + 30;

var dx = 0;
var dy = 0;
var x = w/2 + w/5;
var y = h/2;
var clickyes = false;


function animate() {
	requestAnimationFrame(animate);
	c.fillStyle = 'rgba(0,0,0,0.05)'
	c.fillRect(0, 0, canvas.width, canvas.height)
	c.fillStyle = 'red';
	c.font = "30px Arial";
	c.fillText('Submitted By Abdulla Ameen 106120002 ', w/2 , h-50 , w );

	if(!clickyes){	
		c.textAlign = 'center'; 
		c.textBaseline = 'middle';
		c.fillStyle = 'red';
		c.font = "30px Arial";
		c.fillText('Will you select me for the TEDxNITT Tech team? ', w/2 - 20 , 20 , w );

		
		c.font = "20px Arial";
		c.fillText('YES', w/2 - w/5 , h/2 , radius * 2);

		
		c.fillStyle = 'red';
		c.beginPath();
		c.arc(w/2 - w/5, h/2,radius,0,Math.PI*2,false);
		c.stroke();

		c.beginPath();
		c.arc(x,y,radius,0,Math.PI*2,false);
		c.stroke();
		

		c.fillText('NO', x , y , radius * 2);
		
		xdis = x- mouse.x ;
		ydis = y- mouse.y;
		if (xdis <  outer && xdis > -outer  && ydis <  outer && ydis > -outer) {
			dx = xdis*0.2;
			dy = ydis*0.2;
		}
		else
		{
			dx = 0; 
			dy = 0;
		}
		


		if (x > w - radius || x < radius || y > innerHeight - radius || y < radius ) {
			x = w/2 + w/10;
		    y = h/2;
		}

		x += dx;
		y += dy;
	}
	else
	{
		c.font = "20px Arial";
		c.fillText('Hurray!! (Click for fireworks)  ', w/2 - 10 , 20 , w );
	}


  particles.forEach((particle, i) => {
    if (particle.opacity > 0) {
      particle.update()
    } else {
      particles.splice(i, 1)
    }
  })



}

const gravity = 0.03
const friction = 0.99

class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = {
      x: velocity.x,
      y: velocity.y
    }
    this.opacity = 1
  }

  draw() {
    c.save()
    c.globalAlpha = this.opacity
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
    c.restore()
  }

  update() {
    this.draw()
    this.velocity.x *= friction
    this.velocity.y *= friction
    this.velocity.y += gravity
    this.x += this.velocity.x
    this.y += this.velocity.y
    this.opacity -= 0.003
  }
}

addEventListener('click', (event) => {
  mouseclick.x = event.clientX
  mouseclick.y = event.clientY
  if(Math.sqrt(Math.pow((mouseclick.x-w/2+w/5),2) + Math.pow((mouseclick.y-h/2),2)) < radius || clickyes)
  	{
  		clickyes = true;
	  const particleCount = 400
	  const power = 8
	  let radians = (Math.PI * 2) / particleCount

	  for (let i = 0; i < particleCount; i++) {
	    particles.push(
	      new Particle(
	        mouseclick.x,
	        mouseclick.y,
	        3,
	        `hsl(${Math.random() * 360}, 50%, 50%)`,
	        {
	          x: Math.cos(radians * i) * (Math.random() * power),
	          y: Math.sin(radians * i) * (Math.random() * power)
	        }
	      )
	    )
	  }
	}
})

let particles
particles = []

// Animation Loop
animate();

// c.fillRect(10,100,100,100);
