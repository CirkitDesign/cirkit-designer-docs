---
sidebar_position: 1
title: Overview
---

# Component Simulation Logic (TypeScript)

To define custom simulation behaviors for your component, you'll create a TypeScript class extending `AbstractSimulationComponentLogic`. This class defines how your component interacts electrically and logically within the Cirkit simulator.

This documentation specifically addresses how to implement the **Simulation Logic (TypeScript)** file within your component simulation definition.

## Overview

The simulation logic class allows you to:

- Define pin behaviors (digital/analog signals).
- Manage dynamic state shared between the UI and core logic.
- Define static properties inherent to your component.
- Schedule timed events (timers).
- Manage communication protocols (I2C, SPI, UART).

## Creating Your Simulation Logic Class

Every custom component simulation logic file must extend the base class:

```typescript
import { AbstractSimulationComponentLogic } from '@cirkit/simulation/logic';

export class SimulationComponentLogic extends AbstractSimulationComponentLogic {
  public init(): void {
    // Initialize pins, state, and behaviors here.
  }
}
```

The `init()` method is required—it's invoked automatically when simulation starts.

## Available APIs

Within your class, you have access to three key APIs:

### 1. `simulation.api`

Provides access to core simulation features:

- **Pins:**

  - `createAnalogOutputPin(pinName, initialVoltage)`
  - `createDigitalOutputPin(pinName, initialLevel)`
  - `createInputPin(pinName)`
  - `writeAnalog(pin, voltage)`
  - `writeDigital(pin, level)`
  - `addDigitalPinWatch(pin, edge, callback)`

- **Timers:**

  - `createTimer(callback)`
  - `startTimer(timer, delayMicroseconds, isRepeating)`
  - `stopTimer(timer)`

- **Communication (I2C, SPI, UART):**

  - I2C (`i2c.sendData`, `i2c.receiveData`)
  - SPI (`spi.transferData`)
  - UART communication methods

### 2. `simulation.runtimeState`

Manages state variables shared between the UI and the core simulation logic. Examples of these states include:

- **Visual Indicators:** LED status (on/off), displayed visually by the UI but controlled by the simulation logic.
- **User Interaction Events:** Button presses captured by the UI and communicated to the simulation logic.
- **Environmental Variables:** Dynamic parameters such as temperature, humidity, or pressure that affect simulation behavior.

Available methods:

- `updateIntegerState(name, value)`
- `getIntegerState(name)`
- `subscribeToIntegerStateUpdates(name, callback)`

(Equivalent methods exist for Boolean, Decimal, and String states.)

### 3. `simulation.componentProperties`

Manages inherent, static properties of a component that persist across simulation runs. Examples include:

- Resistance, capacitance, inductance values
- Communication addresses (e.g., I2C address)
- Other fixed parameters essential to the component's identity and functionality

Available methods:

- `getIntegerComponentProperty(name)`
- `getBooleanComponentProperty(name)`
- `getDecimalComponentProperty(name)`
- `getStringComponentProperty(name)`

## Example: Simple Joystick Component

```typescript
import { AbstractSimulationComponentLogic, IPin } from '@cirkit/simulation/logic';

export class SimulationComponentLogic extends AbstractSimulationComponentLogic {
  private pinVert: IPin;
  private pinHorz: IPin;
  private pinSel: IPin;

  public init(): void {
    this.simulation.hideStaticPicture();

    // Initialize joystick pins with default voltages
    this.pinVert = this.simulation.api.pin.createAnalogOutputPin('VERT', 2.5);
    this.pinHorz = this.simulation.api.pin.createAnalogOutputPin('HORZ', 2.5);
    this.pinSel = this.simulation.api.pin.createAnalogOutputPin('SEL', 5);

    // Subscribe to UI state changes
    this.simulation.runtimeState.subscribeToIntegerStateUpdates('xValue', this.updateJoystickPosition);
    this.simulation.runtimeState.subscribeToIntegerStateUpdates('yValue', this.updateJoystickPosition);
    this.simulation.runtimeState.subscribeToBooleanStateUpdates('pressed', this.updateButtonState);
  }

  private updateJoystickPosition = () => {
    const x = this.simulation.runtimeState.getIntegerState('xValue');
    const y = this.simulation.runtimeState.getIntegerState('yValue');

    this.simulation.api.pin.writeAnalog(this.pinHorz, 2.5 * (x + 1));
    this.simulation.api.pin.writeAnalog(this.pinVert, 2.5 * (y + 1));
  };

  private updateButtonState = (pressed: boolean) => {
    const voltage = pressed ? 0 : 5;
    this.simulation.api.pin.writeAnalog(this.pinSel, voltage);
  };
}
```

## Debugging Tips

- Use the built-in logging utility:
  ```typescript
  this.log('Your debug message');
  ```
- Leverage state update subscriptions to reactively manage your component state.
