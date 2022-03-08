import { Entity } from './Entity';
import { System } from './System';
declare class Container {
    Handle: string;
    Entities: object;
    Systems: object;
    Components: any;
    SleepInterval: number;
    IntervalFunc: any;
    Running: boolean;
    Manager: any;
    isInit: boolean;
    constructor(handle: any);
    Start(interval: any): void;
    Stop(): void;
    SystemsInit(): void;
    Update(): void;
    ManagerSet(manager: any): void;
    HandleGet(): string;
    Entity(handle?: string): any;
    System(sys: any): any;
    EntityCreate(handle?: string): any;
    EntityDestroy(handle: any): void;
    Component(c: any): any;
    ComponentsGet(types: any): {};
    Export(): {
        Handle: string;
        Entities: Array<Entity>;
        Systems: Array<System>;
    };
}
export { Container };
