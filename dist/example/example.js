"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
/** Copied from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value#examples */
const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
};
const ECS = new __1.Manager();
class PositionComponent extends __1.Component {
    constructor(config) {
        super(config);
        this.Type = "PositionComponent";
    }
}
class VelocityComponent extends __1.Component {
    constructor(config) {
        super(config);
        this.Type = "VelocityComponent";
    }
}
class PhysicsSystem extends __1.System {
    constructor(config) {
        if (config === undefined) {
            config = {};
        }
        super(config);
        this.Handle = "PhysicsSystem";
        this.frame_time = config["frame_time"] === undefined ? 20 : config["frame_time"];
    }
    Update() {
        const dt = this.DeltaTimeGet();
        const multiplier = dt / 1000;
        console.log("Last run " + dt + "ms ago.");
        const Components = this.Container.ComponentsGet(["PositionComponent", "VelocityComponent"]);
        Object.keys(Components["PositionComponent"]).forEach((entity) => {
            const pos = Components["PositionComponent"][entity];
            const vel = Components["VelocityComponent"][entity];
            // Adjust position data
            pos.x += vel.x * multiplier;
            pos.y += vel.y * multiplier;
            console.log(entity + " - Position - x: " + Number.parseFloat(pos.x).toFixed(2) + ", y: " + Number.parseFloat(pos.y).toFixed(2));
            console.log("   Velocity - x: " + vel.x + ", y: " + vel.y);
        });
    }
}
const world = ECS.Container();
world.System(new PhysicsSystem());
const e = world.Entity();
e.Component(new PositionComponent({ x: 10, y: 20 }));
e.Component(new VelocityComponent({ x: 1, y: 0 }));
const debug = world.Export();
console.log(JSON.stringify(debug, getCircularReplacer(), 2));
world.Start(500); // 500ms between loops
//# sourceMappingURL=example.js.map