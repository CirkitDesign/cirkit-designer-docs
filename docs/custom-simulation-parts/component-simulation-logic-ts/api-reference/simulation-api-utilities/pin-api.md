---
sidebar_position: 1
---

# Pin API

The Pin API provides methods for creating and interacting with pins on a component. Pins are connection points on a component that enable electrical interactions with other components in a circuit. Each pin defines how the component electrically interacts within the simulation environment.

**Important:** Pins created or modified using this API must already have been declared during the component pin definition step. This API specifically handles registering and managing these pre-defined pins with the simulation environment.

This API allows you to:

- **Create pins** (input and output).
- **Modify pin modes** (toggle between input and output dynamically).
- **Read and write pin values** (analog voltage or digital HIGH/LOW).
- **Watch for voltage changes** (edge-triggered or threshold-based).

---

## Pin Types Explained

### Input Pins

Input pins are passive connection points designed to passively receive or allow measurement of signals from other components. They do **not actively drive signals** but instead enable voltage levels to be read or monitored.

Types of input pins include:

- **Generic Input Pin:** Used to read digital (HIGH/LOW) or analog voltage levels passively.
- **Input with Pull-Up:** Passive pin with an internal resistor pulling the pin voltage to HIGH by default.
- **Input with Pull-Down:** Passive pin with an internal resistor pulling the pin voltage to LOW by default.
- **Component Terminals:** Pins that represent component terminals such as:
  - **Pushbutton terminals:** Pins that become electrically connected when the button is pressed (handled separately by the Connections API).
  - **LED terminals (anode/cathode):** Pins used to place components like LEDs across terminals (handled separately by the Connections API).

### Output Pins

Output pins actively drive voltages onto the pin and into the connected circuit.

Types of output pins:

- **Digital Output Pin**: Outputs a binary HIGH or LOW voltage.
- **Analog Output Pin**: Outputs a specified continuous voltage.

---
## API Methods Reference & Examples

### Creating Pins

#### `createInputPin(pinName: string): IPin`

Creates a passive input pin.

- **`pinName`** *(string)*: Unique name for the pin.

```typescript
const inputPin = this.simulation.api.pin.createInputPin(/* pinName= */ "DATA_IN");
```

#### `createInputPinWithPullUp(pinName: string, resistor?: number, pullVoltage?: number): IPin`

Creates an input pin with an internal pull-up resistor.

- `pinName` *(string)*: Name of the pin.
- `resistor` *(number, default: 10000Ω)*: Pull-up resistor value.
- `pullVoltage` *(number, default: 5V)*: Voltage level to pull up to.

```typescript
const pullUpPin = this.simulation.api.pin.createInputPinWithPullUp(
  /* pinName= */ "BTN", 
  /* resistor= */ 4700, 
  /* pullVoltage= */ 3.3
);
```

#### `createInputPinWithPullDown(pinName: string, resistor?: number): IPin`

Creates an input pin with an internal pull-down resistor.

- `pinName` *(string)*: Name of the pin.
- `resistor` *(number, default: 10000Ω)*: Resistor value.

```typescript
const pullDownPin = this.simulation.api.pin.createInputPinWithPullDown(
  /* pinName= */ "BTN_DOWN"
);
```

#### `createDigitalOutputPin(pinName: string, highVoltage?: number, value?: DigitalVoltageLevelEnum): IPin`

Creates a digital output pin.

- `pinName` *(string)*: Pin name.
- `highVoltage` *(number, default: 5V)*: Voltage level representing HIGH state.
- `value` *(DigitalVoltageLevelEnum, default: LOW)*: Initial pin state.

```typescript
const digitalOutPin = this.simulation.api.pin.createDigitalOutputPin(
  /* pinName= */ "LED_OUT", 
  /* highVoltage= */ 5, 
  /* value= */ DigitalVoltageLevelEnum.HIGH
);
```

#### `createAnalogOutputPin(pinName: string, voltage?: number): IPin`

Creates an analog output pin.

- `pinName` *(string)*: Pin name.
- `voltage` *(number, default: 0V)*: Initial analog voltage.

```typescript
const analogPin = this.simulation.api.pin.createAnalogOutputPin(
  /* pinName= */ "DAC_OUT", 
  /* voltage= */ 2.5
);
```

---

### Pin Reading and Writing

#### `readAnalog(pin: IPin): number`

Reads the current analog voltage from a pin.

```typescript
const analogVoltage = this.simulation.api.pin.readAnalog(/* pin= */ inputPin);
```

#### `readDigital(pin: IPin, thresholdVoltage?: number): DigitalVoltageLevelEnum`

Reads a digital HIGH or LOW based on a voltage threshold.

- `thresholdVoltage` *(number, default: 2.5V)*: Threshold voltage to differentiate HIGH from LOW.

```typescript
const digitalValue = this.simulation.api.pin.readDigital(
    /* pin= */ inputPin,
    /* thresholdVoltage= */ 2.5);
```

#### `writeAnalog(pin: IPin, voltage: number): void`

Writes an analog voltage to an output pin.

- `voltage` *(number)*: Voltage to output.

```typescript
this.simulation.api.pin.writeAnalog(
    /* pin= */ outputPin,
    /* voltage= */ 3.7);
```

#### `writeDigital(pin: IPin, value: DigitalVoltageLevelEnum): void`

Writes a digital HIGH or LOW to a pin.

- `value` *(DigitalVoltageLevelEnum)*: `HIGH` or `LOW`.

```typescript
this.simulation.api.pin.writeDigital(
    /* pin= */ outputPin,
    /* value= */ DigitalVoltageLevelEnum.LOW);
```

---

### Watching Pins for Changes

#### `addDigitalPinWatch(pin: IPin, edge: EdgeEnum, callback: (pin: IPin, voltage: number) => void): boolean`

Adds a watcher for digital pin changes.

- `edge` *(EdgeEnum)*: Trigger edge (`RISING` or `FALLING`).
- `callback` *(function)*: Called upon state change.

```typescript
this.simulation.api.pin.addDigitalPinWatch(
    /* pin= */ pin,
    /* edge= */ EdgeEnum.RISING,
    /* callback= */ (pin, voltage) => {
  console.log(`${pin.name} went HIGH to ${voltage}V`);
});
```

#### `addAnalogPinWatch(pin: IPin, deltaThreshold: number, callback: (pin: IPin, voltage: number) => void): boolean`

Adds a watcher for analog voltage changes exceeding a threshold.

- `deltaThreshold` *(number)*: Minimum voltage change to trigger callback.
- `callback` *(function)*: Function called when voltage change exceeds threshold.

```typescript
this.simulation.api.pin.addAnalogPinWatch(
    /* pin= */ pin,
    /* deltaThreshold= */ 0.1,
    /* callback= */(pin, voltage) => {
  console.log(`Voltage changed: ${voltage}V`);
});
```

#### `removeDigitalPinWatch(pin: IPin): boolean`

Removes the digital watch from a pin.

```typescript
this.simulation.api.pin.removeDigitalPinWatch(/* pin= */ pin);
```

#### `removeAnalogPinWatch(pin: IPin): boolean`

Removes an analog pin watch.

```typescript
this.simulation.api.pin.removeAnalogPinWatch(/* pin= */ pin);
```

### Pin Mode Updates

#### `updatePinToInput(pin: IPin): void`

Updates an existing pin to function as a basic input pin.

- `pin` *(IPin)*: The pin to update.

```typescript
this.simulation.api.pin.updatePinToInput(/* pin= */ dataPin);
```

#### `updatePinToInputWithPullUp(pin: IPin, resistor?: number, pullVoltage?: number): void`

Updates an existing pin to function as an input with an internal pull-up resistor.

- `pin`: *(IPin)* - Pin object to update.
- `resistor`: *(number, default: 10000)* - Internal resistor value.
- `pullVoltage`: *(number, default: 5V)* - Voltage the pin is pulled up to.

```typescript
this.simulation.api.pin.updatePinToInputWithPullUp(
  /* pin= */ buttonPin,
  /* resistor= */ 4700,
  /* pullVoltage= */ 3.3
);
```

#### `updatePinToInputWithPullDown(pin: IPin, resistor?: number): void`

Updates an existing pin to function as an input with an internal pull-down resistor.

- `pin`: *(IPin)* - The pin to update.
- `resistor`: *(number, default: 10000)* - Resistor value.

```typescript
this.simulation.api.pin.updatePinToInputWithPullDown(
  /* pin= */ sensorPin,
  /* resistor= */ 10000
);
```

#### `updatePinToDigitalOutput(pin: IPin, highVoltage?: number, value?: DigitalVoltageLevelEnum): void`

Updates an existing pin to function as a digital output.

- `pin`: *(IPin)* - Pin to update.
- `highVoltage`: *(number, default: 5V)* - Voltage representing the HIGH state.
- `value`: *(DigitalVoltageLevelEnum, default: LOW)* - Initial state (HIGH or LOW).

```typescript
this.simulation.api.pin.updatePinToDigitalOutput(
  /* pin= */ ledPin,
  /* highVoltage= */ 5,
  /* value= */ DigitalVoltageLevelEnum.HIGH
);
```

#### `updatePinToAnalogOutput(pin: IPin, voltage?: number): void`

Updates an existing pin to function as an analog output.

- `pin`: *(IPin)* - Pin to update.
- `voltage`: *(number, default: 0V)* - Initial voltage.

```typescript
this.simulation.api.pin.updatePinToAnalogOutput(
  /* pin= */ pwmPin,
  /* voltage= */ 2.5
);
```

---

## Interfaces & Enums

This section describes interfaces and enums relevant to the Pin API.

### Enums

#### `DigitalVoltageLevelEnum`

Defines digital pin states.

```typescript
enum DigitalVoltageLevelEnum {
  LOW,
  HIGH,
}
```

#### `EdgeEnum`

Defines edges for digital pin watchers.

```typescript
enum EdgeEnum {
  Rising,
  Falling,
  Both,
}
```

---

### Interfaces

#### `IPin`

Represents a pin within the simulation environment.

```typescript
interface IPin { }
```

---

