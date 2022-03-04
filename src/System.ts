/** Base class for ECS System */
class System
{
  Handle: string;
  RequestedComponents: Array<string>;
  LastTime: number;
  Container: any;
  config: any;
  constructor(config) {
    this.Handle = null;
    this.RequestedComponents = [];
    this.LastTime = (new Date()).getTime();
    this.config = {};

    Object.keys(config).map((key) => {
      if(typeof config[key] == "function") {
        this[key] = config[key];
      } else {
        this.config[key] = config[key];
      }
    });
  }

  HandleGet() {
    return this.Handle;
  }

  ContainerSet(container) {
    this.Container = container;
  }

  ComponentRequest(component) {
    if(this.RequestedComponents.includes(component)) return;
    this.RequestedComponents.push(component);
  }

  ComponentsGet() {
    return this.Container.ComponentsGet(this.RequestedComponents);
  }

  DeltaTimeGet() {
    var now = (new Date()).getTime();
    var dt = now - this.LastTime;
    this.LastTime = now;
    return dt;
  }

  Init() {
  }

  Export() {
    const config = {
      ...this,
      Handle: this.Handle
    };

    return config;
  }
}

export { System };
