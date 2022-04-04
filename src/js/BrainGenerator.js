
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
        this.neurons_batchs = 100;
        this.drawer = new Drawer();
    }

    async getRandonConfiguration(){
        let prom = this.createRandomNeuron(1, this.type.ACTIVATOR, 1);

        await Promise.all([prom]);
        return this.neurons;
    }

    async createRandomNeuron(id, type) {
        return new Promise(async (resolve, reject) => {
            console.log("Creando neurona ", id, this);
            let neuron = this.neurons.find(row => row.id === id);

            if (neuron) {
                if (neuron.type == this.type.ACTIVATOR) {
                    resolve(null);
                }

                resolve(neuron);
            }

            neuron = new Neuron([], [], type, id);
            this.neurons.push(neuron);

            this.drawer.drawNeuron(neuron, this.neurons_batchs);

            if (this.neurons.length >= this.neurons_size) {
                neuron.type = this.type.OUTPUT;
                resolve(neuron);
            }

            let size_outputs = Math.floor(Math.random() * 10) + 1;
            let outputIds = [];
            let starting = (Math.floor(id / this.neurons_batchs) + 1) * this.neurons_batchs;

            for (let i = 0; i < size_outputs; i++) {
                let idToCreate = 0;
                do {
                    idToCreate = this.randomIntFromInterval(starting, starting + (
                        this.neurons_batchs - 1
                    ));
                } while (id === idToCreate || outputIds.includes(idToCreate));

                let newoutput = await this.createRandomNeuron(idToCreate, this.type.INTERMEDIATE);

                if (newoutput) {
                    outputIds.push(idToCreate);
                    neuron.addOutput(newoutput, Math.random());

                    this.drawer.drawLine(neuron, newoutput, this.neurons_batchs);
                }
            }

            if (neuron.outputs.length === 0) {
                neuron.type = this.type.OUTPUT;
            }

            resolve(neuron);
        });
    }

    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}