const uuidv4 = require('uuid/v4');

function System()
{
    this.id = uuidv4();

    this.get_type = function()
    {
        return this.type;
    }

    this.set_container = function(container)
    {
        this.container = container;
    }

    this.set_type = function(type)
    {
        this.type = type;
    }
}

module.exports = System
