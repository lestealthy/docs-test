# Embedded Programming

C programming, memory management, interrupt service routines.

## C Programming for Embedded

### Memory Management

```c
// Memory pool implementation
#define POOL_SIZE 1024
#define BLOCK_SIZE 32

static uint8_t memory_pool[POOL_SIZE];
static bool block_used[POOL_SIZE / BLOCK_SIZE];

void* pool_alloc(size_t size) {
    if (size > BLOCK_SIZE) return NULL;
    
    for (int i = 0; i < POOL_SIZE / BLOCK_SIZE; i++) {
        if (!block_used[i]) {
            block_used[i] = true;
            return &memory_pool[i * BLOCK_SIZE];
        }
    }
    return NULL;
}

void pool_free(void* ptr) {
    if (ptr == NULL) return;
    
    int index = ((uint8_t*)ptr - memory_pool) / BLOCK_SIZE;
    if (index >= 0 && index < POOL_SIZE / BLOCK_SIZE) {
        block_used[index] = false;
    }
}
```

### Interrupt Service Routines

```c
// Best practices for ISRs
void TIM2_IRQHandler(void) {
    // 1. Clear interrupt flag
    TIM2->SR &= ~TIM_SR_UIF;
    
    // 2. Keep it short!
    // 3. Use volatile for shared variables
    // 4. Avoid blocking calls
    
    g_tick_count++;
}
```

## Programming Paradigms

- **Superloop:** Simple foreground/background
- **RTOS-based:** Preemptive multitasking
- **Event-driven:** State machines, callbacks
- **Dataflow:** Pipes, streams, queues
