'use-strict'
$(function() {
    var gcw = $('.game-container').width();
    var gch = $('.game-container').height();
    var ps = new particleSystem(gcw, gch, "background", 300);

    var gaw = $('.game-area').width();
    var gah = $('.game-area').height();
    var game = new gameSystem(gaw, gah, "game-canvas");
    var fps = (1000 / 60);
    game.setCanvas();
    game.makeCells();
    setInterval(function() {
        game.drawCell();
    }, fps);

    ps.makeParticles();
    setInterval(function() {
        ps.drawParticles()
    }, fps);
});

var particleSystem = class Canvas {
    constructor(width, height, id, max) {
        this.height = height;
        this.width = width;
        this.id = id;
        this.particles = [];
        this.angle = 0;
        this.max = max
    }
    makeParticles() {
        let mp = this.max; //max particles
        for (var i = 0; i < mp; i++) {
            this.particles.push({
                x: Math.random() * this.width, //x-coordinate
                y: Math.random() * this.height, //y-coordinate
                r: Math.random() * 2 + 1, //radius
                d: Math.random() * mp //density
            })
        }
    }
    drawParticles() {
        let layer = document.getElementById(this.id);
        let ctx = layer.getContext('2d');
        let max = this.max;

        layer.width = this.width;
        layer.height = this.height;
        ctx.clearRect(0, 0, this.width, this.height);
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.beginPath();

        for (var i = 0; i < max; i++) {
            var p = this.particles[i];
            ctx.moveTo(p.x, p.y);
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
        };
        ctx.fill();
        this.update(max);
    }
    update() {
        let W = this.width;
        let H = this.height;
        let max = this.max;
        this.angle += 0.01;
        for (var i = 0; i < this.particles.length; i++) {
            var p = this.particles[i];

            p.y += Math.cos(this.angle + p.d) + 1 + p.r / 2;
            p.x += Math.sin(this.angle) * 2;

            if (p.x > W + 5 || p.x < -5 || p.y > H) {
                if (i % 3 > 0) {
                    this.particles[i] = {
                        x: Math.random() * W,
                        y: -10,
                        r: p.r,
                        d: p.d
                    };
                } else {
                    if (Math.sin(this.angle) > 0) {
                        this.particles[i] = {
                            x: -5,
                            y: Math.random() * H,
                            r: p.r,
                            d: p.d
                        };
                    } else {
                        this.particles[i] = {
                            x: W + 5,
                            y: Math.random() * H,
                            r: p.r,
                            d: p.d
                        };
                    }
                }
            }
        }
    }
}
var angle = 0;
var gameSystem = class GameSystem {
    constructor(width, height, id) {
        this.canvas = {
            width,
            height,
            id,
        }
        this.cells = [];
        console.log('Game System Created.');
        console.log(this);
    }
    setCanvas() {
        let canvas = document.getElementById(this.canvas.id);
        let ctx = canvas.getContext('2d');

        canvas.width = this.canvas.width;
        canvas.height = this.canvas.height;
    }

    makeCells() {
        let mp = 3; //max cells
        let x_range = {
          max: this.canvas.width,
          min: 75
        };
        let s_range = {
          max: 100,
          min: 30
        };
        let height25 = (this.canvas.height) * 0.25;
        let last = 0;
        let arr = [1,2,3,4,5,6,7,8,9,10],
            d;
        for (var i = 0; i < mp; i++) {

            d = arr[Math.floor(arr.length * Math.random())];
            let y;
            if (i == 0) {
                y = height25 / 2
            } else {
                y = height25 + last
            }

            let x = Math.random() * (x_range.max - x_range.min) + x_range.min
            let s = Math.random() * (s_range.max - s_range.min) + s_range.min
            let r = (this.canvas.width * 0.15)
            this.cells.push({
                x,
                y,
                r,
                d: d >= 5 ? -1 : 1,
                s
            });
            if (i == 0) {
                last += height25
            } else {
                last += height25 + 50
            }


        }
    }

    drawCell() {
        let canvas = document.getElementById(this.canvas.id);
        let ctx = canvas.getContext('2d');
        let W = canvas.width;
        let H = canvas.height;
        let radius = 100;

        ctx.clearRect(0, 0, W, H);

        ctx.lineWidth = 5;
        ctx.strokeStyle = 'white';
        ctx.fillStyle = '#8c1717';

        var cells = this.cells
        var TO_RADIANS = Math.PI / 180;
        for (var i = 0; i < cells.length; i++) {
            var cell = cells[i];

            ctx.beginPath();
            ctx.save();
            ctx.translate(cell.x, cell.y);
            ctx.rotate((cell.d * (angle + cell.s)) * TO_RADIANS);
            ctx.arc(0, 0, cell.r, 0, 2 * Math.PI, true);
            ctx.fill();
            ctx.setLineDash([25]);
            ctx.stroke();
            ctx.restore();

        }
        angle += 1;
    }
}
