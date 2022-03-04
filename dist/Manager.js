"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager = void 0;
const Container_1 = __importDefault(require("./Container"));
class Manager {
    constructor() {
        this.Containers = [];
        this.Running = true;
    }
    ContainerCreate(handle) {
        var c = new Container_1.default(handle);
        this.Containers[c.Handle] = c;
        return this.Containers[c.Handle];
    }
    Container(handle) {
        if (handle !== null) {
            if (this.Containers[handle] !== undefined)
                return this.Containers[handle];
            return this.ContainerCreate(handle);
        }
        return this.ContainerCreate(null);
    }
    ContainersGet() {
        return this.Containers;
    }
    ContainersKill(containers) {
        containers.forEach(function (c) {
            clearInterval(c.interval);
        });
    }
    IsRunning() {
        return this.Running;
    }
    Shutdown() {
        this.Running = false;
        this.ContainersKill(this.ContainersGet());
    }
}
exports.Manager = Manager;
//# sourceMappingURL=Manager.js.map