import { v4 as uuidv4 } from 'uuid';
import { Entity } from './Entity';
import { System } from './System';
import { Component } from './Component';
import { Manager } from './Manager';

class Container {
  public Handle: string;
  private entities: Map<string, Entity>;
  private systems: Map<string, System>;
  private components: Map<string, Map<string, Component>>;
  private sleepInterval: number;
  private intervalFunc: NodeJS.Timeout | null;
  private running: boolean;
  private isInit: boolean;
  private manager?: Manager;

  constructor(Handle: string = uuidv4()) {
    this.Handle = Handle;
    this.entities = new Map();
    this.systems = new Map();
    this.components = new Map();
    this.sleepInterval = 1000 / 30;
    this.intervalFunc = null;
    this.running = false;
    this.isInit = false;
  }

  public HandleGet(): string {
    return this.Handle;
  }

  public ManagerSet(manager: Manager): void {
    this.manager = manager;
  }

  public Start(interval: number = this.sleepInterval): void {
    this.sleepInterval = interval;
    this.SystemsInit();
    this.intervalFunc = setInterval(() => this.Update(), this.sleepInterval);
    this.running = true;
  }

  public Stop(): void {
    this.running = false;
    if (this.intervalFunc) clearInterval(this.intervalFunc);
  }

  public SystemsInit(): void {
    this.systems.forEach((system) => {
      if (!this.isInit) system.Init();
    });
    this.isInit = true;
  }

  public Update(): void {
    this.systems.forEach((system) => system.Update());

    if (!this.running && this.intervalFunc) {
      clearInterval(this.intervalFunc);
    }
  }

  public EntityCreate(Handle?: string): Entity {
    const entityHandle = Handle || uuidv4();
    let entity = this.entities.get(entityHandle);
    if (!entity) {
      entity = new Entity(entityHandle);
      this.entities.set(entityHandle, entity);
    }
    entity.ContainerSet(this);
    return entity;
  }

  public EntityDestroy(Handle: string): void {
    this.components.forEach((componentMap) => {
      componentMap.delete(Handle);
    });
    this.entities.delete(Handle);
  }

  public SystemAdd(system: System): System {
    system.ContainerSet(this);
    this.systems.set(system.HandleGet(), system);
    return system;
  }

  public ComponentAdd(component: Component): Component {
    if (!this.components.has(component.Type)) {
      this.components.set(component.Type, new Map());
    }
    this.components.get(component.Type)?.set(component.EntityHandle, component);
    return component;
  }

  public ComponentsGet(types: string[]): Record<string, any> {
    const results: Record<string, any> = {};
    types.forEach((type) => {
      results[type] = this.components.get(type) || {};
    });
    return results;
  }

  public Export(): Record<string, any> {
    const config = {
      Handle: this.Handle,
      Entities: Array.from(this.entities.values()).map((entity) => entity.Export()),
      Systems: Array.from(this.systems.values()).map((system) => system.Export())
    };
    return config;
  }
}

export { Container };