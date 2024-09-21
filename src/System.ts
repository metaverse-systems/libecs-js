import { Container } from './Container';

type SystemConfig = {
  handle?: string;
  [key: string]: any; // Allow additional configuration
};

class System {
  private handle: string;
  protected lastTime: number;
  protected container?: Container;
  protected config: SystemConfig;

  constructor(config: SystemConfig = {}) {
    this.handle = config.handle || `system-${Date.now()}`;
    this.lastTime = Date.now();
    this.config = config;
  }

  public HandleGet(): string {
    return this.handle;
  }

  public ContainerSet(container: Container): void {
    this.container = container;
  }

  /** Get the delta time since the last update and reset the lastTime */
  public DeltaTimeGet(): number {
    const now = Date.now();
    const deltaTime = now - this.lastTime;
    this.lastTime = now;
    return deltaTime;
  }

  /** Initialize the system (can be overridden by subclasses) */
  public Init(): void {
    // Optional initialization logic
  }

  /** Update the system (must be implemented by subclasses) */
  public Update(): void {
    throw new Error('System.Update() must be implemented by derived systems');
  }

  /** Export the system's current configuration */
  public Export(): Record<string, any> {
    return {
      handle: this.handle,
      ...this.config
    };
  }
}

export { System, SystemConfig };