const uuidv4 = require('uuid/v4');

function Component(handle)
{
    if(handle === undefined) handle = uuidv4();
    this.handle = handle;
    this.type = "";

    this.import = function(data)
    {
        throw new Error('import() method not implemented');
    }

    this.export = function()
    {
        throw new Error('export() method not implemented');
    }

    this.set_type = function(type)
    {
        this.type = type;
    }
}

module.exports = Component
