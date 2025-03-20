---
sidebar_position: 1
---

# Simulation API

The `SimulationAPI` provides methods to interact with the simulation environment directly from your component's core simulation logic. Accessible within your `SimulationComponentLogic` class, it offers streamlined access to simulation features through dedicated utilities.

```typescript
this.simulationAPI.methodName();
```

## Available Utilities

### [Pin API (`pin`)](./pin-api)

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
const pin = this.simulationAPI.pin.createDigitalOutputPin('LED', 5, DigitalVoltageLevelEnum.LOW);
this.simulationAPI.pin.writeDigital(pin, DigitalVoltageLevelEnum.HIGH);
```

---

### [Timer API (`timer`)](./timer-api)

Schedule and manage timed simulation events.

**Methods:**

- `createTimer(callback: () => void): ITimer`
- `startTimer(timer: ITimer, intervalMicros: number, repeat: boolean): void`
- `stopTimer(timer: ITimer): void`
- `getCurrentTimeNanos(): bigint`

**Example:**
```typescript
const timer = this.simulationAPI.timer.createTimer(this.onTimeout);
this.simulationAPI.timer.startTimer(timer, 500000, true); // Every 500ms
```

---

### [Connection API (`connection`)](./connection-api)

Manage dynamic connections between simulation components.

**Methods:**

- `addWire(pin1: IPin, pin2: IPin): IWireConnection`
- `removeWire(wire: IWireConnection): boolean`
- `addResistor(pin1: IPin, pin2: IPin, resistance: number): IResistorConnection`
- `removeResistor(resistor: IResistorConnection): boolean`
- `updateResistor(resistor: IResistorConnection, newResistance: number): boolean`
- `addLED(pinAnode: IPin, pinCathode: IPin, forwardVoltageThreshold?: number): ILEDConnection | null`
- `removeLED(led: ILEDConnection): boolean`

**Example:**
```typescript
const wire = this.simulationAPI.connection.addWire(pinA, pinB);
this.simulationAPI.connection.removeWire(wire);
```

---

### [I2C API (`i2c`)](./i2c-api)

Handle I2C communication between components.

**Methods:**

- `createI2CSlave(address: number, sclPin: IPin, sdaPin: IPin, callbacks: I2CSlaveCallbacks): void`
- `createI2CMaster(sclPin: IPin, sdaPin: IPin, registerI2CSlave: (config: I2CSlaveConfig) => boolean): void`

**Example:**
```typescript
this.simulationAPI.i2c.createI2CSlave(0x40, sclPin, sdaPin, {
  connect: () => true,
  writeByte: (data) => { /* handle data */ return true; },
  readByte: () => 0x00
});
```

---

### [SPI API (`spi`)](./spi-api)

Facilitate SPI communication.

**Methods:**

- `createSPIMaster(sck: IPin, mosi: IPin, miso: IPin, spiMode?: number): void`
- `createSPISlave(sck: IPin, mosi: IPin, miso: IPin, done: (buffer: Uint8Array, count: number) => void, spiMode?: number): void`
- `spiSlaveStart(buffer: Uint8Array, count: number): void`
- `spiSlaveStop(): void`
- `spiMasterTransfer(mosiByte: number): number`

**Example:**
```typescript
this.simulationAPI.spi.createSPIMaster(sckPin, mosiPin, misoPin, 0);
const receivedByte = this.simulationAPI.spi.spiMasterTransfer(0x9F);
```

---

### [Audio API (`audio`)](./audio-api)

Manage audio-related interactions in the simulation.

**Methods:**

- `sendAudioFrequencyUpdate(frequency: number): void`
- `sendAudioBuffer(sampleRate: number, samples: Float32Array): void`

**Example:**
```typescript
this.simulationAPI.audio.sendAudioFrequencyUpdate(440);
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
    this.ledPin = this.simulationAPI.pin.createDigitalOutputPin('LED', 5, DigitalVoltageLevelEnum.LOW);

    this.blinkTimer = this.simulationAPI.timer.createTimer(this.toggleLED);
    this.simulationAPI.timer.startTimer(this.blinkTimer, 500000, true); // Blink every 500ms
  }

  private toggleLED = (): void => {
    const currentLevel = this.simulationAPI.pin.readDigital(this.ledPin);
    const newLevel = currentLevel === DigitalVoltageLevelEnum.HIGH ? DigitalVoltageLevelEnum.LOW : DigitalVoltageLevelEnum.HIGH;
    this.simulationAPI.pin.writeDigital(this.ledPin, newLevel);

    this.simulationAPI.audio.sendAudioFrequencyUpdate(newLevel === DigitalVoltageLevelEnum.HIGH ? 440 : 0);
  };
}
```
