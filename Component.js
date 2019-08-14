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

    this.save = function()
    {
        var output = {};
        output.Data = this.Data;
        return JSON.stringify(output);
    }
}

module.exports = Component
