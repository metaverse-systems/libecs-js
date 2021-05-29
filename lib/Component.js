"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = void 0;
/** Base class for ECS component */
var Component = /** @class */ (function () {
    function Component(config) {
        var _this = this;
        this.EntityHandle = null;
        Object.keys(config).forEach(function (name) {
            _this[name] = config[name];
        });
    }
    Component.prototype.Export = function () {
        var _this = this;
        var config = {};
        Object.keys(this).forEach(function (name) {
            if (name == "EntityHandle")
                return;
            if (name == "Type")
                return;
            config[name] = _this[name];
        });
        return config;
    };
    return Component;
}());
exports.Component = Component;
