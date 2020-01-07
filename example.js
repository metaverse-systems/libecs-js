var Component = require('./Component')
var Manager = require('./Manager')
var System = require('./System')

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

class PhysicsSystem extends System
{
    constructor(config)
    {
        super(config);
        this.Handle = "PhysicsSystem";
        this.ComponentRequest("PositionComponent");
        this.ComponentRequest("VelocityComponent");
    }

    Update()
    {
        var dt = this.DeltaTimeGet();
        var multiplier = dt / 1000;
        console.log("Last run " + dt + "ms ago.");

        var Components = this.ComponentsGet();

        Object.keys(Components["PositionComponent"]).forEach(function(entity) {
            Components["PositionComponent"][entity].forEach(function(pos) {
                var vel = Components["VelocityComponent"][entity][0];

                // Adjust position data
                pos.x += vel.x * multiplier;
                pos.y += vel.y * multiplier;

                console.log(entity + " - Position - x: " + Number.parseFloat(pos.x).toFixed(2) + ", y: " + Number.parseFloat(pos.y).toFixed(2) + "   Velocity - x: " + vel.x + ", y: " + vel.y);
            });
        });
    }
}

var world = ECS.Container();

world.System(new PhysicsSystem());

var e = world.Entity();

e.Component(new PositionComponent({ x: 10, y: 20 }));
e.Component(new VelocityComponent({ x: 1, y: 0 }));


var debug = world.Export();
console.log(JSON.stringify(debug, null, 4));

world.Start(500); // 500ms between loops
