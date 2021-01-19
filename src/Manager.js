var Container = require('./Container')

class Manager
{
    constructor()
    {
        this.Containers = [];
        this.Running = true;
    }

    ContainerCreate(handle)
    {
        var c = new Container(handle);
        this.Containers[c.Handle] = c;
        return this.Containers[c.Handle];
    }

    Container(handle)
    {
        if(handle !== undefined)
        {
            if(containers[handle] !== undefined) return containers[handle];
            return this.ContainerCreate(handle);
        }

        return this.ContainerCreate();
    }

    ContainersGet()
    {
        return Containers;
    }

    ContainersKill(containers)
    {
        containers.forEach(function(c) {
            clearInterval(c.interval);
        });
    }

    IsRunning()
    {
        return Running;
    }

    Shutdown()
    {
        Running = false;
        this.ContainersKill(this.ContainersGet());
    }
}

module.exports = Manager 
