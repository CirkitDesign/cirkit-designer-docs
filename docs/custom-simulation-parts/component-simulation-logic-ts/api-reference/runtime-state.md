---
sidebar_position: 2
---

# Runtime State

The **Runtime State Manager** in your component's core logic enables seamless synchronization and management of simulation state variables between your core logic (TypeScript) and the UI layer. These variables are initialized in your subclass of `AbstractSimulationComponentLogic` and accessed using:

```typescript
this.simulation.runtimeState.methodName();
```

---

## Available Methods

### Boolean State Variables
- **`updateBooleanState(variableName: string, variableValue: boolean)`**  
  Updates a boolean variable from core logic, synchronizing changes to the UI.

- **`getBooleanState(variableName: string): boolean`**  
  Retrieves the current boolean variable value.

- **`subscribeToBooleanStateUpdates(variableName: string, callback: (newValue: boolean) => void)`**  
  Subscribes to updates of a boolean state variable triggered by UI or internal logic.

### Integer State Variables
- **`updateIntegerState(variableName: string, variableValue: number)`**  
  Updates an integer variable from core logic, syncing changes to UI.

- **`getIntegerState(variableName: string): number`**  
  Retrieves the current integer variable value.

- **`subscribeToIntegerStateUpdates(variableName: string, callback: (newValue: number) => void)`**  
  Subscribes to integer variable updates.

### Decimal State Variables
- **`updateDecimalState(variableName: string, variableValue: number)`**  
  Updates a decimal (floating-point) variable.

- **`getDecimalState(variableName: string): number`**  
  Retrieves the current decimal variable value.

- **`subscribeToDecimalStateUpdates(variableName: string, callback: (newValue: number) => void)`**  
  Subscribes to decimal variable updates.

### String State Variables
- **`updateStringState(variableName: string, variableValue: string)`**  
  Updates a string state variable.

- **`getStringState(variableName: string): string`**  
  Retrieves the current string value.

- **`subscribeToStringStateUpdates(variableName: string, callback: (newValue: string) => void)`**  
  Subscribes to string variable updates.

### Display Variables
- **`getFrameBuffer(variableName: string): IFrameBuffer | null`**  
  Retrieves framebuffer data for direct manipulation of display-type state variables.

---

## Typical Usage Pattern

```typescript
// Updating a boolean state variable
this.simulation.runtimeState.updateBooleanState('isLEDOn', true);

// Retrieving an integer state variable
const temp = this.simulation.runtimeState.getIntegerState('temperature');

// Subscribing to state variable changes
this.simulation.runtimeState.subscribeToIntegerStateUpdates('temperature', (newTemp) => {
  this.simulation.log(`Temperature updated to ${newTemp}`);
});
```

The **Runtime State Manager** ensures your core logic and UI remain synchronized, enabling dynamic interactions and responsive simulation components.

