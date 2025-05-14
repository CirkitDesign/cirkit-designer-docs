---
sidebar_position: 1
---

# Getting Started

Custom Components allow you to extend the Cirkit simulation environment to support any component you need. Create parts tailored to your specific requirements, defining exactly how components look, behave, and interact within your circuits.

Note: The current simulation environment has a digital focus with support for basic analog signals. Full support for simulating electrical currents will be introduced in a future update.

## Component Creation Workflow

Creating a custom component involves three straightforward steps:

1. **Upload a Component Image**
   - Supported formats: **SVG**, **PNG**, or **Fritzing Part**.
   - Determines how your component visually appears in the circuit.

2. **Define Component Pins**
   - Clearly identify pin locations and labels.
   - Pins interface between your component and other parts in the simulation.

3. **(Optional) Define Simulation Behavior**
   - Enables interactive behaviors during simulation.
   - Consists of four files:
     - **UI HTML** *(defines visual layout and interactive elements; dynamically loaded into Angular)*
     - **UI TypeScript** *(handles user interactions, manages UI logic related to the UI HTML, and synchronizes visuals with simulation runtime state changes)*
     - **Runtime State JSON** *(defines state variables shared between the UI and the core simulation logic)*
     - **Component Simulation Logic (TypeScript)** *(manages component's electrical behavior and core  logic in simulations)*

## Understanding Visual Layers: Static vs Interactive

Every custom component includes two distinct visual layers:

- **Static Layer**: Always visible by default, this is the static image you uploaded (SVG, PNG, or Fritzing part). It represents your component visually when the simulation is turned off.

- **Interactive Layer**: Activated when the simulation is turned on. This layer consists of dynamic, interactive elements that respond to user inputs and state changes during simulation.

## Choosing the Right Image Type

### Static PNG Component
- **When simulation is off:** Displays a static PNG image.
- **When simulation is on:** Shows the static PNG image with limited interactive elements overlaid.
- **Best suited for:** Simple sensors, indicators, or components with minimal interactions.

### Interactive SVG Component
- **When simulation is off:** Displays a static SVG image.
- **When simulation is on:** The SVG becomes fully interactive.
- **Best suited for:** Complex interactions such as knobs, joysticks, buttons, or other dynamic elements.
- **Choose PNG** if your component is mostly static or requires minimal interactivity.
- **Choose SVG** if you need rich visuals, dynamic elements, or complex interactions.

## What's Next?

To get started implementing your custom component, explore the detailed guides for each file type:

- [UI HTML Guide](/docs/custom-simulation-parts/component-ui/overview.md)
- [UI TypeScript Guide](/docs/custom-simulation-parts/component-ui/overview.md)
- [Runtime State JSON Guide](/docs/custom-simulation-parts/component-runtime-state-json/overview.md)
- [Core Simulation Logic TypeScript Guide](/docs/custom-simulation-parts/component-simulation-logic-ts/overview.md)

For detailed examples and templates to guide you through implementation, see the [Component Examples & Templates](/docs/custom-simulation-parts/component-examples.md) section.

