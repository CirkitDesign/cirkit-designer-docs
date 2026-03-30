---
sidebar_position: 6
---

# Classroom Setup Guide

This guide is for teachers, TAs, and lab assistants who are setting up Cirkit Designer with physical microcontrollers for a class. Following this guide before class will prevent the most common issues students run into.

## Pre-Class Checklist

### On Each Student Machine

1. **Install the Cirkit Create Agent** — download and install from Cirkit Designer. Ensure only **one copy** is installed
2. **Test the connection** — open [app.cirkitdesigner.com](https://app.cirkitdesigner.com), confirm the agent is detected, and plug in an Arduino board to verify it shows up in the port list
3. **Allow browser permissions** — when prompted, click **Allow**. If the prompt was previously dismissed or blocked, follow the [Browser Permissions](./browser-permissions) guide to reset
4. **Check USB cables** — make sure every station has a **data-capable** USB cable (not charge-only). Label known-good cables if possible
5. **Verify drivers** — if using clone Arduino boards (CH340 chip), ensure drivers are installed. See [Board Not Detected](./board-not-detected) for details

### Network/IT Considerations

- The agent runs on **localhost ports 8991–9000**. If the school's firewall or endpoint security software blocks local port connections, work with IT to whitelist these
- No internet traffic is sent to or from the agent — it only communicates between the browser and local USB devices
- If student machines are reimaged or restored between sessions, the agent and its permissions may need to be set up again

## During Class: Quick Triage

When a student reports an issue, walk through this in order:

1. **Check browser permissions** — did they block the prompt? See [Browser Permissions](./browser-permissions)
2. **Run the universal fix** — close all agents, close all Cirkit tabs, restart one agent, open one tab. See [Universal Fix](./universal-fix)
3. **Check the USB cable and port** — swap the cable, try a different port
4. **Check drivers** — especially relevant for clone boards

Most issues are resolved by steps 1 or 2.

## Common Classroom Pitfalls

- **Students opening multiple tabs** — each tab tries to connect to the agent independently, which can cause conflicts. Instruct students to use only **one Cirkit Designer tab** at a time
- **Charge-only USB cables** — these look identical to data cables but won't work. Pre-test cables and label or replace charge-only ones
- **Multiple agent installations** — if students have installed the agent themselves previously, they may have multiple copies. The [Universal Fix](./universal-fix) covers how to check for this
- **Shared computers with multiple user accounts** — the agent may be installed under a different user's account. Install it system-wide or ensure it's installed for the correct user
