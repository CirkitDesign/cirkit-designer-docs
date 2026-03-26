---
sidebar_position: 2
title: ESP32-S3
---

# ESP32-S3 Simulation

The ESP32-S3 is a WiFi-enabled dual-core microcontroller from Espressif, widely used for IoT projects. Cirkit Designer supports Arduino sketch projects on the ESP32-S3.

:::note
**ESP-IDF project support in Cirkit Designer is coming soon.**
:::

---

## Getting Started

Place an ESP32-S3 development board on the canvas and open the code editor by clicking on the Code tab. Write your Arduino sketch using familiar APIs like `Serial`, `digitalWrite`, `analogRead`, and WiFi libraries.

```cpp
#include <Arduino.h>

void setup() {
  Serial.begin(9600);
  pinMode(2, OUTPUT);
}

void loop() {
  digitalWrite(2, HIGH);
  delay(500);
  digitalWrite(2, LOW);
  delay(500);
}
```

---

## Simulation Features

| Feature | Status | Notes |
|---------|--------|-------|
| Processor (Dual-core Xtensa) | ✔️ | |
| GPIO | ✔️ | Digital I/O, interrupts, pull-up/pull-down resistors, peripheral routing (IOMUX) |
| UART | ✔️ | 3 channels — used by `Serial`, `Serial1`, `Serial2` |
| SPI | ✔️ | Full-duplex with DMA. Works with standard SPI library and SPI devices |
| I2C | ✔️ | 2 controllers — works with `Wire` library and I2C sensors/displays |
| Timers | ✔️ | Hardware timers, `millis()`, `delay()`, alarm scheduling |
| LEDC PWM | ✔️ | Used by `analogWrite()`, Servo, tone/buzzer |
| ADC | ✔️ | `analogRead()` with oneshot and continuous/DMA sampling |
| WiFi | ✔️ | HTTP, HTTPS, MQTT, WebSocket, UDP. Open networks only — see [WiFi Networking guide](../guides/wifi-networking) |
| RMT | 🟡 | Transmit only — NeoPixel / WS2812 LED strips work. Receive not yet supported |
| AES Accelerator | ✔️ | Hardware-accelerated AES encryption/decryption with DMA support |
| SHA Accelerator | ✔️ | Hardware-accelerated SHA hashing with DMA support |
| RSA Accelerator | ✔️ | Hardware-accelerated RSA operations |
| RNG | ✔️ | Hardware random number generator |
| RTC | ✔️ | Sleep modes not simulated |
| Flash / PSRAM | ✔️ | Standard firmware flash and PSRAM access |
| Watchdog Timers | ✔️ | MWDT and RWDT with standard ESP-IDF/Arduino usage |
| USB Serial/JTAG | 🟡 | Serial TX output works. RX input not fully exposed |
| Bluetooth | ❌ | Not yet supported |
| PCNT | ❌ | Not yet supported |
| TWAI / CAN | ❌ | Not yet supported |

**Legend:**
- ✔️ Supported
- 🟡 Partial support
- ❌ Not yet supported

---

## Simulation Speed

To keep the simulation running in real time, Cirkit Designer limits the simulated CPU frequency. This does not affect peripheral timing — `millis()`, `delay()`, UART baud rates, and timer intervals all remain accurate. It only limits how fast instructions execute, which matters for compute-heavy loops.

| Setting | Description |
|---------|-------------|
| **8 MHz** (default) | Fastest simulation. Works for most projects |
| **16 MHz** | More instruction throughput for compute-heavy code |
| **Max** | Native hardware speed (240 MHz). Slowest simulation |

Most Arduino projects work well at the default 8 MHz setting. Only increase it if your code has tight computation loops where instruction throughput matters.

---

## Practical Limitations

- **WiFi requires open networks** — WPA2/WPA3 encryption is not supported. Use the virtual `CirkitWifi` access point (no password)
- **Timing may differ from real hardware** — crypto operations complete instantly, ADC conversions have no delay, and clock behavior is simplified. Most Arduino code is unaffected
- **No Bluetooth** — if your project requires BLE or classic Bluetooth, it cannot be simulated at this time
