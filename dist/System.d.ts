/** Base class for ECS System */
declare class System {
    Handle: string;
    RequestedComponents: Array<string>;
    LastTime: number;
    Container: any;
    config: any;
    constructor(config: any);
    HandleGet(): string;
    ContainerSet(container: any): void;
    ComponentRequest(component: any): void;
    ComponentsGet(): any;
    DeltaTimeGet(): number;
    Init(): void;
    Export(): {
        Handle: string;
    };
}
export { System };
