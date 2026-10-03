# Design Patterns

Observer, State Machine, Active Object patterns for embedded systems.

## Observer Pattern

```c
// Observer pattern for embedded systems
typedef struct {
    void (*update)(void *self, int event);
} observer_t;

#define MAX_OBSERVERS 8
static observer_t *observers[MAX_OBSERVERS];
static int observer_count = 0;

void observer_attach(observer_t *obs) {
    if (observer_count < MAX_OBSERVERS) {
        observers[observer_count++] = obs;
    }
}

void observer_notify(int event) {
    for (int i = 0; i < observer_count; i++) {
        observers[i]->update(observers[i], event);
    }
}
```

## State Machine Pattern

```c
// Hierarchical state machine
typedef enum {
    STATE_IDLE,
    STATE_RUNNING,
    STATE_PAUSED,
    STATE_ERROR
} state_t;

typedef struct {
    state_t current_state;
    void (*on_enter)(void);
    void (*on_exit)(void);
    void (*on_event)(int event);
} state_machine_t;

void state_machine_init(state_machine_t *sm, state_t initial) {
    sm->current_state = initial;
    if (sm->on_enter) sm->on_enter();
}

void state_machine_transition(state_machine_t *sm, state_t next) {
    if (sm->on_exit) sm->on_exit();
    sm->current_state = next;
    if (sm->on_enter) sm->on_enter();
}
```

## Active Object Pattern

- Encapsulates its own thread of execution
- Communicates via asynchronous messages
- Eliminates shared state problems
- Natural fit for event-driven systems
