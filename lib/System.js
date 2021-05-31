"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.System = void 0;
/** Base class for ECS System */
var System = /** @class */ (function () {
    function System(config) {
        var _this = this;
        this.Handle = null;
        this.RequestedComponents = [];
        this.LastTime = (new Date()).getTime();
        this.config = {};
        Object.keys(config).map(function (key) {
            if (typeof config[key] == "function") {
                _this[key] = config[key];
            }
            else {
                _this.config[key] = config[key];
            }
        });
    }
    System.prototype.HandleGet = function () {
        return this.Handle;
    };
    System.prototype.ContainerSet = function (container) {
        this.Container = container;
    };
    System.prototype.ComponentRequest = function (component) {
        if (this.RequestedComponents.includes(component))
            return;
        this.RequestedComponents.push(component);
    };
    System.prototype.ComponentsGet = function () {
        return this.Container.ComponentsGet(this.RequestedComponents);
    };
    System.prototype.DeltaTimeGet = function () {
        var now = (new Date()).getTime();
        var dt = now - this.LastTime;
        this.LastTime = now;
        return dt;
    };
    System.prototype.Init = function () {
    };
    System.prototype.Export = function () {
        var _this = this;
        var config = {
            Handle: this.Handle
        };
        Object.keys(this.config).forEach(function (name) {
            config[name] = _this.config[name];
        });
        return config;
    };
    return System;
}());
exports.System = System;
