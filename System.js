function System()
{
    this.Handle = null;
    this.RequestedComponents = [];
    this.LastTime = Date().getTime();

    this.HandleGet = function()
    {
        return this.Handle;
    }

    this.ContainerSet = function(container)
    {
        this.Container = container;
    }

    this.ComponentRequest = function(component)
    {
        if(this.RequestedComponents.includes(component)) return;
        this.RequestedComponents.push(component);
    }

    this.ComponentsGet = function()
    {
        return this.Container.ComponentsGet(this.RequestedComponents);
    }

    this.DeltaTimeGet = function()
    {
        var now = Date().getTime();
        var dt = now - this.LastTime;
        this.LastTime = now;
        return dt;
    }
}

module.exports = System
