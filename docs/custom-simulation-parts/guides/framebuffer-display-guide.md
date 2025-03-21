---
sidebar_position: 1
title: Framebuffer Display Guide
---

# How to Create Displays (OLED, LCD, etc.)

In Cirkit, creating a visual display component (such as an OLED or LCD) involves defining and using a structure called a **framebuffer**.

The framebuffer lets you set pixel data within your component's simulation logic, which can then be visually displayed in the user interface.

Let's walk through exactly how this process works, step by step.

---

## Step 1: Define the Framebuffer in Simulation State JSON

First, define your framebuffer in the component’s simulation state JSON. This specifies the dimensions (`width`, `height`) and sets its type to `"display"`:

**Example (`Simulation State (json)`):**

```json
{
  "stateVariables": [
    {
      "id": "display",
      "type": "display",
      "width": 128,
      "height": 64
    }
  ]
}
```

This creates a framebuffer with dimensions of 128 by 64 pixels.

---

## Step 2: Setting Pixels in Simulation Logic (TypeScript)

In your simulation logic TypeScript file, you directly modify the framebuffer. You typically set pixels based on signals or incoming data (like from I2C).

**Simulation Logic Framebuffer Interface:**

```typescript
interface IFrameBuffer {
  setPixel(x: number, y: number, r: number, g: number, b: number, a?: number): void;
  fill(r: number, g: number, b: number, a: number): void;
  clear(): void;
  getPixelRGBA(x: number, y: number): { r: number, g: number, b: number, a: number };
  getWidth(): number;
  getHeight(): number;
}
```

### Simple OLED Example (Simulation Logic):

Here's a simplified practical example of setting pixels:

```typescript
import { AbstractSimulationComponentLogic } from '@cirkit/simulation/logic';

export class SimulationComponentLogic extends AbstractSimulationComponentLogic {
  frameBuffer: IFrameBuffer;

  public init(): void {
    this.frameBuffer = this.simulationState.getFrameBuffer('display');
    this.clearDisplay();
    this.drawInitialPixels();
  }

  private clearDisplay(): void {
    this.frameBuffer.fill(0, 0, 0, 255);
  }

  private drawInitialPixels(): void {
    // Set initial pixels
    this.frameBuffer.setPixel(10, 10, 255, 255, 255, 255);
    this.frameBuffer.setPixel(20, 15, 255, 255, 255, 255);
  }
}
```

---

## Step 3: Displaying Pixel Data in the UI

The UI visually renders the framebuffer set by the simulation logic. There are two common approaches:

### OLED Display UI Example (Automatic Rendering):

For OLED displays, simply pass the framebuffer into the special `<display>` HTML component provided by Cirkit Simulator. This automatically updates the UI whenever the framebuffer changes.

**UI TypeScript (`SimulationComponentUI`):**

```typescript
export class SimulationComponentUI extends AbstractSimulationComponentUI {
  framebuffer: IFrameBuffer;

  init() {
    this.framebuffer = this.simulationState.getFrameBuffer('display');
  }
}
```

**HTML Template (OLED UI HTML):**

```html
<display [framebuffer]="framebuffer"></display>
```

### LCD Display UI Example (Manual Buffer Reading)

LCD displays often require manually reading the framebuffer data and rendering it onto an HTML canvas or simple grid. Here’s a **minimal** Angular-style example that shows how each pixel can be read from the framebuffer.

**HTML Template (LCD UI HTML):**

```html
<!-- Minimal LCD template with small squares representing each pixel -->
<div *ngFor="let y of createRange(framebuffer.getHeight())" style="display: flex;">
  <div
    *ngFor="let x of createRange(framebuffer.getWidth())"
    [style.background]="isPixelOn(x, y) ? 'black' : 'white'"
    style="width: 4px; height: 4px; margin: 1px;"
  ></div>
</div>
```
**UI TypeScript (LCD UI TypeScript):**

```typescript
export class SimulationComponentUI extends AbstractSimulationComponentUI {
  framebuffer: IFrameBuffer;

  init() {
    // Obtain a reference to the LCD's framebuffer
    this.framebuffer = this.simulationState.getFrameBuffer('lcdDisplay');
  }

  // Simple function to return a numeric array for *ngFor
  createRange(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i);
  }

  // Determines if the pixel at (x, y) is on
  isPixelOn(x: number, y: number): boolean {
    const pixel = this.framebuffer.getPixel(x, y);
    // Basic check: If pixel alpha > 0, consider it "on"
    return pixel.a > 0;
  }
}
```

This example:
- Iterates through all framebuffer pixels (using `getWidth()` and `getHeight()`).
- Renders each pixel as a small colored square.
- Considers any pixel with `alpha > 0` as “on.”

You can adapt this approach with more sophisticated logic, or use a `<canvas>` instead of `div`s.

---

## Summary of Differences:

| Display Type | UI Framebuffer Handling                      | Example UI Implementation |
|--------------|----------------------------------------------|---------------------------|
| **OLED**     | Automatic: Pass framebuffer directly into special HTML element. | `<display [framebuffer]="framebuffer"></display>` |
| **LCD**      | Manual: Explicitly read framebuffer buffer data in TypeScript UI logic. | Manually read & render to canvas |

---

## Quick Recap:

1. Define your framebuffer dimensions in JSON state.
2. Set pixel data dynamically in simulation logic.
3. Visually render pixels in the UI (OLED automatically, LCD manually).

This approach clearly demonstrates flexibility in framebuffer rendering methods within Cirkit Simulator, allowing you to tailor your UI interactions specifically to your display component’s needs.
