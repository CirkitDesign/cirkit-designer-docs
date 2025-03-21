---
sidebar_position: 7
---

# Connection API

The Connection API provides methods for creating, managing, and removing electrical connections between pins of a component within the simulation environment. Connections include wires, resistors, and LEDs, which enable you to simulate various electrical effects and behaviors by interconnecting pins internally within a single component.

This API allows you to:

- **Create and remove wires** to electrically connect internal component pins (useful for building components like pushbuttons or relays).
- **Create, update, and remove resistors** to introduce controlled internal resistance (useful for components like potentiometers).
- **Create and remove LEDs** with defined forward voltage thresholds to simulate internal component indicators or effects (individual LEDs, seven-segment displays, etc.).

---

## Connection Types Explained

### Wire Connections

Wire connections establish direct electrical continuity between two pins within a component, without resistance or voltage drop. Commonly used in components such as pushbuttons or relays to control internal connection behavior.

### Resistor Connections

Resistor connections introduce a specified internal resistance between two pins of a component, affecting current flow and voltage distribution internally. For example, resistors can be used to simulate potentiometers or voltage dividers within a component.

### LED Connections

LED connections represent internal Light Emitting Diodes placed between two pins (anode and cathode) within a component. These connections simulate the emission of light when forward-biased above a certain voltage threshold, as seen in individual LED components or displays such as seven-segment indicators.

---

## API Methods Reference & Examples

### Wire Connections

#### `addWire(pin1: IPin, pin2: IPin): IWireConnection`

Creates a direct internal electrical connection (wire) between two component pins.

```typescript
const wireConnection = this.simulationAPI.connections.addWire(pin1, pin2);
```

#### `removeWire(wire: IWireConnection): boolean`

Removes an existing internal wire connection.

```typescript
const removed = this.simulationAPI.connections.removeWire(wireConnection);
```

---

### Resistor Connections

#### `addResistor(pin1: IPin, pin2: IPin, resistance: number): IResistorConnection`

Creates an internal resistor connection with specified resistance between two component pins.

- `resistance` *(number)*: Resistance value in ohms (Ω).

```typescript
const resistorConnection = this.simulationAPI.connections.addResistor(pin1, pin2, 4700);
```

#### `updateResistor(resistor: IResistorConnection, newResistance: number): boolean`

Updates the resistance value of an existing internal resistor connection.

- `newResistance` *(number)*: New resistance value in ohms (Ω).

```typescript
const updated = this.simulationAPI.connections.updateResistor(resistorConnection, 10000);
```

#### `removeResistor(resistor: IResistorConnection): boolean`

Removes an existing internal resistor connection.

```typescript
const removed = this.simulationAPI.connections.removeResistor(resistorConnection);
```

---

### LED Connections

#### `addLED(pinAnode: IPin, pinCathode: IPin, forwardVoltageThreshold?: number): ILEDConnection | null`

Creates an internal LED connection between two component pins.

- `forwardVoltageThreshold` *(number, optional)*: Voltage required for the internal LED to emit light (default behavior determined by simulator if not specified).

```typescript
const ledConnection = this.simulationAPI.connections.addLED(pinAnode, pinCathode, 2.1);
```

#### `removeLED(led: ILEDConnection): boolean`

Removes an existing internal LED connection.

```typescript
const removed = this.simulationAPI.connections.removeLED(ledConnection);
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

## Interfaces

### `IWireConnection`

Represents an internal wire connection between two pins.

```typescript
interface IWireConnection {
  pin1: IPin;
  pin2: IPin;
}
```

### `IResistorConnection`

Represents an internal resistor connection between two pins.

```typescript
interface IResistorConnection {
  pin1: IPin;
  pin2: IPin;
  resistance: number;
}
```

### `ILEDConnection`

Represents an internal LED connection between two pins.

```typescript
interface ILEDConnection {
  anode: IPin;
  cathode: IPin;

  isEmittingLight(): boolean;
  onStateChange(callback: (isEmittingLight: boolean) => void): void;
}
```

---