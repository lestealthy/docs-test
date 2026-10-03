# Embedded Hardware Design

PCB layout, power management, debugging.

## Board Design

### PCB Layout Best Practices

1. **Ground planes:** Use solid ground planes for signal integrity
2. **Decoupling capacitors:** Place near IC power pins
3. **Trace width:** Size for current capacity and impedance
4. **Via placement:** Minimize via stubs for high-speed signals

### Power Management

- **Power sequencing:** Ensure proper startup order
- **Brown-out detection:** Prevent erratic behavior during power dips
- **Low-power modes:** Sleep, stop, standby configurations

## Hardware Debugging

### Tools

- **Oscilloscope:** Signal analysis, timing measurements
- **Logic Analyzer:** Digital signal capture
- **JTAG/SWD:** In-circuit debugging
- **Multimeter:** Basic electrical measurements

### Techniques

```c
// Debug LED pattern for embedded systems
void debug_pattern(uint8_t code) {
    for (uint8_t i = 0; i < code; i++) {
        LED_ON();
        delay_ms(200);
        LED_OFF();
        delay_ms(200);
    }
    delay_ms(1000);
}
```
