"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const uuid_1 = require("uuid");
const Entity_1 = require("./Entity");
class Container {
    constructor(Handle = (0, uuid_1.v4)()) {
        this.Handle = Handle;
        this.entities = new Map();
        this.systems = new Map();
        this.components = new Map();
        this.sleepInterval = 1000 / 30;
        this.intervalFunc = null;
        this.running = false;
        this.isInit = false;
    }
    HandleGet() {
        return this.Handle;
    }
    ManagerSet(manager) {
        this.manager = manager;
    }
    Start(interval = this.sleepInterval) {
        this.sleepInterval = interval;
        this.SystemsInit();
        this.intervalFunc = setInterval(() => this.Update(), this.sleepInterval);
        this.running = true;
    }
    Stop() {
        this.running = false;
        if (this.intervalFunc)
            clearInterval(this.intervalFunc);
    }
    SystemsInit() {
        this.systems.forEach((system) => {
            if (!this.isInit)
                system.Init();
        });
        this.isInit = true;
    }
    Update() {
        this.systems.forEach((system) => system.Update());
        if (!this.running && this.intervalFunc) {
            clearInterval(this.intervalFunc);
        }
    }
    EntityCreate(Handle) {
        const entityHandle = Handle || (0, uuid_1.v4)();
        let entity = this.entities.get(entityHandle);
        if (!entity) {
            entity = new Entity_1.Entity(entityHandle);
            this.entities.set(entityHandle, entity);
        }
        entity.ContainerSet(this);
        return entity;
    }
    EntityDestroy(Handle) {
        this.components.forEach((componentMap) => {
            componentMap.delete(Handle);
        });
        this.entities.delete(Handle);
    }
    SystemAdd(system) {
        system.ContainerSet(this);
        this.systems.set(system.HandleGet(), system);
        return system;
    }
    ComponentAdd(component) {
        var _a;
        if (!this.components.has(component.Type)) {
            this.components.set(component.Type, new Map());
        }
        (_a = this.components.get(component.Type)) === null || _a === void 0 ? void 0 : _a.set(component.EntityHandle, component);
        return component;
    }
    ComponentsGet(types) {
        const results = {};
        types.forEach((type) => {
            results[type] = this.components.get(type) || {};
        });
        return results;
    }
    Export() {
        const config = {
            Handle: this.Handle,
            Entities: Array.from(this.entities.values()).map((entity) => entity.Export()),
            Systems: Array.from(this.systems.values()).map((system) => system.Export())
        };
        return config;
    }
}
exports.Container = Container;
//# sourceMappingURL=Container.js.map