---
sidebar_position: 1
title: Overview
---

# Component UI (HTML & TypeScript) Documentation

Custom Components utilize an **HTML interface** combined with **TypeScript logic** to create dynamic interactions within your simulations. These two elements together enable your components to respond visually to simulation state changes and user interactions.

## UI HTML

The **UI HTML** defines the visual and interactive aspects of your component:

- If the underlying component image is a **PNG**, the HTML elements overlay this image, allowing minor interactive additions.
- If the underlying component image is an **SVG**, the default SVG is hidden, and an interactive SVG defined within your HTML file is displayed instead.

### Angular Integration

The HTML is dynamically loaded through Angular. It has access to a TypeScript instance named `component`, defined in your UI (TS) file. This enables event bindings (like `(mousedown)`, `(mouseup)`) to interact with the simulation logic.

### Example HTML and TypeScript Integration

**Pushbutton Example:**

HTML:
```html
<!-- Interactive button element with mouse events -->
<button class="interactive-button"
        (mousedown)="component.handleButtonMouseDown()"
        (mouseup)="component.handleButtonMouseUp()">
</button>
```

TypeScript:
```typescript
import { AbstractSimulationComponentUI } from "@cirkit/simulation/ui";

export class SimulationComponentUI extends AbstractSimulationComponentUI {
  init() {}

  // When mouse is pressed down, update button state to true
  handleButtonMouseDown() {
    this.simulationState.updateBooleanState('isButtonPressed', true);
  }

  // When mouse is released, update button state to false
  handleButtonMouseUp() {
    this.simulationState.updateBooleanState('isButtonPressed', false);
  }
}
```

**Analog Joystick Example:**

HTML (excerpt):
```html
<!-- Joystick knob that users interact with -->
<circle id="knob" cx="13.6" cy="13.6" r="10.6"
        [attr.transform]="component.knobTransform"
        (mousedown)="component.press($event)"
        (mouseup)="component.release()"></circle>

<!-- Clickable region representing the left direction of the joystick -->
<rect class="region" x="1" y="8.5" width="7" height="10"
      (mousedown)="component.onMouseDown($event, -1, 0)"
      (mouseup)="component.onMouseUp()"></rect>
<!-- Additional directional controls omitted for brevity -->
```

TypeScript:
```typescript
export class SimulationComponentUI extends AbstractSimulationComponentUI {
  // Stores the current transformation applied to the joystick knob
  knobTransform: string = 'translate(0, 0)';

  init() {}

  // Calculates new knob position based on x and y input values
  computeTransform(xVal: number, yVal: number): string {
    const step = 2.5; // pixel shift per input unit
    const dx = xVal * step;
    const dy = -yVal * step;
    return `translate(${dx}, ${dy})`;
  }

  // Handles mouse down events for directional control, updating state and UI
  onMouseDown(event: MouseEvent, xDir: number, yDir: number) {
    event.preventDefault();
    this.simulationState.updateIntegerState('xValue', xDir);
    this.simulationState.updateIntegerState('yValue', yDir);
    this.knobTransform = this.computeTransform(xDir, yDir);
  }

  // Handles mouse release events, resetting joystick position
  onMouseUp() {
    this.simulationState.updateIntegerState('xValue', 0);
    this.simulationState.updateIntegerState('yValue', 0);
    this.knobTransform = this.computeTransform(0, 0);
  }

  // Handles press event for joystick knob, sets pressed state to true
  press(event: MouseEvent) {
    event.preventDefault();
    this.simulationState.updateBooleanState('pressed', true);
  }

  // Handles release event for joystick knob, sets pressed state to false
  release() {
    this.simulationState.updateBooleanState('pressed', false);
  }
}
```

## Core Elements Available in UI TypeScript

- **`simulationState`**: Manages synchronization of state variables between UI and core logic.
  - Methods:
    - `updateBooleanState()`, `updateIntegerState()`, etc.
    - `subscribeToBooleanStateUpdates()`, `subscribeToIntegerStateUpdates()`, etc.

- **`simulationAPI`**: Provides helper functions for UI interactions and system events.
  - Methods include:
    - `triggerUIRefresh()`
    - `getComponentRotation()`
    - `addDocumentEventListener()`
    - `removeDocumentEventListener()`

## Summary of Workflow

1. Define the visual structure and user interaction triggers in **HTML**.
2. Implement the interactive behaviors and state synchronization logic in **TypeScript**.
3. The TypeScript logic uses provided APIs (`simulationState` and `simulationAPI`) to manage dynamic component behaviors.

This approach allows powerful, customizable, and interactive components tailored to your simulation needs.

