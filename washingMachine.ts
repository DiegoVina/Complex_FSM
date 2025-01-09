type WashingMachineState = "IDLE" |"FILLING" | "WASHING" | "RINSING" | "SPINNING" | "DONE";
type WashingMachineEvent = "START" | "WATER_FULL" | "WASH_DONE" | "RINSE_DONE" | "SPIN_DONE" | "RESET";


const transitions: Record<WashingMachineState, Partial<Record<WashingMachineEvent, WashingMachineState>>> = {
    IDLE: {START: "FILLING"},
    FILLING: {WATER_FULL: "WASHING"},
    WASHING: {WASH_DONE: "RINSING"},
    RINSING: {RINSE_DONE: "SPINNING"},
    SPINNING: {SPIN_DONE: "DONE"},
    DONE: {RESET: "IDLE"},
}

const autoTransitions: Partial<Record<WashingMachineState, {event: WashingMachineEvent; delay: number} >> ={
    FILLING: {event: "WATER_FULL", delay: 3000},
    WASHING: {event: "WASH_DONE", delay: 5000},
    RINSING: {event: "RINSE_DONE", delay: 3000},
    SPINNING: {event: "SPIN_DONE", delay: 4000},
}

class WashingMachine{
    private state: WashingMachineState;

    constructor(){
        this.state = "IDLE";
        console.log(`Machine currently: ${this.state}`);
    }

    changeState(event: WashingMachineEvent): void{
        const newState = transitions[this.state]?.[event];

        if(!newState){
            console.log(`Invalid transition to ${this.state} via ${event}`);
            return;
        }

        this.state = newState;
        console.log(`Current state: ${this.state}`);

        this.handleAutomaticTransitions();
    }

    private handleAutomaticTransitions(): void{
        const transition = autoTransitions[this.state];

        if(transition){
            console.log(`${transition.event} in the next ${transition.delay / 1000}s`);
            setTimeout(() => this.changeState(transition.event), transition.delay);
        }
    }

    getState(): WashingMachineState{
        return this.state;
    }
}

// A little simulation

const washer = new WashingMachine();

washer.changeState("START");