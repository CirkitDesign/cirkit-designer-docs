---
sidebar_position: 5
---

# Board Not Detected

If the Cirkit Create Agent is connected to Cirkit Designer but your Arduino or other microcontroller doesn't appear in the port/board list, follow these steps.

## Quick Checks

### 1. Check Your USB Cable

Not all USB cables support data transfer — some are charge-only. This is the most common cause of boards not being detected.

**How to tell:**
- Try a different USB cable
- If you have a cable that you know works for data (e.g., one that came with the board), use that one
- Data cables are often slightly thicker than charge-only cables

### 2. Try a Different USB Port

Some USB ports (especially hubs or front-panel ports) may not provide enough power or have driver issues.

- Plug the board directly into a USB port on your computer (not through a hub)
- Try a different port if available

### 3. Check That the Board Powers On

When plugged in, most Arduino boards will show a power LED (usually green or red). If no LED lights up:

- The cable may be faulty
- The USB port may not be providing power
- The board may be damaged

## Driver Issues

Some boards require USB drivers to be installed on your computer.

### Arduino UNO, Mega, Nano (Original)

These boards use the **ATmega16U2** USB chip and typically work without additional drivers on modern operating systems.

### Arduino Nano (Clone) and Other CH340-Based Boards

Many clone boards use the **CH340** USB-to-serial chip, which requires a driver:

- **Windows:** Download the CH340 driver from the manufacturer's website
- **Mac:** On macOS 12+, the CH340 driver is usually included. For older versions, you may need to install it manually

### ESP32 Boards

ESP32 boards typically use a **CP2102** or **CH340** USB-to-serial chip. Install the appropriate driver if your board isn't detected.

## Agent-Side Troubleshooting

If the board is powered on, the cable is good, and drivers are installed, the issue may be with the agent's port discovery.

### Restart the Agent

The agent's serial port discovery process can sometimes get stuck. Follow the [Universal Fix](./universal-fix) to fully restart the agent.

### Check the Agent Debug Console

1. Open your browser and navigate to `http://localhost:8991` (or try ports 8992–9000)
2. This opens the agent's built-in debug console
3. Type `list` and press Enter to see what ports the agent detects
4. If your board's port appears in the list but not in Cirkit Designer, the issue is on the web app side — try reloading the page

## Still Not Working?

Reach out on the [Cirkit Designer Discord](https://discord.gg/2R2DY37VpE) with:

- Your board model
- Your operating system
- Whether the board's power LED is on
- The output of the `list` command from the agent debug console
