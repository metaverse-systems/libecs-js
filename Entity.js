const uuidv4 = require('uuid/v4');

function Entity()
{
    this.Handle = uuidv4();
    this.Components = {};

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
        this.Components[c.Type] = c;
        this.Container.Component(c);
    }
}

module.exports = Entity
