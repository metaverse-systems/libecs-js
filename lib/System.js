"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.System = void 0;
/** Base class for ECS System */
var System = /** @class */ (function () {
    function System(config) {
        this.Handle = null;
        this.RequestedComponents = [];
        this.LastTime = (new Date()).getTime();
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
        Object.keys(this).forEach(function (name) {
            if (name == "Handle")
                return;
            if (name == "Container")
                return;
            if (name == "RequestedComponents")
                return;
            if (name == "LastTime")
                return;
            config[name] = _this[name];
        });
        return config;
    };
    return System;
}());
exports.System = System;
