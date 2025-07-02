---
sidebar_position: 1
---

# Simulation API

The `Simulation API` provides methods to interact with the simulation environment directly from your component's core simulation logic. Accessible within your `SimulationComponentLogic` class, it offers streamlined access to simulation features through dedicated utilities.

```typescript
this.simulation.api.methodName();
```

## Available Utilities

### [Pin API (`pin`)](./simulation-api-utilities/pin-api)

Manage component pins for analog and digital signals.

**Methods:**

- `createAnalogOutputPin(pinName: string, initialVoltage?: number): IPin`
- `createDigitalOutputPin(pinName: string, highVoltage?: number, initialLevel?: DigitalVoltageLevelEnum): IPin`
- `createInputPin(pinName: string): IPin`
- `createInputPinWithPullUp(pinName: string, resistor?: number, pullVoltage?: number): IPin`
- `createInputPinWithPullDown(pinName: string, resistor?: number): IPin`
- `writeAnalog(pin: IPin, voltage: number): void`
- `writeDigital(pin: IPin, level: DigitalVoltageLevelEnum): void`
- `readAnalog(pin: IPin): number`
- `readDigital(pin: IPin, thresholdVoltage?: number): DigitalVoltageLevelEnum`
- `addDigitalPinWatch(pin: IPin, edge: EdgeEnum, callback: (pin: IPin, voltage: number) => void): boolean`
- `addAnalogPinWatch(pin: IPin, deltaThreshold: number, callback: (pin: IPin, voltage: number) => void): boolean`
- `removeDigitalPinWatch(pin: IPin): boolean`
- `removeAnalogPinWatch(pin: IPin): boolean`

**Example:**
```typescript
const pin = this.simulation.api.pin.createDigitalOutputPin('LED', 5, DigitalVoltageLevelEnum.LOW);
this.simulation.api.pin.writeDigital(pin, DigitalVoltageLevelEnum.HIGH);
```

---

### [Timer API (`timer`)](./simulation-api-utilities/timer-api)

Schedule and manage timed simulation events.

**Methods:**

- `createTimer(callback: () => void): ITimer`
- `startTimer(timer: ITimer, intervalMicros: number, repeat: boolean): void`
- `stopTimer(timer: ITimer): void`
- `getCurrentTimeNanos(): bigint`

**Example:**
```typescript
const timer = this.simulation.api.timer.createTimer(this.onTimeout);
this.simulation.api.timer.startTimer(timer, 500000, true); // Every 500ms
```

---

### [Connection API (`connection`)](./simulation-api-utilities/connection-api)

Manage dynamic connections between simulation components.

**Methods:**

- `addWire(pin1: IPin, pin2: IPin): IWireConnection`
- `removeWire(wire: IWireConnection): boolean`
- `addResistor(pin1: IPin, pin2: IPin, resistance: number): IResistorConnection`
- `removeResistor(resistor: IResistorConnection): boolean`
- `updateResistor(resistor: IResistorConnection, newResistance: number): boolean`
- `addLED(pinAnode: IPin, pinCathode: IPin, forwardVoltageThreshold?: number): ILEDConnection | null`
- `removeLED(led: ILEDConnection): boolean`
- `addDiode(pinAnode: IPin, pinCathode: IPin, options?: IDiodeModelOptions): IDiodeHandle | null`
- `removeDiode(handle: IDiodeHandle): boolean`
- `addBJT(collector: IPin, base: IPin, emitter: IPin, options?: IBjtModelOptions): IBjtHandle | null`
- `removeBJT(handle: IBjtHandle): boolean`
- `addMOSFET(drain: IPin, gate: IPin, source: IPin, options?: IMosfetModelOptions): IMosfetHandle | null`
- `removeMOSFET(handle: IMosfetHandle): boolean`
- `addVoltageSource(positivePin: IPin, referencePin: IPin, options?: IVoltageSourceOptions): IVoltageSourceHandle | null`
- `removeVoltageSource(handle: IVoltageSourceHandle): boolean`
- `addDCMotor(pinA: IPin, pinB: IPin, options: IDCMotorOptions): IDCMotorHandle | null`
- `removeDCMotor(handle: IDCMotorHandle): boolean`

**Example:**
```typescript
const wire = this.simulation.api.connection.addWire(pinA, pinB);
this.simulation.api.connection.removeWire(wire);
```

---

### [I2C API (`i2c`)](./simulation-api-utilities/i2c-api)

Handle I2C communication between components.

**Methods:**

- `createI2CSlave(address: number, sclPin: IPin, sdaPin: IPin, callbacks: I2CSlaveCallbacks): void`
- `createI2CMaster(sclPin: IPin, sdaPin: IPin, registerI2CSlave: (config: I2CSlaveConfig) => boolean): void`

**Example:**
```typescript
this.simulation.api.i2c.createI2CSlave(0x40, sclPin, sdaPin, {
  connect: () => true,
  writeByte: (data) => { /* handle data */ return true; },
  readByte: () => 0x00
});
```

---

### [SPI API (`spi`)](./simulation-api-utilities/spi-api)

Facilitate SPI communication.

**Methods:**

- `createSPIMaster(sck: IPin, mosi: IPin, miso: IPin, spiMode?: number): void`
- `createSPISlave(sck: IPin, mosi: IPin, miso: IPin, done: (buffer: Uint8Array, count: number) => void, spiMode?: number): void`
- `spiSlaveStart(buffer: Uint8Array, count: number): void`
- `spiSlaveStop(): void`
- `spiMasterTransfer(mosiByte: number): number`

**Example:**
```typescript
this.simulation.api.spi.createSPIMaster(sckPin, mosiPin, misoPin, 0);
const receivedByte = this.simulation.api.spi.spiMasterTransfer(0x9F);
```

---

### [Audio API (`audio`)](./simulation-api-utilities/audio-api)

Manage audio-related interactions in the simulation.

**Methods:**

- `sendAudioFrequencyUpdate(frequency: number): void`
- `sendAudioBuffer(sampleRate: number, samples: Float32Array): void`

**Example:**
```typescript
this.simulation.api.audio.sendAudioFrequencyUpdate(440);
```

---

## Usage Example

Here's an integrated example demonstrating multiple APIs in action:

```typescript
import { AbstractSimulationComponentLogic, IPin, ITimer, DigitalVoltageLevelEnum } from '@cirkit/simulation/logic';

export class SimulationComponentLogic extends AbstractSimulationComponentLogic {
  private ledPin: IPin;
  private blinkTimer: ITimer;

  public init(): void {
    this.ledPin = this.simulation.api.pin.createDigitalOutputPin('LED', 5, DigitalVoltageLevelEnum.LOW);

    this.blinkTimer = this.simulation.api.timer.createTimer(this.toggleLED);
    this.simulation.api.timer.startTimer(this.blinkTimer, 500000, true); // Blink every 500ms
  }

  private toggleLED = (): void => {
    const currentLevel = this.simulation.api.pin.readDigital(this.ledPin);
    const newLevel = currentLevel === DigitalVoltageLevelEnum.HIGH ? DigitalVoltageLevelEnum.LOW : DigitalVoltageLevelEnum.HIGH;
    this.simulation.api.pin.writeDigital(this.ledPin, newLevel);

    this.simulation.api.audio.sendAudioFrequencyUpdate(newLevel === DigitalVoltageLevelEnum.HIGH ? 440 : 0);
  };
}
```
