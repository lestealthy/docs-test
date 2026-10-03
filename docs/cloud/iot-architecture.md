# IoT Architecture

Device design, wireless communication, sensor networks, edge computing.

## IoT Device Design

### Wireless Protocols

| Protocol | Range | Data Rate | Power | Use Case |
|----------|-------|-----------|-------|----------|
| WiFi | 50m | High | High | Video, data |
| BLE | 10m | Medium | Low | Wearables, sensors |
| LoRaWAN | 15km | Low | Very Low | Agriculture, smart city |
| Zigbee | 100m | Low | Low | Home automation |
| NB-IoT | 10km | Low | Low | Industrial, metering |
| Thread | 100m | Low | Low | Home automation |

### Edge Computing

```c
// Edge processing example
void process_sensor_data(sensor_data_t *data) {
    // Filter noise locally
    float filtered = kalman_filter(data->raw_value);
    
    // Only send if significant change
    if (fabs(filtered - last_sent_value) > THRESHOLD) {
        send_to_cloud(filtered);
        last_sent_value = filtered;
    }
}
```

## Sensor Networks

- **Star topology:** All nodes connect to central hub
- **Mesh topology:** Nodes relay for each other
- **Tree topology:** Hierarchical clustering
- **Hybrid:** Combination of above
