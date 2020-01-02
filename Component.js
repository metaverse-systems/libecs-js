const uuidv4 = require('uuid/v4');

function Component(config)
{
    this.Handle = uuidv4();
    this.EntityHandle = null;

    if(config)
    {
        var json = JSON.parse(config);
        this.Data = json.Data;
    }

    this.Export = function()
    {
        var config = {};
        config.Type = this.Type;
        config.EntityHandle = this.EntityHandle;
        config.Data = this.Data;
        return config;
    }
}

module.exports = Component
