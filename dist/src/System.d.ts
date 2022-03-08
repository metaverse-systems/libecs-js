/** Base class for ECS System */
declare class System {
    Handle: string;
    LastTime: number;
    Container: any;
    config: any;
    constructor(config: any);
    HandleGet(): string;
    ContainerSet(container: any): void;
    DeltaTimeGet(): number;
    Init(): void;
    Export(): this & {
        Handle: string;
    };
}
export { System };
