const uuidv4 = require('uuid/v4');

function Entity()
{
    this.Handle = uuidv4();
    this.Components = [];

    this.HandleGet = function()
    {
        return this.Handle;
    }

    this.ContainerSet = function(container)
    {
        this.Container = container;
    }

    this.Component = function(c)
    {
        c.EntityHandle = this.Handle;
        if(!this.Components.includes(c.Type)) this.Components[c.Type] = [];
        if(!this.Components[c.Type].includes(this.Handle)) 
            this.Components[c.Type][this.Handle] = [];
        this.Components[c.Type][this.Handle].push(c);
        return this.Container.Component(c);
    }

    this.Export = function()
    {
        var config = { Handle: this.Handle, Components: [] };
        var Components = this.Components;
        Object.keys(Components).forEach(function(type) {
            if(!config.Components.includes(type))
                config.Components[type] = [];
            Object.keys(Components[type]).forEach(function(entity) {
                Components[type][entity].forEach(function(c) {
                    config.Components[type].push(Object.entries(c.Export()));
                });
            });
        });

        console.log(config);
        return config;
    }
}

module.exports = Entity
