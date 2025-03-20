---
sidebar_position: 2
---

# Simulation State

The **Simulation State Manager** allows you to manage and synchronize state variables between the UI (HTML and TypeScript) and the core simulation logic. These simulation variables are defined in the **Component Simulation State JSON file** and are accessible from the UI TypeScript class (`SimulationComponentUI`) through:

```typescript
this.simulationState.methodName();
```

---

## Available Methods

### Boolean State Variables
- **`updateBooleanState(variableName: string, variableValue: boolean)`**  
  Updates a boolean state variable, syncing the new value from UI to the core simulation.

- **`getBooleanState(variableName: string): boolean`**  
  Retrieves the current value of a boolean state variable.

- **`subscribeToBooleanStateUpdates(variableName: string, callback: (variableValue: boolean) => void)`**  
  Subscribes to updates for a boolean state variable. The callback is triggered whenever the core simulation updates the variable.

### Integer State Variables
- **`updateIntegerState(variableName: string, variableValue: number)`**  
  Updates an integer state variable from the UI to core simulation.

- **`getIntegerState(variableName: string): number`**  
  Retrieves the current value of an integer state variable.

- **`subscribeToIntegerStateUpdates(variableName: string, callback: (variableValue: number) => void)`**  
  Subscribes to integer state variable updates.

### Decimal State Variables
- **`updateDecimalState(variableName: string, variableValue: number)`**  
  Updates a decimal state variable from the UI to core simulation.

- **`getDecimalState(variableName: string): number`**  
  Retrieves the current value of a decimal state variable.

- **`subscribeToDecimalStateUpdates(variableName: string, callback: (variableValue: number) => void)`**  
  Subscribes to decimal state variable updates.

### String State Variables
- **`updateStringState(variableName: string, variableValue: string)`**  
  Updates a string state variable from the UI to core simulation.

- **`getStringState(variableName: string): string`**  
  Retrieves the current value of a string state variable.

- **`subscribeToStringStateUpdates(variableName: string, callback: (variableValue: string) => void)`**  
  Subscribes to string state variable updates.

### Display Variables
- **`getFrameBuffer(variableName: string): IFrameBuffer | null`**  
  Retrieves the current framebuffer data for display-type state variables, allowing direct manipulation for visual updates.

## Typical Usage Pattern

```typescript
// Updating a boolean state variable
this.simulationState.updateBooleanState('isLEDOn', true);

// Retrieving an integer state variable
const temp = this.simulationState.getIntegerState('temperature');

// Subscribing to state variable changes
this.simulationState.subscribeToIntegerStateUpdates('temperature', (newTemp) => {
  console.log(`Temperature updated to ${newTemp}`);
});
```

The **Simulation State Manager** ensures seamless state synchronization, enabling dynamic and interactive simulation components.