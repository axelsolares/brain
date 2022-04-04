
class Brain {
    constructor(inputs = 0, outputs = 0, neurons = 0, configuration = []){
        this.size = {
            inputs,
            outputs,
            neurons
        };

        this.neurons = [];

        this.configuration = configuration;

        if(this.configuration.length === 0){
            return;
        }

        this.loadConfiguration(this.configuration);
    }

    async randomNeurons(){
        let generator = new BrainGenerator(this.size.inputs, this.size.outputs, this.size.neurons);
        this.neurons = await generator.getRandonConfiguration();
    }

    loadConfiguration(configuration){
        console.time('loadConfiguration');
    
        for(let config of configuration){
            console.log(config);
            let neuron = this.neurons.find(row => row.id === config.id);

            if(!neuron){
                neuron = new Neuron([], [], config.type, config.id);

                this.neurons.push(neuron);
            }

            for(let outdata of config.outputs){
                console.log(outdata);
                let output = this.neurons.find(row => row.id === outdata.id);

                if(!output){
                    output = new Neuron([], [], outdata.type, outdata.id);

                    this.neurons.push(output);
                }

                neuron.addOutput(output, outdata.weight);
            }
        }

        console.timeEnd('loadConfiguration');
    }

    showBrain(){
        console.log(this.neurons);
    }
}