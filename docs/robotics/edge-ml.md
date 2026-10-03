# Machine Learning at Edge

Neural networks, edge AI, model optimization, reinforcement learning.

## Neural Networks at Edge

### Model Optimization

- **Quantization:** FP32 → INT8 (4x smaller, faster)
- **Pruning:** Remove redundant weights
- **Knowledge distillation:** Train small model from large
- **Architecture search:** MobileNet, EfficientNet, TinyML

```c
// TensorFlow Lite Micro example
#include "tensorflow/lite/micro/micro_interpreter.h"

void run_inference(const float *input, float *output) {
    // Copy input to tensor
    memcpy(input_tensor->data.f, input, input_size);
    
    // Run inference
    interpreter->Invoke();
    
    // Copy output
    memcpy(output, output_tensor->data.f, output_size);
}
```

## Reinforcement Learning

- **Q-Learning:** Value-based, model-free
- **DQN:** Deep Q-Networks with experience replay
- **PPO:** Proximal Policy Optimization
- **SAC:** Soft Actor-Critic

## Edge AI Frameworks

| Framework | Platform | Size | Use Case |
|-----------|----------|------|----------|
| TFLite Micro | ARM Cortex-M | <100KB | Microcontrollers |
| ONNX Runtime | Cross-platform | <1MB | Edge devices |
| TVM | Cross-platform | Variable | Optimized inference |
| OpenVINO | Intel | <1MB | Intel hardware |
| TensorRT | NVIDIA | Variable | GPU acceleration |
