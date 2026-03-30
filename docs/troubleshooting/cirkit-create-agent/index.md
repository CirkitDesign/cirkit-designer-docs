---
sidebar_position: 1
---

# Cirkit Create Agent Troubleshooting

The Cirkit Create Agent is a desktop application that allows Cirkit Designer to communicate with physical microcontrollers (Arduino, ESP32, etc.) connected to your computer via USB. If you're having trouble getting it to work, start here.

## Common Issues

| Issue | Start Here |
|-------|------------|
| Agent installed but Cirkit Designer says it can't find it | [Browser Permissions](./browser-permissions) |
| Agent was working before but stopped connecting | [Universal Fix](./universal-fix) |
| Agent connects but your board doesn't show up | [Board Not Detected](./board-not-detected) |
| Setting up for a classroom | [Classroom Setup Guide](./classroom-setup) |

## How the Agent Works

The Cirkit Create Agent runs in the background on your computer and listens on a local port (8991–9000). When you open Cirkit Designer in your browser, the web app scans these ports to find the agent. Once connected, the agent detects USB-connected boards and enables you to upload code and use the serial monitor.

For this to work, three things need to be true:

1. **Your browser allows Cirkit Designer to connect** — see [Browser Permissions](./browser-permissions)
2. **Exactly one instance of the agent is running** — see [Universal Fix](./universal-fix)
3. **Your board is properly connected via USB** — see [Board Not Detected](./board-not-detected)
