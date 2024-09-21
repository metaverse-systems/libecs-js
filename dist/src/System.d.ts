import { Container } from './Container';
declare type SystemConfig = {
    handle?: string;
    [key: string]: any;
};
declare class System {
    private handle;
    protected lastTime: number;
    protected container?: Container;
    protected config: SystemConfig;
    constructor(config?: SystemConfig);
    HandleGet(): string;
    ContainerSet(container: Container): void;
    /** Get the delta time since the last update and reset the lastTime */
    DeltaTimeGet(): number;
    /** Initialize the system (can be overridden by subclasses) */
    Init(): void;
    /** Update the system (must be implemented by subclasses) */
    Update(): void;
    /** Export the system's current configuration */
    Export(): Record<string, any>;
}
export { System, SystemConfig };
