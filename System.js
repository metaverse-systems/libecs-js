class System
{
    constructor(config)
    {
        this.Handle = null;
        this.RequestedComponents = [];
        this.LastTime = (new Date()).getTime();
    }

    HandleGet()
    {
        return this.Handle;
    }

    ContainerSet(container)
    {
        this.Container = container;
    }

    ComponentRequest(component)
    {
        if(this.RequestedComponents.includes(component)) return;
        this.RequestedComponents.push(component);
    }

    ComponentsGet()
    {
        return this.Container.ComponentsGet(this.RequestedComponents);
    }

    DeltaTimeGet()
    {
        var now = (new Date()).getTime();
        var dt = now - this.LastTime;
        this.LastTime = now;
        return dt;
    }

    Export()
    {
        var config = { Handle: this.Handle };
        return config;
    }
}

module.exports = System
