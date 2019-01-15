const uuidv4 = require('uuid/v4');

function Entity(handle)
{
    if(handle === undefined) handle = uuidv4();
    this.handle = handle;
    this.components = {};

    this.get_handle = function()
    {
        return this.handle;
    }

    this.set_container = function(container)
    {
        this.container = container;
    }

    this.component = function(c)
    {
        c.entity_handle = this.handle;
        if(this.components[c.type] == undefined)
            this.components[c.type] = {};
        this.components[c.type][c.handle] = c;
        this.container.component(c);
    }
}

module.exports = Entity
