# Robotics Fundamentals

Robot kinematics, sensor fusion, control systems, path planning.

## Robot Kinematics

### Forward Kinematics

```c
// 2-DOF planar arm forward kinematics
typedef struct {
    float theta1, theta2;  // Joint angles
    float l1, l2;          // Link lengths
} arm_config_t;

void forward_kinematics(const arm_config_t *config, 
                        float *x, float *y) {
    *x = config->l1 * cos(config->theta1) + 
         config->l2 * cos(config->theta1 + config->theta2);
    *y = config->l1 * sin(config->theta1) + 
         config->l2 * sin(config->theta1 + config->theta2);
}
```

### Inverse Kinematics

- **Analytical:** Closed-form solution (when possible)
- **Numerical:** Jacobian-based iterative methods
- **Optimization:** Minimize error with constraints

## Sensor Fusion

### Kalman Filter

```c
// Simple Kalman filter for position estimation
typedef struct {
    float x[2];      // State [position, velocity]
    float P[2][2];   // Error covariance
    float Q[2][2];   // Process noise
    float R;         // Measurement noise
} kalman_t;

void kalman_predict(kalman_t *kf, float dt) {
    // State transition
    kf->x[0] += kf->x[1] * dt;
    
    // Covariance prediction
    kf->P[0][0] += dt * (kf->P[1][0] + kf->P[0][1] + dt * kf->P[1][1]) + kf->Q[0][0];
    kf->P[0][1] += dt * kf->P[1][1];
    kf->P[1][0] += dt * kf->P[1][1];
    kf->P[1][1] += kf->Q[1][1];
}
```

## Control Systems

- **PID Control:** Proportional-Integral-Derivative
- **State-space control:** Modern control theory
- **Model Predictive Control:** Optimization-based control
- **Adaptive control:** Self-tuning parameters
