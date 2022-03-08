/** ECS Entity */
declare class Entity {
    Handle: string;
    Components: object;
    Container: any;
    constructor(handle?: string);
    HandleGet(): string;
    ContainerSet(container: any): void;
    Component(c: any): any;
    Export(): {
        Handle: string;
        Components: {};
    };
    destroy(): void;
}
export { Entity };
