var Entity = require('./Entity.js')

const uuidv4 = require('uuid/v4');

function Container()
{
    var self = this;

    this.Handle = uuidv4();
    this.Entities = [];
    this.Systems = [];
    this.Components = [];

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
            self.Entities[e.HandleGet()] = e;
        }
        else
        {
            if(self.Entities[handle] === undefined)
            {
                e = new Entity(handle);
                self.Entities[e.HandleGet()] = e;
            }
            else e = self.Entities[handle];
        }

        e.ContainerSet(self);
        return e;
    }

    this.Component = function(c)
    {
        if(this.Components[c.Type] === undefined)
        {
            console.log("Adding type: " + c.Type);
            this.Components[c.Type] = [];
        }
        this.Components[c.Type].push(c);
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
        console.log("Container.Export()");
        var config = {};
        config.Handle = this.Handle;
        config.Entities = [];
        config.Systems = [];

        var Entities = this.Entities;
        Object.keys(Entities).forEach(function(e) {
            config.Entities[e] = Entities[e].Export();
        });

        this.Systems.forEach(function(s) {
            config.Systems[s.HandleGet()] = s.Export();
        });
        return config;
    }
}

module.exports = Container
