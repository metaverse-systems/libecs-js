"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.System = void 0;
class System {
    constructor(config = {}) {
        this.handle = config.handle || `system-${Date.now()}`;
        this.lastTime = Date.now();
        this.config = config;
    }
    HandleGet() {
        return this.handle;
    }
    ContainerSet(container) {
        this.container = container;
    }
    /** Get the delta time since the last update and reset the lastTime */
    DeltaTimeGet() {
        const now = Date.now();
        const deltaTime = now - this.lastTime;
        this.lastTime = now;
        return deltaTime;
    }
    /** Initialize the system (can be overridden by subclasses) */
    Init() {
        // Optional initialization logic
    }
    /** Update the system (must be implemented by subclasses) */
    Update() {
        throw new Error('System.Update() must be implemented by derived systems');
    }
    /** Export the system's current configuration */
    Export() {
        return Object.assign({ handle: this.handle }, this.config);
    }
}
exports.System = System;
//# sourceMappingURL=System.js.map