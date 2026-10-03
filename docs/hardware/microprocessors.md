# Microprocessors & Microcontrollers

ARM Cortex-M, AVR, PIC architectures.

## Processor Architecture

### ARM Cortex-M Series

| Core | Features | Use Case |
|------|----------|----------|
| Cortex-M0+ | Low power, low cost | Simple control |
| Cortex-M3 | Medium performance | General purpose |
| Cortex-M4 | DSP, FPU | Signal processing |
| Cortex-M7 | High performance | Advanced applications |

### Memory Systems

- **Cache:** L1 instruction and data cache
- **RAM:** SRAM for volatile storage
- **ROM/Flash:** Non-volatile program storage
- **MMU/MPU:** Memory protection and virtual memory

### I/O Systems

```c
// GPIO configuration example (STM32)
void gpio_init(void) {
    // Enable clock for GPIOA
    RCC->AHB1ENR |= RCC_AHB1ENR_GPIOAEN;
    
    // Configure PA5 as output
    GPIOA->MODER &= ~(3 << (5 * 2));
    GPIOA->MODER |= (1 << (5 * 2));
    
    // Set output speed
    GPIOA->OSPEEDR |= (3 << (5 * 2));
}
```

## Interrupt Controllers

- **NVIC:** Nested Vectored Interrupt Controller (ARM)
- **Priority levels:** Configurable preemption priorities
- **Latency:** Deterministic interrupt response
