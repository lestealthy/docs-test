# Defensive Measures

Countermeasures, secure boot, memory protection, anti-tamper.

## Countermeasures

### Fault Injection Countermeasures

- **Redundant computation:** Execute critical operations multiple times
- **Random delays:** Insert random NOPs to desynchronize glitches
- **Voltage monitors:** Detect brown-out conditions
- **Clock monitors:** Detect clock glitching

### Secure Boot

```c
// Secure boot verification
bool verify_boot_image(const uint8_t *image, size_t len) {
    // 1. Verify signature
    if (!ecdsa_verify(image, len, public_key)) {
        return false;
    }
    
    // 2. Verify hash
    uint8_t hash[32];
    sha256(image, len, hash);
    if (memcmp(hash, expected_hash, 32) != 0) {
        return false;
    }
    
    // 3. Verify version (anti-rollback)
    if (get_image_version(image) < get_current_version()) {
        return false;
    }
    
    return true;
}
```

## Memory Protection

- **MPU (Memory Protection Unit):** Region-based access control
- **MMU (Memory Management Unit):** Virtual memory, page tables
- **TrustZone:** Secure/non-secure world separation
- **Stack canaries:** Buffer overflow detection
- **ASLR:** Address space layout randomization
