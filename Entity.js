const uuidv4 = require('uuid/v4');

class Entity
{
    constructor()
    {
        this.Handle = uuidv4();
        this.Components = [];
    }

    HandleGet()
    {
        return this.Handle;
    }

    ContainerSet(container)
    {
        this.Container = container;
    }

    Component(c)
    {
        c.EntityHandle = this.Handle;
        if(this.Components[c.Type] === undefined) this.Components[c.Type] = [];
        if(this.Components[c.Type][this.Handle] === undefined) 
            this.Components[c.Type][this.Handle] = [];
        this.Components[c.Type][this.Handle].push(c);
        return this.Container.Component(c);
    }

    Export()
    {
        var config = { Handle: this.Handle, Components: {} };

        var Components = this.Components;
        Object.keys(Components).forEach(function(type) {
            if(config.Components[type] === undefined)
                config.Components[type] = [];
            Object.keys(Components[type]).forEach(function(entity) {
                Components[type][entity].forEach(function(c) {
                    config.Components[type].push(c.Export());
                });
            });
        });

        return config;
    }
}

module.exports = Entity
