function System()
{
    this.Handle = null;

    this.HandleGet = function()
    {
        return this.Handle;
    }

    this.ContainerSet = function(container)
    {
        this.Container = container;
    }
}

module.exports = System
