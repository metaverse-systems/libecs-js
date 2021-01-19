import Entity from './Entity';
import System from './System';

const uuidv4 = require('uuid/v4');

class Container
{
  Handle: string;
  Entities: object;
  Systems: object;
  Components: object;
  SleepInterval: number;
  IntervalFunc: any;
  Running: boolean;
  Manager: any;
  constructor(handle) {
    this.Handle = handle;
    if(this.Handle === undefined) {
      this.Handle = uuidv4();
    }

    this.Entities = {};
    this.Systems = {};
    this.Components = {};

    this.SleepInterval = 1000 / 30;
    this.IntervalFunc = null;
    this.Running = false;
  }

  Start(interval) {
    if(interval !== undefined) {
      this.SleepInterval = interval;
    }

    var c = this;
    this.SystemsInit();
    this.IntervalFunc = setInterval(function() { c.Update(); }, this.SleepInterval);
    this.Running = true;
  }

  SystemsInit() {
    Object.keys(this.Systems).forEach((sys) => {
      this.Systems[sys].Init();
    });
  }

  Update() {
    Object.keys(this.Systems).forEach((sys) => {
        this.Systems[sys].Update();
    });

    if(this.Running === false) {
      clearInterval(this.IntervalFunc);
    }
  }

  ManagerSet(manager) {
    this.Manager = manager;
  }

  HandleGet() {
    return this.Handle;
  }

  Entity(handle) {
    return this.EntityCreate(handle);
  }

  System(sys) {
    sys.ContainerSet(this);
    this.Systems[sys.HandleGet()] = sys;
    return sys;
  }

  EntityCreate(handle?: string) {
    var e;
    if(handle === undefined)
    {
      e = new Entity();
      this.Entities[e.HandleGet()] = e;
    }
    else
    {
      if(this.Entities[handle] === undefined)
      {
        e = new Entity(handle);
        this.Entities[e.HandleGet()] = e;
      }
      else e = this.Entities[handle];
    } 

    e.ContainerSet(this);
    return e;
  }

  EntityDestroy(handle) {
    Object.keys(this.Components).forEach((type) => {
      delete this.Components[type][handle];
    });
  }

  Component(c)
  {
    if(this.Components[c.Type] === undefined)
    {
      this.Components[c.Type] = {};
    }

    this.Components[c.Type][c.EntityHandle] = c;
    return c;
  }

  ComponentsGet(types) {
    var results = {};
    types.forEach((type) => {
      results[type] = this.Components[type];
      if(results[type] === undefined) {
        results[type] = {};
      }
    });
    return results;
  }

  Export() {
    interface Iconfig {
      Handle: string;
      Entities: Array<Entity>;
      Systems: Array<System>;
    }
    var config = {} as Iconfig;
    config.Handle = this.Handle;
    config.Entities = [];
    config.Systems = [];

    Object.keys(this.Entities).forEach((e) => {
      config.Entities.push(this.Entities[e].Export());
    });

    Object.keys(this.Systems).forEach((s) => {
      config.Systems.push(this.Systems[s].Export());
    });
    return config;
  }
}

export default Container;
