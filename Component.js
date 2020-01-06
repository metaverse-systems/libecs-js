const uuidv4 = require('uuid/v4');

class Component
{
    constructor(config)
    {
        this.Handle = uuidv4();
        this.EntityHandle = null;

        var c = this;
        Object.keys(config).forEach(function(name) {
            c[name] = config[name];
        });
    }

    Export()
    {
        var config = {};

        var c = this;
        Object.keys(this).forEach(function(name) {
            if(name == "Handle") return;
            if(name == "EntityHandle") return;
            if(name == "Type") return;

            config[name] = c[name];
        });
        return config;
    }
}

module.exports = Component
