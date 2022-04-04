class Drawer {
    constructor(){
        let c = document.getElementById("canvas");
        this.ctx = c.getContext("2d");
        this.width = 1000;
    }

    drawLineWithArrows(x0,y0,x1,y1,aWidth,aLength,arrowStart,arrowEnd){
        var dx=x1-x0;
        var dy=y1-y0;
        var angle=Math.atan2(dy,dx);
        var length=Math.sqrt(dx*dx+dy*dy);
        //
        this.ctx.translate(x0,y0);
        this.ctx.rotate(angle);
        this.ctx.beginPath();
        this.ctx.moveTo(0,0);
        this.ctx.lineTo(length,0);
        if(arrowStart){
            this.ctx.moveTo(aLength,-aWidth);
            this.ctx.lineTo(0,0);
            this.ctx.lineTo(aLength,aWidth);
        }
        if(arrowEnd){
            this.ctx.moveTo(length-aLength,-aWidth);
            this.ctx.lineTo(length,0);
            this.ctx.lineTo(length-aLength,aWidth);
        }
        //
        this.ctx.stroke();
        this.ctx.setTransform(1,0,0,1,0,0);
    }

    drawNeuron(neuron, batch_size){
        let y = (Math.floor(neuron.id / batch_size) + 1) * batch_size;
        let x = (this.width / batch_size) * (neuron.id - (Math.floor(neuron.id / batch_size) * batch_size));
        let size = 2;

        this.ctx.beginPath();
        this.ctx.arc(x, y, size, 0, 2 * Math.PI);
        this.ctx.stroke();
    }

    drawLine(neuron, neuronoutput, batch_size){
        let neuron_position = {
            y:(Math.floor(neuron.id / batch_size) + 1) * batch_size,
            x: (this.width / batch_size) * (neuron.id - (Math.floor(neuron.id / batch_size) * batch_size))
        }

        let two_position = {
            y:(Math.floor(neuronoutput.id / batch_size) + 1) * batch_size,
            x: (this.width / batch_size) * (neuronoutput.id - (Math.floor(neuronoutput.id / batch_size) * batch_size))
        }

        this.drawLineWithArrows(neuron_position.x,neuron_position.y,
            two_position.x,two_position.y,5,8,false,true);
    }
}