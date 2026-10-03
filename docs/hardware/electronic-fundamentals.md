# Electronic Fundamentals

Circuit analysis, passive/active components, power electronics.

## Circuit Analysis & Design

### Ohm's Law

Ohm's Law is the fundamental relationship between voltage (V), current (I), and resistance (R):

$$V = I \times R$$

### Kirchhoff's Laws

**Kirchhoff's Current Law (KCL):** The sum of currents entering a node equals the sum of currents leaving it.

**Kirchhoff's Voltage Law (KVL):** The sum of voltages around any closed loop equals zero.

### Example: Voltage Divider

```c
// Calculate output voltage from a voltage divider
float voltage_divider(float v_in, float r1, float r2) {
    return v_in * (r2 / (r1 + r2));
}
```

## Passive Components

| Component | Symbol | Function |
|-----------|--------|----------|
| Resistor | R | Limits current, divides voltage |
| Capacitor | C | Stores energy in electric field |
| Inductor | L | Stores energy in magnetic field |
| Diode | D | Allows current in one direction |

## Active Components

- **Transistors:** BJT, MOSFET, IGBT
- **Operational Amplifiers:** Signal conditioning, amplification
- **Voltage Regulators:** Linear and switching

## Power Electronics

### Linear Regulators

Simple but inefficient. Dissipate excess power as heat:

$$P_{dissipated} = (V_{in} - V_{out}) \times I_{load}$$

### Switching Regulators

More efficient (85-95%), use PWM and energy storage:

- **Buck Converter:** Steps voltage down
- **Boost Converter:** Steps voltage up
- **Buck-Boost:** Can step up or down
