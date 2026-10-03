# Debugging Tools

Debug frameworks, memory debugging, real-time debugging, profiling.

## Debug Frameworks

### GDB + OpenOCD

```bash
# Start OpenOCD server
openocd -f interface/stlink.cfg -f target/stm32f4x.cfg

# Connect GDB
arm-none-eabi-gdb firmware.elf
(gdb) target remote :3333
(gdb) monitor reset halt
(gdb) load
(gdb) break main
(gdb) continue
```

### SEGGER J-Link

```bash
# JLinkGDBServer
JLinkGDBServer -device STM32F407VG -if SWD -speed 4000

# JLinkRTT for logging
JLinkRTTLogger -device STM32F407VG -if SWD -speed 4000
```

## Memory Debugging

```c
// Heap debugging wrapper
#ifdef DEBUG_HEAP
#define malloc(size) debug_malloc(size, __FILE__, __LINE__)
#define free(ptr) debug_free(ptr, __FILE__, __LINE__)

void* debug_malloc(size_t size, const char *file, int line) {
    void *ptr = _malloc(size);
    log_alloc(ptr, size, file, line);
    return ptr;
}
#endif
```

## Profiling

- **Cycle counting:** DWT cycle counter (ARM)
- **GPIO toggling:** Oscilloscope-based profiling
- **SWO/ITM:** Serial Wire Output for trace
- **RTOS trace:** FreeRTOS+Trace, SystemView
