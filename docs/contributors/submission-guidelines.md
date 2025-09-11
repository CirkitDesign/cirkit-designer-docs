---
id: submission-guidelines
title: Submission Guidelines & Acceptance Criteria
sidebar_position: 4
---

# Submission Guidelines & Acceptance Criteria

Your components will be used by hundreds of thousands of users, so they must meet our quality standards. The best way to understand our expectations is to study our existing high-quality components.

## Follow Our Examples

Your component should meet the same standards as our published examples. Study these implementations for code structure, documentation style, and testing patterns:

- **[Component Examples](../custom-simulation-parts/component-examples)** - Browse our library of example components with full source code
- **[Servo Component Tutorial](../tutorials/create-simulation-servo)** - Complete walkthrough of building a servo component
- **[16x2 LCD Display Tutorial](../tutorials/create-simulation-lcd)** - Example of a complex display component
- **[Getting Started Guide](../custom-simulation-parts/getting-started)** - Foundation concepts and patterns

Right-click any simulatable component in Cirkit Designer, select "Edit a copy of Component," and navigate to the simulation tab to see detailed implementation examples.

## Quality Standards

### Code Requirements
- **Clean, readable code** with clear variable names and logical structure
- **Comprehensive comments** explaining complex logic and calculations
- **Error handling** for invalid inputs and edge cases
- **Performance optimization** - components must run smoothly in real-time simulation

### Simulation Accuracy
- **Realistic behavior** that matches the real-world component
- **Proper parameter ranges** with appropriate defaults
- **Accurate timing** and response characteristics
- **Electrical properties** modeled correctly (voltage, current, resistance, etc.)

### User Interface
- **Intuitive controls** that follow existing Cirkit patterns
- **Clear labeling** of all parameters and connections
- **High-quality component image** - preferably upload an SVG or Fritzing fzpz part file as the image source
- **Consistent styling** with existing components

## Documentation Standards

### Example Project Required
Every submission must include an example project that:
- **Demonstrates core functionality** of your component
- **Shows realistic usage** in a practical circuit
- **Tests key features** and parameter ranges
- **Works correctly** without errors or warnings

## Testing Requirements

Before submitting, verify your component:

- ✅ **Works in example projects** - included demonstration works perfectly without errors
- ✅ **Handles edge cases** - invalid inputs, extreme parameter values
- ✅ **Works with other components** - integrates properly in complex circuits  
- ✅ **UI responds properly** - all controls work as expected
- ✅ **No errors** - no console warnings or JavaScript errors

## Acceptance Criteria

Your submission will be evaluated on:

1. **Code Quality** - Clean, well-documented, performant code
2. **Simulation Accuracy** - Realistic component behavior  
3. **User Experience** - Intuitive interface and clear documentation
4. **Working Example** - Component works correctly in provided example project


## Review Process

1. **Initial screening** - Check for basic functionality and completeness
2. **Code review** - Evaluate code quality, structure, and documentation  
3. **Simulation testing** - Verify accuracy and performance in various scenarios
4. **User experience review** - Test interface usability and documentation clarity
5. **Final decision** - Accept, reject, or request specific improvements

## Questions?

Join our Discord community for help: https://discord.gg/2R2DY37VpE