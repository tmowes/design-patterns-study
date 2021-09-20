"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Publisher {
    constructor() {
        this.observers = [];
    }
    register(observer) {
        this.observers.push(observer);
    }
    publish(command) {
        this.observers.forEach(observer => {
            if (observer.operation === command.operation) {
                observer.notify(command);
            }
        });
        // for (const observer of this.observers) {
        //   if (observer.operation === command.operation) {
        //     observer.notify(command)
        //   }
        // }
    }
}
exports.default = Publisher;
