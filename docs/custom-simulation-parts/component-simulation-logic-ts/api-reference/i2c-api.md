---
sidebar_position: 3
---

# I2C API

The I2C API allows you to define and implement I2C communication behavior for your components. Components can function as either masters, initiating communication, or slaves, responding to communication requests. The API provides a straightforward way to set up and interact over an I2C bus.

This API allows you to:

- **Create I2C Slave devices** (components that respond to an I2C master).
- **Create I2C Master devices** (components that initiate communication with slave devices).
- **Handle data transmission and reception** between I2C masters and slaves.

---

## API Methods Reference & Examples

### Creating I2C Devices

#### `createI2CSlave(address: number, sclPin: IPin, sdaPin: IPin, callbacks: I2CSlaveCallbacks): void`

Creates an I2C slave device that responds to communication initiated by an I2C master.

- `address` *(number)*: The unique 7-bit I2C address of this slave device.
- `sclPin` *(IPin)*: Pin used for the I2C clock signal.
- `sdaPin` *(IPin)*: Pin used for data transmission and reception.
- `callbacks` *(I2CSlaveCallbacks)*: Callbacks triggered on I2C events.

```typescript
this.simulationAPI.i2c.createI2CSlave(
  /* address= */ 0x3C,
  /* sclPin= */ sclPin,
  /* sdaPin= */ sdaPin,
  /* callbacks= */ {
    connect: (address, isWriteMode) => {
      console.log(`Connected to master at address: ${address}, Write mode: ${isWriteMode}`);
      return true; // Accept connection
  },
  writeByte: (data: number) => {
    console.log(`Data received from master: ${data}`);
    return true; // Acknowledge byte
  },
  readByte: () => {
    const byteToSend = 0x00;
    console.log(`Sending data to master: ${byteToSend}`);
    return byteToSend;
  },
  disconnect: () => {
    console.log('Master disconnected');
  },
);
```

#### `createI2CMaster(sclPin: IPin, sdaPin: IPin, registerI2CSlave: (config: I2CSlaveConfig) => boolean): void`

Creates an I2C master device that initiates communication with registered slave devices.

- `sclPin` *(IPin)*: Pin used for the SCL (clock).
- `sdaPin` *(IPin)*: Pin used for SDA (data).
- `registerI2CSlave` *(function)*: Function to register slave devices with the master.

```typescript
this.simulationAPI.i2c.createI2CMaster(
  /* sclPin= */ sclPin,
  /* sdaPin= */ sdaPin,
  /* registerI2CSlave= */ (slaveConfig: I2CSlaveConfig) => {
    // Register slave component with the master
    return this.simulationAPI.registerI2CSlave(slaveConfig);
  }
);
```


---

## Callback Definitions Explained

The `I2CSlaveCallbacks` define how your component responds during I2C communication events:

- **`connect`** `(address: number, isWriteMode: boolean) => boolean`: 
  Triggered when the I2C master initiates communication. Returning `true` accepts the connection, while returning `false` rejects it.

- **`writeByte`** `(data: number) => boolean`:  
  Invoked whenever the master sends a byte to the slave. Returning `true` acknowledges receipt of the byte.

- **`readByte`** `() => number`:  
  Called when the master requests data from the slave. Your implementation should return the byte you want to send back to the master.

- **`disconnect`** `() => void` *(optional)*:  
  Executed when the I2C master terminates communication with your slave component.

### Example Callback Implementation:

```typescript
const callbacks: I2CSlaveCallbacks = {
  connect: (address, isWriteMode) => {
    console.log(`Master connected to address ${address}. Write mode: ${isWriteMode}`);
    return true;
  },
  writeByte: (data) => {
    console.log(`Byte received from master: ${data}`);
    return true;
  },
  readByte: () => {
    const dataToSend = 0x42;
    console.log(`Sending byte to master: ${dataToSend}`);
    return dataToSend;
  },
  disconnect: () => {
    console.log(`Master disconnected.`);
  },
};
```

---

## Interfaces

### `I2CSlaveCallbacks`

Defines callback methods for I2C slave interactions:

```typescript
interface I2CSlaveCallbacks {
  connect: (address: number, isWriteMode: boolean) => boolean;
  writeByte: (data: number) => boolean;
  readByte: () => number;
  disconnect?: () => void;
}
```

---

## Example Usage

Below is a simple example of registering an OLED display as an I2C slave device:

```typescript
// Initialize SCL and SDA pins
const sclPin = this.simulationAPI.pin.createInputPin('SCK');
const sdaPin = this.simulationAPI.pin.createInputPin('SDA');

// Create I2C slave
this.simulationAPI.i2c.createI2CSlave(
  0x3C, sclPin, sdaPin, {
    connect: (address, isWriteMode) => {
      console.log(`Connected to ${address}, Write mode: ${isWriteMode}`);
      return true;
    },
    writeByte: (data) => {
      console.log(`Byte received: ${data}`);
      return true;
    },
    readByte: () => {
      console.log('Master reading byte');
      return 0x00;
    },
    disconnect: () => {
      console.log(`Disconnected.`);
    }
  }
);
```

---















