---
sidebar_position: 4
---

# Timer API

The Timer API allows you to create and manage timers within your components. Timers are useful for scheduling actions or events at specified intervals or after certain delays in simulation time.

This API allows you to:

- **Create timers** for scheduling callbacks.
- **Start and stop timers** as needed.
- **Get the current simulation time**.

---

## API Methods Reference & Examples

### Creating Timers

#### `createTimer(callback: () => void): ITimer`

Creates a new timer that triggers a callback when executed.

- `callback` *(function)*: The function executed when the timer triggers.

```typescript
const timer = this.simulationAPI.timer.createTimer(() => {
  console.log('Timer executed');
});
```

### Starting Timers

#### `startTimer(timer: ITimer, intervalMicros: number, repeat: boolean): void`

Starts the timer to execute after a given interval.

- `timer` *(ITimer)*: The timer object to start.
- `intervalMicros` *(number)*: Interval in microseconds before triggering the callback.
- `repeat` *(boolean)*: Whether the timer repeats (`true`) or executes only once (`false`).

```typescript
// Start timer to execute callback every 1 second (1,000,000 microseconds)
this.simulationAPI.timer.startTimer(timer, 1_000_000, true);
```

### Stopping Timers

#### `stopTimer(timer: ITimer): void`

Stops a running timer.

- `timer` *(ITimer)*: The timer object to stop.

```typescript
this.simulationAPI.timer.stopTimer(timer);
```

### Getting Current Simulation Time

#### `getCurrentTimeNanos(): bigint`

Returns the current simulation time in nanoseconds.

```typescript
const currentTime = this.simulationAPI.timer.getCurrentTimeNanos();
console.log(`Current simulation time: ${currentTime} ns`);
```

---

## Example Usage

Below is an example of creating a repeating timer that triggers every 500 milliseconds:

```typescript
// Create a repeating timer that triggers every 500 ms
const repeatingTimer = this.simulationAPI.timer.createTimer(() => {
  console.log('500ms timer event');
});

// Start timer
this.simulationAPI.timer.startTimer(repeatingTimer, 500_000, true);

// Stop timer after some condition
// this.simulationAPI.timer.stopTimer(repeatingTimer);
```

---
