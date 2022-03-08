/** Base class for ECS component */
declare class Component {
    EntityHandle: string;
    Type: string;
    constructor(config: object);
    Export(): {};
}
export { Component };
