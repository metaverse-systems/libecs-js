"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const uuid_1 = require("uuid");
/** ECS Entity */
class Entity {
    constructor(handle) {
        this.Handle = (handle === undefined) ? uuid_1.v4() : handle;
        this.Components = {};
    }
    HandleGet() {
        return this.Handle;
    }
    ContainerSet(container) {
        this.Container = container;
    }
    Component(c) {
        c.EntityHandle = this.Handle;
        if (this.Components[c.Type] === undefined) {
            this.Components[c.Type] = {};
        }
        this.Components[c.Type][this.Handle] = c;
        return this.Container.Component(c);
    }
    Export() {
        const config = {
            Handle: this.Handle,
            Components: {}
        };
        Object.keys(this.Components).forEach((type) => {
            Object.keys(this.Components[type]).forEach((entity) => {
                config.Components[type] = this.Components[type][entity].Export();
            });
        });
        return config;
    }
    destroy() {
        this.Container.EntityDestroy(this.Handle);
    }
}
exports.Entity = Entity;
//# sourceMappingURL=Entity.js.map