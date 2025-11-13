---
sidebar_position: 0
title: Component AI Power User Guide
---

# Component AI Power User Guide

A comprehensive guide to mastering Cirkit's AI assistant for building custom simulation components - from simple LEDs to complex protocol-driven devices.

## 📺 Video Tutorial

Watch our walkthrough to see the Component AI in action:
**[Building Simulation Components with AI](https://www.youtube.com/watch?v=i3vKdrOKFFQ&t=36s)**

---

## ⚡ What Makes Component AI Powerful

The Component AI is a specialized assistant for building **simulation components** in Cirkit Designer. It handles everything from visual UI to complex behavior logic:

### **Autonomous Research & Implementation**
- **Reads documentation** from Cirkit's Simulation API reference
- **Searches the web and GitHub** for datasheets, reference libraries, and real-world implementations
- **Analyzes existing code** (e.g., Arduino libraries) to understand how components behave
- **Implements full simulation component logic** with behavior, state, and interactive UI

### **What You Can Build**
- **Visual components**: LED matrices, 7-segment displays, LCDs, OLEDs
- **Input devices**: Buttons, switches, potentiometers, sensors
- **Motors & actuators**: Servos, stepper motors, relays
- **Communication devices**: SPI/I2C/UART modules (RFID readers, displays, etc.)
- **Audio components**: Buzzers, speakers, audio playback
- **Custom logic**: Timers, counters, state machines, custom algorithms

### **Key Capabilities**
- **Simulation behavior**: Define how components respond to pin signals and user interactions
- **Visual feedback**: Create dynamic UI that updates based on component state
- **Protocol implementation**: Build accurate communication behavior when needed
- **Code review & debugging**: Validate implementations and analyze simulation logs
- **Iterative refinement**: Fix bugs, improve visuals, and enhance realism

---

## ⏱️ Important: Processing Time

:::info
**Each request can take several minutes** (typically 2-5 minutes).

The AI performs multiple complex tasks in sequence:
- Searching GitHub and the web for reference materials
- Reading and analyzing datasheets or library code
- Reasoning about protocol specifications
- Writing and validating TypeScript code
- Testing against Cirkit Simulation APIs

**Pro tip**: Provide context up front (part name, protocol type, datasheet links, or GitHub repos) to improve speed and accuracy.
:::

---

## 🚀 Quick Start Workflow

Follow this proven workflow for building components efficiently:

1. **Prepare Prerequisites**
   - Component image (PNG/SVG)
   - Pin definitions and labelling

2. **Open Component AI & Describe**
   - Specify the component name and what it should do
   - Describe desired behaviors (visual feedback, pin responses, animations)
   - Include datasheet or library links if available (especially for protocol-based components)

3. **Let the AI Work**
   - Answer any clarifying questions concisely
   - Wait for initial implementation (2-5 minutes)

4. **Test Immediately**
   - Create a simple test circuit (e.g., Arduino + your component)
   - Run simulation and observe behavior

5. **Iterate & Refine**
   - Ask AI to review for correctness
   - Request logging for debugging
   - Fix protocol issues and edge cases

6. **Validate**
   - Have AI audit against reference sources
   - Verify Cirkit API usage is correct

---

## 💡 Example Prompts (Copy & Use)

### Building Visual Components
```
Create a simulation component for a MAX7219 LED matrix display. Search GitHub
for popular Arduino libraries to understand the SPI command structure. The UI
should show an 8x8 grid of LEDs that light up based on received data.
```

```
Build a 4-digit 7-segment display component.
The component should respond to GPIO pins for digit selection and segment control.
```

### Input & Sensor Components
```
Implement a DHT22 temperature/humidity sensor. Search GitHub for the Arduino
DHT library to understand the single-wire communication protocol and timing.
Return realistic sensor values that can be configured in the UI.
```

```
Create a rotary encoder component with visual feedback showing rotation
direction and click detection. Check how popular Arduino libraries handle
pulse counting and debouncing.
```

### Motors & Actuators
```
Build a servo motor simulation component. Search for Arduino Servo library
examples to understand PWM signal timing. Show visual rotation from 0-180
degrees with realistic movement speed and easing.
```

### Communication Components (Protocol-Based)
```
Implement an MFRC522 RFID reader using SPI. Search GitHub for the miguelbalboa
MFRC522 Arduino library to understand register mapping, command sequences, and
authentication flow. Include visual feedback when cards are detected.
```

### Code Review & Debugging
```
Review my component implementation for correctness and suggest improvements.
```

```
Add detailed logging to trace what's happening during simulation. I'll re-run
it and then you can check the debug logs.
```

### Improving Existing Components
```
Check the debug logs from my last simulation run. Analyze what's going wrong
and suggest fixes.
```

```
Enhance my button component to include debouncing and better visual feedback.
```

---

## 🔍 Debugging Like a Pro

### Step 1: Add Instrumentation
Ask the AI to add logging **before** running tests:
```
Add detailed logging to help debug this component.
```

### Step 2: Run Simulation
Run your simulation in Cirkit Designer to generate debug logs.

### Step 3: AI-Powered Analysis
Ask the AI to analyze the logs:
```
Check the debug logs and analyze what's going wrong. Propose specific fixes.
```

### Step 4: Verify Assumptions
Challenge the AI to explain its implementation:
```
Explain how this component works and walk me through the simulation flow.
```

### Step 5: API Compliance Check
```
Review the code and confirm it follows the Cirkit Simulation API correctly.
```

---

## 🎯 Best Practices

### **Provide Context Early**
The more information you provide upfront, the better results:
- Component name and type (LED matrix, servo, sensor, etc.)
- How it should look and behave visually
- Pin configuration and signal types (digital, PWM, analog, protocol)
- For protocol components: datasheet or reference library links
- Any specific timing or behavioral requirements

### **Start Small, Expand Incrementally**
1. Start with basic structure: pins, runtime state, simple UI
2. Implement one core behavior (e.g., respond to one pin, show one visual state)
3. Test in a simple circuit
4. Add complexity gradually (more features, animations, edge cases)
5. Retest after each addition

### **Build Logic First, Polish Visuals Later**
- Get the simulation behavior working correctly first
- Ensure pin interactions and state updates work
- Verify component responds to circuit signals properly
- Then enhance the UI with animations, colors, and effects

### **Lock In Checkpoints**
After each successful milestone:
- Test in Cirkit Designer with a real circuit
- Summarize what works to the AI
- Confirm behavior before adding new features
- Keep a mental list of what's working vs. what needs refinement

---

## 🧩 Advanced Techniques

### Multi-Step Problem Solving
When stuck on complex issues:

1. Ask the AI to create a detailed plan
2. Execute each step (build structure → add behavior → add visuals → test → debug)
3. Report results back to the AI after each step
4. Share simulation logs or describe unexpected behavior
5. Iterate until component works as expected

### Leveraging Web & GitHub Search
The AI can find and analyze real-world references:
- Component datasheets and specifications
- Popular Arduino/Adafruit/SparkFun libraries
- Example implementations from GitHub
- Community forum discussions and tutorials

**Example prompts:**
```
Search for how the HC-SR04 ultrasonic sensor works and find an Arduino library
to base the timing and behavior on. Include visual representation of the sound wave.
```

```
Find examples of realistic servo motor animations in JavaScript and apply
similar easing/interpolation to make movement look smooth.
```

### Comparative Validation
Have the AI cross-reference multiple sources:
```
Compare my component's behavior against both the datasheet and the most
popular Arduino library. Highlight any differences in timing, state handling,
or visual representation.
```