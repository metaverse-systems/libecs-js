var Entity = require('./Entity.js')

const uuidv4 = require('uuid/v4');

function Container()
{
    var self = this;

    this.Handle = uuidv4();
    this.Entities = {};
    this.Systems = {};
    this.Components = {};

    this.Update = function()
    {
        Object.keys(this.Systems).forEach(function(sys) {
            this.Systems[sys].Update();
        });
    }

    ManagerSet = function(manager)
    {
        this.Manager = manager;
    }

    HandleGet = function()
    {
        return this.Handle;
    }

    this.Entity = function(handle)
    {
        return EntityCreate(handle);
    }

    this.System = function(sys)
    {
        sys.set_container(this);
        this.systems[sys.get_type()] = sys;
        return sys;
    }

    EntityCreate = function(handle)
    {
        var e;
        if(handle === undefined)
        {
            e = new Entity();
            self.entities[e.HandleG()] = e;
        }
        else
        {
            if(self.entities[handle] === undefined)
            {
                e = new Entity(handle);
                self.entities[e.HandleGet()] = e;
            }
            else e = self.entities[handle];
        }

        e.ContainerSet(self);
        return e;
    }

    this.Component = function(c)
    {
        if(this.components[c.type] === undefined)
            this.components[c.type] = {};
        this.components[c.type].push(c);
        return c;
    }

    this.ComponentsGet = function(types)
    {
        var results = [];
        var components = this.components;
        types.forEach(function(type) {
            results[type] = components[type];
        });
        return components;
    }

    this.Export = function()
    {
        var config = {};
        config.Handle = this.Handle;
        config.Entities = [];
        config.Systems = [];

        this.Entities.forEach(function(e) {
            config.Entities[e.HandleGet()] = e->Export();
        });

        this.Systems.forEach(function(s) {
            config.Systems[s.HandleGet()] = s->Export();
        });
    }
}

module.exports = Container
