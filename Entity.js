const uuidv4 = require('uuid/v4');

/** ECS Entity */
class Entity
{
  constructor() {
    this.Handle = uuidv4();
    this.Components = {};
  }

  HandleGet() {
    return this.Handle;
  }

  ContainerSet(container) {
    this.Container = container;
  }

  Component(c) {
    c.EntityHandle = this.Handle;
    if(this.Components[c.Type] === undefined) {
      this.Components[c.Type] = {};
    }
    this.Components[c.Type][this.Handle] = c;
    return this.Container.Component(c);
  }

  Export() {
    var config = { 
      Handle: this.Handle,
      Components: {}
    };

    Object.keys(this.Components).forEach((type) => {
      Object.keys(this.Components[type]).forEach((entity) => {
        config.Components[type] = this.Components[type][entity].Export();
      });
    });

    return config;
  }
}

module.exports = Entity;
