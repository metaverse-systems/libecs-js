import { Container } from './Container';
declare class Manager {
    Containers: Array<Container>;
    Running: boolean;
    constructor();
    ContainerCreate(handle?: string | null): any;
    Container(handle?: string | null): any;
    ContainersGet(): Container[];
    ContainersKill(containers: any): void;
    IsRunning(): boolean;
    Shutdown(): void;
}
export { Manager };
