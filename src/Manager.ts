import { Container } from './Container';

class Manager
{
    Containers: Array<Container>;
    Running: boolean;
    constructor()
    {
        this.Containers = [];
        this.Running = true;
    }

    ContainerCreate(handle: string|null = null)
    {
        const c = new Container(handle);
        this.Containers[c.Handle] = c;
        return this.Containers[c.Handle];
    }

    Container(handle: string|null = null)
    {
        if(handle !== null)
        {
            if(this.Containers[handle] !== undefined) return this.Containers[handle];
            return this.ContainerCreate(handle);
        }

        return this.ContainerCreate(null);
    }

    ContainersGet()
    {
        return this.Containers;
    }

    ContainersKill(containers)
    {
        containers.forEach((c) => clearInterval(c.interval));
    }

    IsRunning()
    {
        return this.Running;
    }

    Shutdown()
    {
        this.Running = false;
        this.ContainersKill(this.ContainersGet());
    }
}

export { Manager };
