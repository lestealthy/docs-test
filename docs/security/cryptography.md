# Cryptography

Symmetric encryption, hash functions, data authentication.

## Symmetric Encryption

### AES (Advanced Encryption Standard)

```c
// AES-128 encryption example
#include <mbedtls/aes.h>

void aes_encrypt(const uint8_t *key, const uint8_t *input, 
                 uint8_t *output, size_t length) {
    mbedtls_aes_context aes;
    mbedtls_aes_init(&aes);
    mbedtls_aes_setkey_enc(&aes, key, 128);
    
    for (size_t i = 0; i < length; i += 16) {
        mbedtls_aes_crypt_ecb(&aes, MBEDTLS_AES_ENCRYPT, 
                              input + i, output + i);
    }
    
    mbedtls_aes_free(&aes);
}
```

## Hash Functions

| Algorithm | Output Size | Security Level | Use Case |
|-----------|-------------|----------------|----------|
| SHA-256 | 256 bits | High | General purpose |
| SHA-3 | Variable | High | Future-proof |
| BLAKE2b | 512 bits | Very High | High performance |
| MD5 | 128 bits | **Broken** | Legacy only |

## Data Authentication

- **HMAC:** Hash-based Message Authentication Code
- **CMAC:** Cipher-based MAC
- **GMAC:** Galois/Counter Mode MAC
- **Digital Signatures:** ECDSA, EdDSA
