"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = void 0;
/** Base class for ECS component */
class Component {
    constructor(config) {
        this.EntityHandle = null;
        Object.keys(config).forEach((name) => {
            this[name] = config[name];
        });
    }
    Export() {
        var config = {};
        Object.keys(this).forEach((name) => {
            if (name == "EntityHandle")
                return;
            if (name == "Type")
                return;
            config[name] = this[name];
        });
        return config;
    }
}
exports.Component = Component;
//# sourceMappingURL=Component.js.map