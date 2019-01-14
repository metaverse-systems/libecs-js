const uuidv4 = require('uuid/v4');

class Component
{
    constructor(handle)
    {
        if(handle === undefined) handle = UUID.generate();
        this.handle = handle;
        this.type = "";
    }

    import(data)
    {
        throw new Error('import() method not implemented');
    }

    export()
    {
        throw new Error('export() method not implemented');
    }
}

export default Component
