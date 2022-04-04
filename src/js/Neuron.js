

class Neuron {
    type = {
        ACTIVATOR: 1,
        INTERMEDIATE: 2,
        OUTPUT: 3
    }

    constructor(inputs = [], outputs = [], type = 1, id){
        this.inputs = inputs;
        this.outputs = outputs;
        this.id = id;
        this.signal = 0.000000000;
        this.sumWeights = 0
        this.type = type;
    }

    sendSignal(signal){
        this.signal += signal;

        if(this.shouldPropagate() >= 1){
            let signalOld = this.signal;
            this.signal = 0;

            for(let output of this.outputs){
                output.neuron.sendSignal(signalOld * (this.sumWeights / output.weight));
            }
        }
    }

    addInput(input){
        if(this.type === type.ACTIVATOR){
            throw new Error("Un input no puede tener neuronas input: "+this.id);
        }
        
        this.inputs.push(input);
    }

    addOutput(output, weight){
        if(this.type === type.OUTPUT){
            throw new Error("Un output no puede tener neuronas output: "+this.id);
        }

        this.sumWeights += weight;
        this.outputs.push({ weight: weight, neuron: output});
        output.addInput(this);
    }

    shouldPropagate(){
        let response = 1 / (1 + Math.exp(-this.signal));
        console.log(" calculo ", response);
        return response;
    }

    getSignal(){
        return this.signal;
    }
}