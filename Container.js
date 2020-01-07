var Entity = require('./Entity.js')

const uuidv4 = require('uuid/v4');

class Container
{
    constructor(handle)
    {
        if(handle === undefined) this.Handle = uuidv4();
        else this.Handle = handle;

        this.Entities = [];
        this.Systems = [];
        this.Components = [];

        this.SleepInterval = 1000 / 30;
        this.IntervalFun = null;
        this.Running = true;
    }

    Start(interval)
    {
        if(interval !== undefined) this.SleepInterval = interval;

        var c = this;
        this.SystemsInit();
        this.IntervalFunc = setInterval(function() { c.Update(); }, this.SleepInterval);
    }

    SystemsInit()
    {
        this.Systems.forEach(function(sys) {
            sys.Init();
        });
    }

    Init()
    {
    }

    Update()
    {
        var Systems = this.Systems;
        Object.keys(Systems).forEach(function(sys) {
            Systems[sys].Update();
        });

        if(this.Running === false) clearInterval(this.IntervalFunc);
    }

    ManagerSet(manager)
    {
        this.Manager = manager;
    }

    HandleGet()
    {
        return this.Handle;
    }

    Entity(handle)
    {
        return this.EntityCreate(handle);
    }

    System(sys)
    {
        sys.ContainerSet(this);
        this.Systems[sys.HandleGet()] = sys;
        return sys;
    }

    EntityCreate(handle)
    {
        var e;
        if(handle === undefined)
        {
            e = new Entity();
            this.Entities[e.HandleGet()] = e;
        }
        else
        {
            if(this.Entities[handle] === undefined)
            {
                e = new Entity(handle);
                this.Entities[e.HandleGet()] = e;
            }
            else e = this.Entities[handle];
        }

        e.ContainerSet(this);
        return e;
    }

    Component(c)
    {
        if(this.Components[c.Type] === undefined)
        {
            this.Components[c.Type] = [];
        }

        if(this.Components[c.Type][c.EntityHandle] === undefined)
        {
            this.Components[c.Type][c.EntityHandle] = [];
        }

        this.Components[c.Type][c.EntityHandle].push(c);
        return c;
    }

    ComponentsGet(types)
    {
        var results = [];
        var Components = this.Components;
        types.forEach(function(type) {
            results[type] = Components[type];
        });
        return Components;
    }

    Export()
    {
        var config = {};
        config.Handle = this.Handle;
        config.Entities = {};
        config.Systems = {};

        var Entities = this.Entities;
        Object.keys(Entities).forEach(function(e) {
            config.Entities[e] = Entities[e].Export();
        });

        var Systems = this.Systems;
        Object.keys(Systems).forEach(function(s) {
            config.Systems[s] = Systems[s].Export();
        });
        return config;
    }
}

module.exports = Container
