"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Entity_1 = require("./Entity");
var uuidv4 = require('uuid/v4');
var Container = /** @class */ (function () {
    function Container(handle) {
        this.Handle = handle;
        if (this.Handle === undefined) {
            this.Handle = uuidv4();
        }
        this.Entities = {};
        this.Systems = {};
        this.Components = {};
        this.SleepInterval = 1000 / 30;
        this.IntervalFunc = null;
        this.Running = false;
        this.isInit = false;
    }
    Container.prototype.Start = function (interval) {
        var _this = this;
        if (interval !== undefined) {
            this.SleepInterval = interval;
        }
        this.SystemsInit();
        this.IntervalFunc = setInterval(function () { return _this.Update(); }, this.SleepInterval);
        this.Running = true;
    };
    Container.prototype.SystemsInit = function () {
        var _this = this;
        if (this.isInit)
            return;
        Object.keys(this.Systems).forEach(function (sys) {
            _this.Systems[sys].Init();
        });
        this.isInit = true;
    };
    Container.prototype.Update = function () {
        var _this = this;
        Object.keys(this.Systems).forEach(function (sys) {
            _this.Systems[sys].Update();
        });
        if (this.Running === false) {
            clearInterval(this.IntervalFunc);
        }
    };
    Container.prototype.ManagerSet = function (manager) {
        this.Manager = manager;
    };
    Container.prototype.HandleGet = function () {
        return this.Handle;
    };
    Container.prototype.Entity = function (handle) {
        return this.EntityCreate(handle);
    };
    Container.prototype.System = function (sys) {
        sys.ContainerSet(this);
        this.Systems[sys.HandleGet()] = sys;
        return sys;
    };
    Container.prototype.EntityCreate = function (handle) {
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
    };
    Container.prototype.EntityDestroy = function (handle) {
        var _this = this;
        Object.keys(this.Components).forEach(function (type) {
            delete _this.Components[type][handle];
        });
    };
    Container.prototype.Component = function (c) {
        if (this.Components[c.Type] === undefined) {
            this.Components[c.Type] = {};
        }
        this.Components[c.Type][c.EntityHandle] = c;
        return c;
    };
    Container.prototype.ComponentsGet = function (types) {
        var _this = this;
        var results = {};
        types.forEach(function (type) {
            results[type] = _this.Components[type];
            if (results[type] === undefined) {
                results[type] = {};
            }
        });
        return results;
    };
    Container.prototype.Export = function () {
        var _this = this;
        var config = {};
        config.Handle = this.Handle;
        config.Entities = [];
        config.Systems = [];
        Object.keys(this.Entities).forEach(function (e) {
            config.Entities.push(_this.Entities[e].Export());
        });
        Object.keys(this.Systems).forEach(function (s) {
            config.Systems.push(_this.Systems[s].Export());
        });
        return config;
    };
    return Container;
}());
exports.default = Container;
