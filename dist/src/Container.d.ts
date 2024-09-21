import { Entity } from './Entity';
import { System } from './System';
import { Component } from './Component';
import { Manager } from './Manager';
declare class Container {
    Handle: string;
    private entities;
    private systems;
    private components;
    private sleepInterval;
    private intervalFunc;
    private running;
    private isInit;
    private manager?;
    constructor(Handle?: string);
    HandleGet(): string;
    ManagerSet(manager: Manager): void;
    Start(interval?: number): void;
    Stop(): void;
    SystemsInit(): void;
    Update(): void;
    EntityCreate(Handle?: string): Entity;
    EntityDestroy(Handle: string): void;
    SystemAdd(system: System): System;
    ComponentAdd(component: Component): Component;
    ComponentsGet(types: string[]): Record<string, any>;
    Export(): Record<string, any>;
}
export { Container };
