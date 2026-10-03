# Cloud Integration

Cloud connectivity, data management, API design, protocols.

## Cloud Connectivity

### MQTT Protocol

```c
// MQTT publish example
void mqtt_publish_temperature(float temp) {
    char payload[32];
    snprintf(payload, sizeof(payload), "{\"temp\": %.2f}", temp);
    
    mqtt_client_publish(client, "sensors/temperature", 
                         payload, strlen(payload), 
                         MQTT_QOS_1, false);
}
```

### RESTful APIs

```c
// HTTP POST example using libcurl
CURL *curl = curl_easy_init();
if (curl) {
    curl_easy_setopt(curl, CURLOPT_URL, "https://api.example.com/data");
    curl_easy_setopt(curl, CURLOPT_POSTFIELDS, "{\"value\": 42}");
    
    struct curl_slist *headers = NULL;
    headers = curl_slist_append(headers, "Content-Type: application/json");
    curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
    
    CURLcode res = curl_easy_perform(curl);
    curl_easy_cleanup(curl);
}
```

## Data Management

- **Time-series databases:** InfluxDB, TimescaleDB
- **Stream processing:** Apache Kafka, AWS Kinesis
- **Data lakes:** S3, Azure Data Lake
- **Edge caching:** Redis, local SQLite
