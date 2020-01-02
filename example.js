var Component = require('./Component')
var Manager = require('./Manager')

var ECS = new Manager();

class PositionComponent extends Component
{
    constructor(config)
    {
        super(config);
        this.Type = "PositionComponent";
    }
}

class VelocityComponent extends Component
{
    constructor(config)
    {
        super(config);
        this.Type = "VelocityComponent";
    }
}


var world = ECS.Container();

var e = world.Entity();
e.Component(new PositionComponent({ x: 10, y: 20 }));
e.Component(new VelocityComponent({ x: 1, y: 0 }));

var debug = world.Export();
//console.log(JSON.stringify(debug));
