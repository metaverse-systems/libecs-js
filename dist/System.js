"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.System = void 0;
/** Base class for ECS System */
class System {
    constructor(config) {
        this.Handle = null;
        this.RequestedComponents = [];
        this.LastTime = (new Date()).getTime();
        this.config = {};
        Object.keys(config).map((key) => {
            if (typeof config[key] == "function") {
                this[key] = config[key];
            }
            else {
                this.config[key] = config[key];
            }
        });
    }
    HandleGet() {
        return this.Handle;
    }
    ContainerSet(container) {
        this.Container = container;
    }
    ComponentRequest(component) {
        if (this.RequestedComponents.includes(component))
            return;
        this.RequestedComponents.push(component);
    }
    ComponentsGet() {
        return this.Container.ComponentsGet(this.RequestedComponents);
    }
    DeltaTimeGet() {
        var now = (new Date()).getTime();
        var dt = now - this.LastTime;
        this.LastTime = now;
        return dt;
    }
    Init() {
    }
    Export() {
        const config = Object.assign(Object.assign({}, this), { Handle: this.Handle });
        return config;
    }
}
exports.System = System;
//# sourceMappingURL=System.js.map