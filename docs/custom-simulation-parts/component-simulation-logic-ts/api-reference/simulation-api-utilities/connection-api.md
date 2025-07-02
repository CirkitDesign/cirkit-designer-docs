---
sidebar_position: 5
---

# Connection API

The Connection API gives your simulation component a toolbox of primitives - wire, resistor, LED, diode, BJT, MOSFET, voltage‑source, and DC‑motor models. Instantiate any primitive between the pins of your component to let the simulator handle its real-world analog behavior automatically.

The following primitives are currently supported:
- Wire
- Resistor
- LED
- Diode
- BJT
- MOSFET
- Voltage Source
- DC Motor

Some of the things you can do with this API:

- **Create and remove wires** to electrically connect internal component pins (useful for building components like pushbuttons or relays).
- **Create, update, and remove resistors** to introduce controlled internal resistance (useful for components like potentiometers).
- **Create and remove LEDs** with defined forward voltage thresholds to simulate internal component indicators or effects (individual LEDs, seven-segment displays, etc.).

---

### Example – momentary push-button

This shows how a single **wire primitive** can be added and removed at run-time to model a push-button.

```ts
import {
  AbstractSimulationComponentLogic,
  IWireConnection,
} from '@cirkit/simulation/logic';

export class SimulationComponentLogic extends AbstractSimulationComponentLogic {
  private bridge: IWireConnection | null = null;

  init() {
    // Register pins
    const inA  = this.simulation.api.pin.createInputPin('A (in)');
    const inB  = this.simulation.api.pin.createInputPin('B (in)');
    const outA = this.simulation.api.pin.createInputPin('A (out)');
    const outB = this.simulation.api.pin.createInputPin('B (out)');

    // Fixed internal wiring
    this.simulation.api.connection.addWire(inA, inB);
    this.simulation.api.connection.addWire(outA, outB);

    // Dynamic wiring controlled by a Boolean variable
    this.simulation.runtimeState.subscribeToBooleanStateUpdates(
      'isPressed',
      pressed => {
        if (pressed && !this.bridge) {
          this.bridge = this.simulation.api.connection.addWire(inA, outA);
        } else if (!pressed && this.bridge) {
          this.simulation.api.connection.removeWire(this.bridge);
          this.bridge = null;
        }
      },
    );
  }
}
```
---
### Example – BJT Transistor

This example shows how to add a BJT primitive, listen for its region‐change events, and log each transition.

```ts
import {
  AbstractSimulationComponentLogic,
  BjtRegionEnum,
  BjtTypeEnum,
  IBjtModelOptions
} from '@cirkit/simulation/logic';

export class SimulationComponentLogic extends AbstractSimulationComponentLogic {
  public init(): void {
    // create pins
    const emitter  = this.simulation.api.pin.createInputPin('emitter');
    const base     = this.simulation.api.pin.createInputPin('base');
    const collector = this.simulation.api.pin.createInputPin('collector');

    // configure and add the BJT primitive
    const options: IBjtModelOptions = { type: BjtTypeEnum.NPN };
    const bjtHandle = this.simulation.api.connections.addBJT(
      collector,
      base,
      emitter,
      options
    );

    // subscribe to region changes
    bjtHandle.onRegionChange((region: BjtRegionEnum) => {
      this.simulation.log(`BJT region changed to: ${BjtRegionEnum[region]}`);
    });
  }
}
```

---

## Connection Types Explained

### Wire Connections

Wire connections establish direct electrical continuity between two pins within a component, without resistance or voltage drop. Commonly used in components such as pushbuttons or relays to control internal connection behavior.

### Resistor Connections

Resistor connections introduce a specified internal resistance between two pins of a component, affecting current flow and voltage distribution internally. For example, resistors can be used to simulate potentiometers or voltage dividers within a component.

### LED Connections

LED connections represent internal Light Emitting Diodes placed between two pins (anode and cathode) within a component. These connections simulate the emission of light when forward-biased above a certain voltage threshold, as seen in individual LED components or displays such as seven-segment indicators.

### Diode Connections

Diode connections represent internal diode primitives placed between two pins (anode and cathode), allowing current flow primarily in one direction after a specified forward voltage threshold.

### BJT (Bipolar Junction Transistor) Connections

BJT connections represent transistor primitives with collector, base, and emitter pins. These primitives simulate transistor switching behavior.

### MOSFET Connections

MOSFET connections represent Metal-Oxide-Semiconductor Field-Effect Transistor primitives with drain, gate, and source pins. MOSFET primitives simulate switching behavior with gate voltage control.

### Voltage Source Connections

Voltage source connections represent internal ideal voltage sources placed between two pins, providing a stable voltage difference. These primitives simulate internal voltage references, batteries, or regulated supply rails.

### DC Motor Connections

DC motor connections represent ideal DC motor primitives between two pins, modeling the electrical-to-mechanical behavior.

---

## API Methods Reference & Examples

### Wire Connections

#### `addWire(pin1: IPin, pin2: IPin): IWireConnection` 

Creates a direct internal electrical connection (wire) between two component pins.

```typescript
const wireConnection = this.simulation.api.connections.addWire(pin1, pin2);
```

#### `removeWire(wire: IWireConnection): boolean`

Removes an existing internal wire connection.

```typescript
const removed = this.simulation.api.connections.removeWire(wireConnection);
```

---

### Resistor Connections

#### `addResistor(pin1: IPin, pin2: IPin, resistance: number): IResistorConnection`

Creates an internal resistor connection with specified resistance between two component pins.

- `resistance` *(number)*: Resistance value in ohms (Ω).

```typescript
const resistorConnection = this.simulation.api.connections.addResistor(pin1, pin2, 4700);
```

#### `updateResistor(resistor: IResistorConnection, newResistance: number): boolean`

Updates the resistance value of an existing internal resistor connection.

- `newResistance` *(number)*: New resistance value in ohms (Ω).

```typescript
const updated = this.simulation.api.connections.updateResistor(resistorConnection, 10000);
```

#### `removeResistor(resistor: IResistorConnection): boolean`

Removes an existing internal resistor connection.

```typescript
const removed = this.simulation.api.connections.removeResistor(resistorConnection);
```

---

### LED Connections

#### `addLED(pinAnode: IPin, pinCathode: IPin, forwardVoltageThreshold?: number): ILEDConnection | null`

Creates an internal LED connection between two component pins.

- `forwardVoltageThreshold` *(number, optional)*: Voltage required for the internal LED to emit light (default behavior determined by simulator if not specified).

```typescript
const ledConnection = this.simulation.api.connections.addLED(pinAnode, pinCathode, 2.1);
```

#### `removeLED(led: ILEDConnection): boolean`

Removes an existing internal LED connection.

```typescript
const removed = this.simulation.api.connections.removeLED(ledConnection);
```

---

### LED State Change Subscription

Internal LED connections support state change subscriptions to monitor whether the LED is emitting light.

#### `onStateChange(callback: (isEmittingLight: boolean) => void): void`

Subscribes to internal LED state changes, triggering the callback when emission state changes.

```typescript
ledConnection.onStateChange((isEmitting) => {
  console.log(`Internal LED is ${isEmitting ? 'ON' : 'OFF'}`);
});
```

---

### Diode Connections

#### `addDiode(pinAnode: IPin, pinCathode: IPin, options?: IDiodeModelOptions): IDiodeHandle | null`  
Creates a diode primitive with optional forward-voltage and series-resistance settings.

```typescript
const diode = this.simulation.api.connections.addDiode(pinAnode, pinCathode, { Vf: 0.7, RsOn: 0.1 });
```

#### `removeDiode(handle: IDiodeHandle): boolean`  
Removes a diode primitive.

```typescript
const removed = this.simulation.api.connections.removeDiode(diode);
```

---

### BJT Connections

#### `addBJT(collector: IPin, base: IPin, emitter: IPin, options?: IBjtModelOptions): IBjtHandle | null`  
Creates a BJT primitive (NPN or PNP).

```typescript
const bjt = this.simulation.api.connections.addBJT(colPin, basePin, emitPin, { type: BjtTypeEnum.NPN });
```

#### `removeBJT(handle: IBjtHandle): boolean`  
Removes a BJT primitive.

```typescript
const removed = this.simulation.api.connections.removeBJT(bjt);
```

---

### MOSFET Connections

#### `addMOSFET(drain: IPin, gate: IPin, source: IPin, options?: IMosfetModelOptions): IMosfetHandle | null`  
Creates a MOSFET primitive (NMOS or PMOS).

```typescript
const mosfet = this.simulation.api.connections.addMOSFET(drainPin, gatePin, sourcePin, { type: MosfetTypeEnum.NMOS });
```

#### `removeMOSFET(handle: IMosfetHandle): boolean`  
Removes a MOSFET primitive.

```typescript
const removed = this.simulation.api.connections.removeMOSFET(mosfet);
```

---

### Voltage Source Connections

#### `addVoltageSource(positivePin: IPin, referencePin: IPin, options?: IVoltageSourceOptions): IVoltageSourceHandle | null`  
Creates an ideal voltage-source primitive between two pins.

```typescript
const vSource = this.simulation.api.connections.addVoltageSource(posPin, refPin, { voltage: 5 });
```

#### `removeVoltageSource(handle: IVoltageSourceHandle): boolean`  
Removes a voltage-source primitive.

```typescript
const removed = this.simulation.api.connections.removeVoltageSource(vSource);
```

---

### DC Motor Connections

#### `addDCMotor(pinA: IPin, pinB: IPin, options: IDCMotorOptions): IDCMotorHandle | null`  
Creates a DC-motor primitive between two pins.

```typescript
const motor = this.simulation.api.connections.addDCMotor(pinA, pinB, { rWindings: 10, kvRpmPerVolt: 120 });
```

#### `removeDCMotor(handle: IDCMotorHandle): boolean`  
Removes a DC-motor primitive.

```typescript
const removed = this.simulation.api.connections.removeDCMotor(motor);
```

---

## Interfaces

### Connection / Primitive Handles

#### `IWireConnection`

Represents an internal wire connection between two pins.

```typescript
interface IWireConnection {
  pin1: IPin;
  pin2: IPin;
}
```

#### `IResistorConnection`

Represents an internal resistor connection between two pins.

```typescript
interface IResistorConnection {
  pin1: IPin;
  pin2: IPin;
  resistance: number;
}
```

#### `ILEDConnection`

Represents an internal LED connection between two pins.

```typescript
interface ILEDConnection {
  anode: IPin;
  cathode: IPin;

  isEmittingLight(): boolean;
  onStateChange(callback: (isEmittingLight: boolean) => void): void;
}
```

#### `IDiodeHandle`

Represents a diode primitive with forward‐voltage behavior.

```typescript
interface IDiodeHandle {
  isConducting(): boolean;
  onConductingChange(callback: (conducting: boolean) => void): void;
}
```

#### `IBjtHandle`

Represents a BJT primitive with region‐based switching.

```typescript
interface IBjtHandle {
  getRegion(): BjtRegionEnum;
  onRegionChange(callback: (region: BjtRegionEnum) => void): void;
  isConducting(): boolean;
}
```

#### `IMosfetHandle`

Represents a MOSFET primitive with gate‐controlled conduction.

```typescript
interface IMosfetHandle {
  getRegion(): MosfetRegionEnum;
  onRegionChange(callback: (region: MosfetRegionEnum) => void): void;
  isConducting(): boolean;
}
```

#### `IVoltageSourceHandle`

Represents an ideal voltage‐source primitive.

```typescript
interface IVoltageSourceHandle {
  getVoltage(): number;
  setVoltage(voltage: number): void;
  onChange(callback: (voltage: number) => void): void;
}
```

#### `IDCMotorHandle`

Represents a DC‐motor primitive modeling electrical→mechanical conversion.

```typescript
interface IDCMotorHandle {
  getSpeed(): number;
  getSpeedRpm(): number;
  setLoadTorque(fn: () => number): void;
  onSpeedChange(callback: (speed: number) => void): void;
}
```

---

### Primitive Options / Config

#### `IDiodeModelOptions`

Configuration options for a diode primitive.

```typescript
interface IDiodeModelOptions {
  /** Forward turn-on voltage (V). Default: 0.6 */
  Vf?: number;
  /** Series resistance when conducting (Ω). Default: 0.1 */
  RsOn?: number;
}
```

#### `IBjtModelOptions`

Configuration options for a BJT primitive.

```typescript
interface IBjtModelOptions {
  /** Transistor polarity. Default: BjtTypeEnum.NPN */
  type?: BjtTypeEnum;
  /** Forward current gain βₙ. Default: 100 */
  betaF?: number;
  /** Reverse current gain βᵣ. Default: 5 */
  betaR?: number;
  /** Base-emitter turn-on voltage (V). Default: 0.7 */
  VbeOn?: number;
  /** Collector-emitter saturation voltage (V). Default: 0.2 */
  VceSat?: number;
}
```

#### `IMosfetModelOptions`

Configuration options for a MOSFET primitive.

```typescript
interface IMosfetModelOptions {
  /** MOSFET polarity. Default: MosfetTypeEnum.NMOS */
  type?: MosfetTypeEnum;
  /** Threshold voltage Vth (V). Default: 2.0 */
  Vth?: number;
  /** On-resistance RdsOn (Ω) in triode. Default: 0.1 */
  RdsOn?: number;
}
```

#### `IVoltageSourceOptions`

Configuration options for a voltage-source primitive.

```typescript
interface IVoltageSourceOptions {
  /** Output voltage (positivePin – referencePin). Default: 5 */
  voltage?: number;
}
```

#### `IDCMotorOptions`

Configuration options for a DC-motor primitive.

```typescript
interface IDCMotorOptions {
  /** Armature winding resistance (Ω). Required. */
  rWindings: number;
  /** Back-EMF constant (rpm/V). Required. */
  kvRpmPerVolt: number;
  /** Rotor inertia (kg·m²). Default: 1e-5 */
  J?: number;
  /** Viscous friction coefficient (N·m·s/rad). Default: 1e-4 */
  friction?: number;
}
```
---

### Enums

#### `BjtTypeEnum`

```typescript
enum BjtTypeEnum {
  NPN = 0,
  PNP = 1,
}
```

#### `BjtRegionEnum`

```typescript
enum BjtRegionEnum {
  Cutoff,
  Active,
  Saturation,
  Reverse,
}
```

#### `MosfetTypeEnum`

```typescript
enum MosfetTypeEnum {
  NMOS = 0,
  PMOS = 1,
}
```

#### `MosfetRegionEnum`

```typescript
enum MosfetRegionEnum {
  Cutoff,
  Triode,
  Saturation,
}
```