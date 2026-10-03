# Cyber-Physical Systems

Real-time control, networked control systems, system integration.

## Real-Time Control

### PID Controller

```c
typedef struct {
    float Kp, Ki, Kd;
    float integral;
    float prev_error;
    float output_min, output_max;
} pid_controller_t;

float pid_update(pid_controller_t *pid, float setpoint, 
                 float measurement, float dt) {
    float error = setpoint - measurement;
    
    // Proportional
    float P = pid->Kp * error;
    
    // Integral with anti-windup
    pid->integral += error * dt;
    float I = pid->Ki * pid->integral;
    
    // Derivative
    float D = pid->Kd * (error - pid->prev_error) / dt;
    pid->prev_error = error;
    
    // Output with saturation
    float output = P + I + D;
    if (output > pid->output_max) output = pid->output_max;
    if (output < pid->output_min) output = pid->output_min;
    
    return output;
}
```

## Networked Control Systems

- **Time-triggered:** Deterministic, scheduled communication
- **Event-triggered:** React to events, bandwidth efficient
- **CAN bus:** Robust, prioritized messaging
- **EtherCAT:** Real-time Ethernet for industrial control
- **TSN:** Time-Sensitive Networking for converged networks

## System Integration

- **Middleware:** ROS 2, DDS, SOME/IP
- **Real-time Linux:** PREEMPT_RT, Xenomai
- **Safety standards:** IEC 61508, ISO 26262
- **Communication:** MQTT, OPC UA, DDS
