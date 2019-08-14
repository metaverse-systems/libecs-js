var Container = require('./Container')

function Manager() 
{
    var Containers = [];

    var ContainerCreate = function(handle)
    {
        var c = new Container(handle);
        Containers[c.Handle] = c;

        c.interval = setInterval(function() { c.Update() }, 50);
        return Containers[c.Handle];
    }

    this.Container = function(handle)
    {
        if(handle !== undefined)
        {
            if(containers[handle] !== undefined) return containers[handle];
            return ContainerCreate(handle);
        }

        return ContainerCreate();
    }

    this.ContainersGet = function()
    {
        return Containers;
    }
}

module.exports = Manager 
