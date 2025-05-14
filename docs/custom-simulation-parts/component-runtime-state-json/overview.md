---
sidebar_position: 1
title: Overview
---

# Component Runtime State JSON

The **Runtime State JSON** file defines the state variables that represent your component's interactive behaviors during simulation. These variables are shared between your UI (defined in UI HTML and UI TypeScript files) and core simulation logic (defined in Simulation Logic Typescript file), enabling seamless synchronization of visual interactions and underlying simulation behavior.

## Quick Start Example

Here is a minimal example to quickly get you started defining a basic boolean state variable for a simple switch component:

```json
{
  "runtimeStateVariables": [
    {
      "id": "pressed",
      "type": "boolean",
      "initialValue": "false",
      "isVisibleToUser": true,
      "label": "Switch State",
      "userDisplayFormat": "button"
    }
  ]
}
```

## Defining State Variables

Each custom component's simulation behavior relies on state variables defined clearly in the JSON file. State variables manage and track dynamic behaviors and interactions.

A basic structure of this file:

```json
{
  "runtimeStateVariables": [
    {
      "id": "variableName",
      "type": "integer",
      "initialValue": "0",
      "isVisibleToUser": true,
      "label": "Variable Label",
      "units": "°C",
      "userDisplayFormat": "range",
      "min": "0",
      "max": "100"
    }
  ]
}
```

### Properties for State Variables:

- **id** *(required)*: Unique identifier for the variable.
- **type** *(required)*: Defines the variable data type.
  - `boolean`
  - `integer`
  - `decimal`
  - `string`
  - `display`
- **initialValue** *(required for boolean, integer, decimal, string)*: Initial value for the variable.
- **label** *(optional)*: Human-readable name shown to users.
- **isVisibleToUser** *(optional; defaults to false)*: Determines if users can directly view/interact with this variable during simulation. If true, the variable is displayed in a popup during simulation (e.g., a slider for adjusting temperature).
- **userDisplayFormat** *(conditional)*: Format to display the variable (e.g., `range` for numeric variables, `button` for booleans).
- **units** *(optional)*: Measurement units (e.g., °C, %, volts).
- **min/max** *(optional)*: Specify range constraints for numeric types (`integer`, `decimal`).

### Supported Data Types

State variables support the following types:

- **boolean** (`true`/`false`)
- **integer** (whole numbers)
- **decimal** (floating-point numbers)
- **string** (text values)
- **display** (special type for graphical display outputs; requires additional properties `width` and `height`)

### Example State Variable Definitions

Here are practical examples with descriptions for common component types:

**Switch (boolean state for pressed/not pressed)**

`pressed` is a boolean that tracks whether the button is pressed. When a user clicks the button in the UI, the UI updates this state variable to `true` to notify the core logic.

```json
{
  "runtimeStateVariables": [
    {
      "id": "pressed",
      "type": "boolean",
      "initialValue": "false",
      "isVisibleToUser": false,
      "label": "Switch State"
    }
  ]
}
```

**LED (On/Off boolean state)**

`isOn` is a boolean representing the LED's state (on or off). When the LED turns on/off electrically in the core simulation, the component logic can update this variable so the LED visually turns on/off in the UI (HTML).

```json
{
  "runtimeStateVariables": [
    {
      "id": "isOn",
      "type": "boolean",
      "initialValue": "false",
      "isVisibleToUser": false,
      "label": "LED State"
    }
  ]
}
```

**Temperature Sensor (Numeric integer state)**

`temperature` is an integer displayed as a slider during simulation, allowing user adjustments. The value initially starts at 25°C and can range from 0 to 100°C.

```json
{
  "runtimeStateVariables": [
    {
      "id": "temperature",
      "type": "integer",
      "initialValue": "25",
      "min": "0",
      "max": "100",
      "isVisibleToUser": true,
      "label": "Temperature",
      "units": "°C",
      "userDisplayFormat": "range"
    }
  ]
}
```

**OLED Display (Graphical output)**

`display` is a special graphical data structure. It enables the core logic to render graphics, which the UI automatically displays during simulation.

```json
{
  "runtimeStateVariables": [
    {
      "id": "display",
      "type": "display",
      "width": 128,
      "height": 64
    }
  ]
}
```

### Best Practices

- Define state variables clearly, using descriptive IDs.
- Keep visibility (`isVisibleToUser`) limited to important variables that provide useful real-time feedback.
- Use numeric constraints (`min`, `max`) to keep values within valid ranges and avoid simulation errors.
