var Entity = require('./Entity.js')

const uuidv4 = require('uuid/v4');

function Container(handle)
{
    var self = this;

    if(handle === undefined) handle = uuidv4();
    this.handle = handle;
    this.entities = {};
    this.systems = {};
    this.components = {};
    this.last_update = Date.now();

    this.update = function()
    {
        var now = Date.now();
        var dt = now - this.last_update;
        this.last_update = now;

        var systems = this.systems;
        Object.keys(systems).forEach(function(sys) {
            systems[sys].update(dt);
        });
    }

    set_manager = function(manager)
    {
        this.manager = manager;
    }

    get_handle = function()
    {
        return this.handle;
    }

    this.entity = function(handle)
    {
        return entity_create(handle);
    }

    this.system = function(sys)
    {
        sys.set_container(this);
        this.systems[sys.get_type()] = sys;
    }

    entity_create = function(handle)
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

        e.set_container(self);
        return e;
    }

    this.component = function(c)
    {
        if(this.components[c.type] === undefined)
            this.components[c.type] = {};
        this.components[c.type][c.handle] = c;
        return c;
    }

    this.components_get = function(types)
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
