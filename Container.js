var Entity = require('./Entity.js')

const uuidv4 = require('uuid/v4');

function Container()
{
    var self = this;

    this.Handle = uuidv4();
    this.Entities = {};
    this.Systems = {};
    this.Components = {};
    this.last_update = Date.now();

    this.Update = function()
    {
        var now = Date.now();
        var dt = now - this.last_update;
        this.last_update = now;

        Object.keys(this.Systems).forEach(function(sys) {
            this.Systems[sys].Update(dt);
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

    this.system = function(sys)
    {
        sys.set_container(this);
        this.systems[sys.get_type()] = sys;
    }

    EntityCreate = function(handle)
    {
        var e;
        if(handle === undefined)
        {
            e = new Entity();
            self.entities[e.get_handle()] = e;
        }
        else
        {
            if(self.entities[handle] === undefined)
            {
                e = new Entity(handle);
                self.entities[e.get_handle()] = e;
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
}

module.exports = Container
