class EventRegister {

    events = [];

    register(name, callback) {
        this.events.push({ name: name, run: callback});
    }

    execute(name, ...args) {
        this.events.filter(event => event.name === name).forEach(event => event.run(args))
    }

}

const eventRegister = new EventRegister();

const useEventRegister = () => eventRegister

export {
    useEventRegister
}