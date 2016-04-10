/**
 * Created by Margarita on 10.04.2016.
 */
var particles = [];

function Explosion_void(nbrX, nbrY, nbrInterval) {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    //createExplosion(nbrX, nbrY, "#B71616");
    intervMoweWorm = window.setInterval(function () {
        createExplosion(nbrX, nbrY, "#B71616");
        update(30);
        nbrInterval--;
        if (nbrInterval < 0) {
            clearInterval(intervMoweWorm);
            particles = [];
            GameOver_void();
        }
    }, 20);
}

function createExplosion(x, y, color) {
    var minSize = 5;
    var maxSize = 15;
    var count = 10;
    var minSpeed = 40.0;
    var maxSpeed = 150.0;
    var minScaleSpeed = 1.0;
    var maxScaleSpeed = 4.0;

    for (var angle = 0; angle < 360; angle += Math.round(360 / count)) {
        var particle = new Particle();

        particle.x = x;
        particle.y = y;

        particle.radius = randomFloat(minSize, maxSize);

        particle.color = color;

        particle.scaleSpeed = randomFloat(minScaleSpeed, maxScaleSpeed);

        var speed = randomFloat(minSpeed, maxSpeed);

        particle.velocityX = speed * Math.cos(angle * Math.PI / 180.0);
        particle.velocityY = speed * Math.sin(angle * Math.PI / 180.0);

        particles.push(particle);
    }
}

function randomFloat(min, max) {
    return min + Math.random() * (max - min);
}


function update(frameDelay) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    DrawWorm();
    CreateFruit(objFruit.tblPos);
    // update and draw particles
    for (var i = 0; i < particles.length; i++) {
        var particle = particles[i];

        particle.update(frameDelay);
        particle.draw(ctx);
    }
}


function Particle() {
    this.scale = 1.0;
    this.x = 0;
    this.y = 0;
    this.radius = 20;
    this.color = "#FFFFFF";
    this.velocityX = 0;
    this.velocityY = 0;
    this.scaleSpeed = 0.5;

    this.update = function (ms) {
        // shrinking
        this.scale -= this.scaleSpeed * ms / 1000.0;

        if (this.scale <= 0) {
            this.scale = 0;
        }
        // moving away from explosion center
        this.x += this.velocityX * ms / 1000.0;
        this.y += this.velocityY * ms / 1000.0;
    };

    this.draw = function (ctx) {
        // translating the 2D context to the particle coordinates
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.scale, this.scale);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.closePath();
        ctx.restore();

    }
}


function createBasicExplosion(x, y) {
    // creating 4 particles that scatter at 0, 90, 180 and 270 degrees
    for (var angle = 0; angle < 360; angle += 90) {
        var particle = new Particle();

        // particle will start at explosion center
        particle.x = x;
        particle.y = y;

        particle.color = "#FF0000";

        var speed = 50.0;

        // velocity is rotated by "angle"
        particle.velocityX = speed * Math.cos(angle * Math.PI / 180.0);
        particle.velocityY = speed * Math.sin(angle * Math.PI / 180.0);

        // adding the newly created particle to the "particles" array
        particles.push(particle);
    }
}
