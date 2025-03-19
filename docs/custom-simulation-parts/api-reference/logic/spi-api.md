---
sidebar_position: 3
---

# SPI API

This guide explains how to use the SPI (Serial Peripheral Interface) API to simulate data exchanges between components. Components can function as **SPI Masters** or **SPI Slaves**.

---

## 1. Overview of SPI Communication

SPI (Serial Peripheral Interface) is a synchronous communication protocol typically involving one **Master** and one or more **Slaves**:

- **Master**: Generates the clock signal (SCK) and initiates data transfers.
- **Slave**: Responds to the Master's clock and data signals when selected.

Communication occurs over four main lines:

- **SCK (Clock)**: Synchronizes data transmission between Master and Slave.
- **MOSI (Master Out, Slave In)**: Line for data sent from Master to Slave.
- **MISO (Master In, Slave Out)**: Line for data sent from Slave to Master.
- **CS (Chip Select)**: Line used by the Master to select and activate a specific Slave device.

**Typical flow**:

1. The Master pulls **CS LOW** to activate and select a Slave for communication.
2. Data is clocked out on **MOSI** (from Master to Slave) and simultaneously clocked in on **MISO** (from Slave to Master).
3. When the data exchange is complete, the Master pulls **CS HIGH** to end the transaction, deselecting the Slave.

---

## 2. SPI API Overview

In Cirkit, you can register your component as an SPI Master or SPI Slave:

- **Master**: Responsible for generating the clock and sending data.
- **Slave**: Responds to incoming clock and data, and must watch CS transitions.

---

## 3. Creating an SPI Master

```typescript
createSPIMaster(
  sck: IPin,
  mosi: IPin,
  miso: IPin,
  spiMode?: number
): void
```

- **sck**: Clock pin (Master-driven).
- **mosi**: Data line from Master to Slave.
- **miso**: Data line from Slave to Master.
- **spiMode** (optional): SPI mode, default is 0.

Once created, the Master can transfer bytes:

```typescript
spiMasterTransfer(mosiByte: number): number
```

- **mosiByte**: The byte you want to transmit.
- **returns**: The byte read from MISO during the same clock cycle.

### Important Note about CS Pin

In Cirkit, it is the Master's responsibility to manage the **CS (Chip Select)** pin and pull it LOW at the start of data transfer between Master and Slave and release it HIGH at the end of data transfer.

### Example Master Usage

Here's how the SPI Master usage might look conceptually, including explicit CS pin handling for clarity:

```typescript
// Master pins setups
const sckPin = this.simulationAPI.pin.createDigitalOutputPin('SCK');
const mosiPin = this.simulationAPI.pin.createDigitalOutputPin('MOSI');
const misoPin = this.simulationAPI.pin.createInputPin('MISO');

this.simulationAPI.spi.createSPIMaster(sckPin, mosiPin, misoPin);

// Explicit CS pin for illustration purposes
const csPin = this.simulationAPI.pin.createDigitalOutputPin('CS');

// Pull CS LOW to start transaction
this.simulationAPI.pin.writeDigital(csPin, DigitalVoltageLevelEnum.LOW);

// SPI data transfers
const dataToSend = [0x12, 0x34, 0x56];
for (const byte of dataToSend) {
  const received = this.simulationAPI.spi.spiMasterTransfer(byte);
  console.log(`Master sent 0x${byte.toString(16)}, got 0x${received.toString(16)}`);
}

// Pull CS HIGH to end transaction
this.simulationAPI.pin.writeDigital(csPin, DigitalVoltageLevelEnum.HIGH);
```

---

## 4. Creating an SPI Slave

```typescript
createSPISlave(
  sck: IPin,
  mosi: IPin,
  miso: IPin,
  done: (buffer: Uint8Array, count: number) => void,
  spiMode?: number
): void
```

- **sck**: Clock input from Master.
- **mosi**: Data line (Master → Slave).
- **miso**: Data line (Slave → Master).
- **done**: Callback invoked when a transaction concludes (see below).
- **spiMode** (optional): SPI mode, defaults to 0.

### 4.1 SPI Slave Transaction Flow

The SPI Slave's transaction lifecycle revolves around the Chip Select (CS) pin controlled by the Master:

**Flow of a transaction:**

1. **Master pulls CS LOW**: Slave initiates a transaction by calling `spiSlaveStart(buffer, length)`, providing a buffer to hold incoming data and its maximum length.

2. **Master sends data**: Master clocks out data on MOSI. This data is stored into the provided buffer until:
   - The buffer is completely filled (length bytes received), **or**
   - The Master pulls CS HIGH, signaling the end of the transaction.

3. **Transaction concludes**:
   - When either of the above conditions is met, the `done` callback fires.
   - Inside the `done` callback, the Slave processes the received data.

4. **Check CS state**:
   - If CS is still LOW after processing the buffer, the Master intends to continue sending data. The Slave must again call `spiSlaveStart(buffer, length)` with a new or reused buffer to continue receiving data.
   - If CS is HIGH, the Master has ended the transfer. The Slave should call `spiSlaveStop()` to finalize the transaction. This action triggers the `done` callback one final time (potentially with zero bytes).

**Important**: Each call to `spiSlaveStart` is paired with one execution of the `done` callback. Calling `spiSlaveStop` also triggers the `done` callback, even if no new data has been received.

### 4.2 Example SPI Slave Implementation

Here is a clear example illustrating this flow:

```typescript
const sckPin = this.simulationAPI.pin.createInputPin('SCK');
const mosiPin = this.simulationAPI.pin.createInputPin('MOSI');
const misoPin = this.simulationAPI.pin.createDigitalOutputPin(
  /* pinName= */ 'MISO',
  /* highVoltage= */ 5,
  /* value= */ DigitalVoltageLevelEnum.LOW);
const csPin = this.simulationAPI.pin.createInputPin('CS');

const buffer = new Uint8Array(64);

this.simulationAPI.spi.createSPISlave(
  sckPin,
  mosiPin,
  misoPin,
  /* done= */ (receivedBuffer, count) => {
    console.log('SPI transaction complete. Received:', count, 'bytes');
    console.log('Data:', receivedBuffer.slice(0, count));

    if (this.simulationAPI.pin.readAnalog(csPin) < 2.5) {
      // CS is still LOW; master may send more data
      this.simulationAPI.spi.spiSlaveStart(receivedBuffer, receivedBuffer.length);
    }
  }
);

this.simulationAPI.pin.addDigitalPinWatch(csPin, EdgeEnum.Both, (pin, voltage) => {
  if (voltage < 2.5) {
    // CS LOW: begin transaction
    this.simulationAPI.spi.spiSlaveStart(buffer, buffer.length);
  } else {
    // CS HIGH: end transaction
    this.simulationAPI.spi.spiSlaveStop();
  }
});
```

### 4.3 Sending Data from Slave to Master

SPI communication is bidirectional: while the Master is sending data to the Slave on the **MOSI** line, the Slave simultaneously sends data back to the Master on the **MISO** line.

**How it works:**

- When the Master initiates a transfer (pulling CS LOW), the Slave calls `spiSlaveStart(buffer, length)`.
- The buffer provided to `spiSlaveStart` is **pre-filled** by the Slave with the data intended for the Master.
- As the Master sends bytes, the Slave simultaneously sends the prepared bytes from the buffer back to the Master.
- After the transaction concludes (buffer is exhausted or CS goes HIGH), the `done` callback triggers, allowing the Slave to process any received data and optionally prepare more data to send back.

In practice, the Slave may have predefined response data, computed data, or dynamically generated data depending on previous transactions or internal state. The buffer passed to `spiSlaveStart` should be filled accordingly before each SPI transaction begins.

**Example Implementation:**

Here's an example demonstrating how the Slave pre-fills the buffer to send data back to the Master:

```typescript
const sckPin = this.simulationAPI.pin.createInputPin('SCK');
const mosiPin = this.simulationAPI.pin.createInputPin('MOSI');
const misoPin = this.simulationAPI.pin.createDigitalOutputPin(
  /* pinName= */ 'MISO',
  /* highVoltage= */ 5,
  /* value= */ DigitalVoltageLevelEnum.LOW);
const csPin = this.simulationAPI.pin.createInputPin('CS');

// Example data that the Slave will send back
const slaveResponseData = new Uint8Array([0xAA, 0xBB, 0xCC]);

let responseIndex = 0;

this.simulationAPI.spi.createSPISlave(
  sckPin,
  mosiPin,
  misoPin,
  /* done= */ (receivedBuffer, count) => {
    console.log('SPI transaction complete. Received:', count, 'bytes');
    console.log('Data from Master:', receivedBuffer.slice(0, count));

    if (this.simulationAPI.pin.readAnalog(csPin) < 2.5) {
      // CS is still LOW: prepare next byte
      const buffer = new Uint8Array(1);
      buffer[0] = slaveResponseData[responseIndex % slaveResponseData.length];
      responseIndex += 1;

      this.simulationAPI.spi.spiSlaveStart(buffer, buffer.length);
    }
  }
);

this.simulationAPI.pin.addDigitalPinWatch(csPin, EdgeEnum.Both, (pin, voltage) => {
  if (voltage < 2.5) {
    // CS LOW: start transaction, send the first byte back
    responseIndex = 0;
    const buffer = new Uint8Array(1);
    buffer[0] = slaveResponseData[responseIndex];
    responseIndex += 1;

    this.simulationAPI.spi.spiSlaveStart(buffer, buffer.length);
  } else {
    // CS HIGH: end transaction
    this.simulationAPI.spi.spiSlaveStop();
  }
});
```

---

## 5. The `done` Callback

The `done` callback executes when:

1. The buffer you provided to `spiSlaveStart` is entirely filled.
2. Someone calls `spiSlaveStop`, ending the transaction.

It has the signature:

```typescript
(buffer: Uint8Array, count: number) => void
```

- **`buffer`**: The very same array passed to `spiSlaveStart()`. It holds any received bytes.
- **`count`**: The number of bytes actually transferred during this transaction (possibly less than the buffer length). If the transfer stopped mid-byte, `count` could be 0.

If CS remains LOW after `done` completes, you can call `spiSlaveStart()` again to continue receiving more data in a new buffer or reuse the same one.

---

