# Hardware Security

Hardware attacks, fault injection, side-channel analysis, power analysis.

## Hardware Attacks

### Fault Injection

- **Clock glitching:** Disrupt clock signal to skip instructions
- **Voltage glitching:** Brown-out to cause incorrect operation
- **EM pulses:** Electromagnetic interference
- **Laser injection:** Optical fault injection on die

### Side-Channel Analysis

```c
// Power analysis countermeasure example
void secure_compare(const uint8_t *a, const uint8_t *b, size_t len) {
    volatile uint8_t result = 0;
    
    // Constant-time comparison
    for (size_t i = 0; i < len; i++) {
        result |= a[i] ^ b[i];
    }
    
    // Use result to prevent optimization
    if (result != 0) {
        // Handle mismatch
    }
}
```

## Power Analysis

- **SPA (Simple Power Analysis):** Direct interpretation of power traces
- **DPA (Differential Power Analysis):** Statistical analysis of multiple traces
- **CPA (Correlation Power Analysis):** Correlation with power models
- **EMA (Electromagnetic Analysis):** EM emissions analysis
