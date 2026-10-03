# Real-Time Systems & RTOS

RTOS concepts, Zephyr, FreeRTOS, task scheduling.

## RTOS Fundamentals

### Task Scheduling

- **Preemptive:** Higher priority tasks interrupt lower ones
- **Cooperative:** Tasks yield voluntarily
- **Time-slicing:** Round-robin among equal priorities

### Zephyr RTOS

```c
// Zephyr task example
#include <zephyr/kernel.h>

#define STACK_SIZE 1024
#define PRIORITY 5

K_THREAD_STACK_DEFINE(my_stack_area, STACK_SIZE);
struct k_thread my_thread_data;

void my_thread(void *p1, void *p2, void *p3) {
    while (1) {
        // Task logic here
        k_sleep(K_MSEC(100));
    }
}

void main(void) {
    k_thread_create(&my_thread_data, my_stack_area,
                    K_THREAD_STACK_SIZEOF(my_stack_area),
                    my_thread, NULL, NULL, NULL,
                    PRIORITY, 0, K_NO_WAIT);
}
```

### FreeRTOS

```c
// FreeRTOS task example
void vTaskFunction(void *pvParameters) {
    for (;;) {
        // Task logic
        vTaskDelay(pdMS_TO_TICKS(100));
    }
}

void main(void) {
    xTaskCreate(vTaskFunction, "Task", 1000, NULL, 1, NULL);
    vTaskStartScheduler();
}
```

## Real-Time Design Patterns

- **Active Object:** Event-driven tasks with message queues
- **State Machine:** Hierarchical state charts
- **Observer:** Publish-subscribe for decoupled components
- **Guard:** Mutual exclusion for shared resources
