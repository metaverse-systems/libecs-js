"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuidv4 = require('uuid/v4');
/** ECS Entity */
var Entity = /** @class */ (function () {
    function Entity(handle) {
        this.Handle = (handle === undefined) ? uuidv4() : handle;
        this.Components = {};
    }
    Entity.prototype.HandleGet = function () {
        return this.Handle;
    };
    Entity.prototype.ContainerSet = function (container) {
        this.Container = container;
    };
    Entity.prototype.Component = function (c) {
        c.EntityHandle = this.Handle;
        if (this.Components[c.Type] === undefined) {
            this.Components[c.Type] = {};
        }
        this.Components[c.Type][this.Handle] = c;
        return this.Container.Component(c);
    };
    Entity.prototype.Export = function () {
        var _this = this;
        var config = {
            Handle: this.Handle,
            Components: {}
        };
        Object.keys(this.Components).forEach(function (type) {
            Object.keys(_this.Components[type]).forEach(function (entity) {
                config.Components[type] = _this.Components[type][entity].Export();
            });
        });
        return config;
    };
    Entity.prototype.destroy = function () {
        this.Container.EntityDestroy(this.Handle);
    };
    return Entity;
}());
exports.default = Entity;
