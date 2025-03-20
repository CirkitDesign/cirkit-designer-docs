---
sidebar_position: 1
---

# Simulation API

The `SimulationAPI` provides utility methods for interacting with the simulation environment directly from your UI TypeScript code. It's available within your UI TypeScript class (`SimulationComponentUI`) through:

```typescript
this.simulationAPI.methodName();
```

Below is an overview of available methods:

---

## Methods

### `triggerUIRefresh()`

Triggers an immediate UI update. Use this method when the UI must immediately reflect changes in state variables or internal logic.

**Example:**

```typescript
// After updating a visual property manually
this.simulationAPI.triggerUIRefresh();
```

---

### `getComponentRotation(): number`

Returns the rotation angle (in degrees) of the current component instance. Useful when implementing orientation-dependent UI behavior.

**Example:**

```typescript
const rotation = this.simulationAPI.getComponentRotation();
console.log(`Component rotation is ${rotation} degrees`);
```

---

### `addDocumentEventListener(type: string, listener: EventListenerOrEventListenerObject)`

Adds a global event listener on the document, enabling advanced UI interactions beyond your component's immediate DOM scope.

**Example:**

```typescript
// Listening for global mouse movements
this.simulationAPI.addDocumentEventListener('mousemove', this.onGlobalMouseMove);
```

---

### `removeDocumentEventListener(type: string, listener: EventListenerOrEventListenerObject)`

Removes a previously added global event listener, essential for cleanup to prevent memory leaks or unwanted behaviors.

**Example:**

```typescript
// Removing global mouse move listener when component is destroyed
this.simulationAPI.removeDocumentEventListener('mousemove', this.onGlobalMouseMove);
```

---

### `log(message: string, level?: LogLevelEnum)`

Logs messages to the simulation environment, useful for debugging or providing runtime feedback.

**Log Levels:**
- `LogLevelEnum.INFO` (default)
- `LogLevelEnum.WARN`
- `LogLevelEnum.ERROR`

**Example:**

```typescript
this.simulationAPI.log('Button pressed', LogLevelEnum.INFO);
```

---

## Usage Example

Here's a practical example demonstrating multiple methods in action:

```typescript
export class SimulationComponentUI extends AbstractSimulationComponentUI {
  init() {
    const rotation = this.simulationAPI.getComponentRotation();
    this.simulationAPI.log(`Component rotation: ${rotation}`, LogLevelEnum.INFO);

    this.simulationAPI.addDocumentEventListener('click', this.handleDocumentClick);
  }

  handleDocumentClick = (event: MouseEvent) => {
    this.simulationAPI.log('Document clicked!', LogLevelEnum.INFO);
    this.simulationAPI.triggerUIRefresh();
  }

  destroy() {
    this.simulationAPI.removeDocumentEventListener('click', this.handleDocumentClick);
  }
}
```

This demonstrates logging, event listening, and manual UI refresh.