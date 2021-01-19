/** Base class for ECS component */
class Component
{
  EntityHandle: string;
  Type: string;
  constructor(config: object) {
    this.EntityHandle = null;

    Object.keys(config).forEach((name) => {
        this[name] = config[name];
    });
  }

  Export() {
    var config = {};

    Object.keys(this).forEach((name) => {
        if(name == "EntityHandle") return;
        if(name == "Type") return;

        config[name] = this[name];
    });
    return config;
  }
}

export default Component;
