/** Base class for ECS System */
class System
{
  constructor(config) {
    this.Handle = null;
    this.RequestedComponents = [];
    this.LastTime = (new Date()).getTime();
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
    var config = {
      Handle: this.Handle
    };

    Object.keys(this).forEach((name) => {
      if(name == "Handle") return;
      if(name == "Container") return;
      if(name == "RequestedComponents") return;
      if(name == "LastTime") return;

      config[name] = this[name];
    });

    return config;
  }
}

module.exports = System;
