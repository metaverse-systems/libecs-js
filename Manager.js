var Container = require('./Container')

function Manager() 
{
    var containers = [];

    var container_create = function(handle)
    {
        var c = new Container(handle);
        containers[c.handle] = c;

        c.interval = setInterval(function() { c.update() }, 50);
        return containers[c.handle];
    }

    this.container = function(handle)
    {
        if(handle !== undefined)
        {
            if(containers[handle] !== undefined) return containers[handle];
            return container_create(handle);
        }

        return container_create();
    }

    this.containers_get = function()
    {
        return containers;
    }
}

module.exports = Manager 
