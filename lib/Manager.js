"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager = void 0;
var Container_1 = require("./Container");
var Manager = /** @class */ (function () {
    function Manager() {
        this.Containers = [];
        this.Running = true;
    }
    Manager.prototype.ContainerCreate = function (handle) {
        var c = new Container_1.default(handle);
        this.Containers[c.Handle] = c;
        return this.Containers[c.Handle];
    };
    Manager.prototype.Container = function (handle) {
        if (handle !== null) {
            if (this.Containers[handle] !== undefined)
                return this.Containers[handle];
            return this.ContainerCreate(handle);
        }
        return this.ContainerCreate(null);
    };
    Manager.prototype.ContainersGet = function () {
        return this.Containers;
    };
    Manager.prototype.ContainersKill = function (containers) {
        containers.forEach(function (c) {
            clearInterval(c.interval);
        });
    };
    Manager.prototype.IsRunning = function () {
        return this.Running;
    };
    Manager.prototype.Shutdown = function () {
        this.Running = false;
        this.ContainersKill(this.ContainersGet());
    };
    return Manager;
}());
exports.Manager = Manager;
