
class BrainGenerator{
    type = {
        ACTIVATOR: 1,
        INTERMEDIATE: 2,
        OUTPUT: 3
    }

    constructor(inputs, outputs, neurons){
        this.inputs_size = inputs;
        this.outputs_size = outputs;
        this.neurons_size = neurons;
        this.neurons = [];
        this.neurons_batchs = 200;
        this.drawer = new Drawer();
    }

    async getRandonConfiguration(){
        let promises = [];
        for(let i = 0; i < this.inputs_size; i++){
            let id = Math.floor(Math.random() * this.neurons_batchs) + 1;
            promises.push(this.createRandomNeuron(id, this.type.ACTIVATOR));
        }

        await Promise.all(promises);
        console.log("Se crearon "+ this.neurons.length + " neuronas");
        return this.neurons;
    }

    async createRandomNeuron(id, type) {
        return new Promise((resolve, reject) => {
            console.log("Creando neurona ", id, this);
            let neuron = this.neurons.find(row => row.id === id);

            if (neuron) {
                if (neuron.type == this.type.ACTIVATOR) {
                    resolve(null);
                    return;
                }

                resolve(neuron);
                return;
            }

            neuron = new Neuron([], [], type, id);
            this.neurons.push(neuron);

            this.drawer.drawNeuron(neuron, this.neurons_batchs);

            if ((id / this.neurons_batchs) >= this.neurons_size) {
                neuron.type = this.type.OUTPUT;
                resolve(neuron);
                return;
            }

            let size_outputs = Math.floor(Math.random() * 5);
            let outputIds = [];
            let starting = (Math.floor(id / this.neurons_batchs) + 1) * this.neurons_batchs;

            for (let i = 0; i < size_outputs; i++) {
                let idToCreate = 0;
                do {
                    idToCreate = this.randomIntFromInterval(starting, starting + (
                        this.neurons_batchs - 1
                    ));
                } while (id === idToCreate || outputIds.includes(idToCreate));

                this.createRandomNeuron(idToCreate, this.type.INTERMEDIATE).then(newoutput => {
                    if (newoutput) {
                        outputIds.push(idToCreate);
                        neuron.addOutput(newoutput, Math.random());
    
                        this.drawer.drawLine(neuron, newoutput, this.neurons_batchs);
                    }
                });
            }

            resolve(neuron);
            return;
        });
    }

    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}