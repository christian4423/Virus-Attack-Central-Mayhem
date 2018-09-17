export default class GameSystem {
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
        for (let i = 0; i < mp; i++) {

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
    drawPoint(angle,distance,label){
        let cell = this.cells[2];
        let canvas = document.getElementById(this.canvas.id);
        let ctx = canvas.getContext('2d');
        var TO_RADIANS = Math.PI / 180;
        var x = cell.x + cell.r * Math.cos((cell.d * angle)*TO_RADIANS) * distance;
        var y = cell.y + cell.r * Math.sin((cell.d * angle)*TO_RADIANS) * distance;
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'white';
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI, true);
        ctx.fill();        
        ctx.font = font_size;    
        ctx.fillText(label,x + 20,y);
    }
    
    drawCell() {
        let canvas = document.getElementById(this.canvas.id);
        let ctx = canvas.getContext('2d');
        let W = canvas.width;
        let H = canvas.height;
        let radius = 100;

        ctx.clearRect(0, 0, W, H);
        var cells = this.cells
        var TO_RADIANS = Math.PI / 180;
        for (var i = 0; i < cells.length; i++) {
            var cell = cells[i];            
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'white';
            ctx.fillStyle = '#8c1717';
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
        
        if(angle > 360){
            angle = 0;
        }else{
            angle += 1;
        }
    }
}