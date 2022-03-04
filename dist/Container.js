"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const Entity_1 = __importDefault(require("./Entity"));
class Container {
    constructor(handle) {
        this.Handle = handle;
        if (this.Handle === undefined) {
            this.Handle = (0, uuid_1.v4)();
        }
        this.Entities = {};
        this.Systems = {};
        this.Components = {};
        this.SleepInterval = 1000 / 30;
        this.IntervalFunc = null;
        this.Running = false;
        this.isInit = false;
    }
    Start(interval) {
        if (interval !== undefined) {
            this.SleepInterval = interval;
        }
        this.SystemsInit();
        this.IntervalFunc = setInterval(() => this.Update(), this.SleepInterval);
        this.Running = true;
    }
    Stop() {
        this.Running = false;
    }
    SystemsInit() {
        Object.keys(this.Systems).forEach((sys) => {
            if (!this.isInit)
                this.Systems[sys].Init();
            this.Systems[sys].LastTime = (new Date()).getTime();
        });
        this.isInit = true;
    }
    Update() {
        Object.keys(this.Systems).forEach((sys) => {
            this.Systems[sys].Update();
        });
        if (this.Running === false) {
            clearInterval(this.IntervalFunc);
        }
    }
    ManagerSet(manager) {
        this.Manager = manager;
    }
    HandleGet() {
        return this.Handle;
    }
    Entity(handle) {
        return this.EntityCreate(handle);
    }
    System(sys) {
        sys.ContainerSet(this);
        this.Systems[sys.HandleGet()] = sys;
        return sys;
    }
    EntityCreate(handle) {
        var e;
        if (handle === undefined) {
            e = new Entity_1.default();
            this.Entities[e.HandleGet()] = e;
        }
        else {
            if (this.Entities[handle] === undefined) {
                e = new Entity_1.default(handle);
                this.Entities[e.HandleGet()] = e;
            }
            else
                e = this.Entities[handle];
        }
        e.ContainerSet(this);
        return e;
    }
    EntityDestroy(handle) {
        Object.keys(this.Components).forEach((type) => {
            delete this.Components[type][handle];
        });
    }
    Component(c) {
        if (this.Components[c.Type] === undefined) {
            this.Components[c.Type] = {};
        }
        this.Components[c.Type][c.EntityHandle] = c;
        return c;
    }
    ComponentsGet(types) {
        var results = {};
        types.forEach((type) => {
            results[type] = this.Components[type];
            if (results[type] === undefined) {
                results[type] = {};
            }
        });
        return results;
    }
    Export() {
        const config = {
            Handle: this.Handle,
            Entities: [],
            Systems: []
        };
        Object.keys(this.Entities).forEach((e) => {
            config.Entities.push(this.Entities[e].Export());
        });
        Object.keys(this.Systems).forEach((s) => {
            config.Systems.push(this.Systems[s].Export());
        });
        return config;
    }
}
exports.default = Container;
//# sourceMappingURL=Container.js.map