# Unit Testing

Embedded test frameworks, mock objects, test automation.

## Test Frameworks

### Unity (C)

```c
// Unity test example
#include "unity.h"

void setUp(void) {
    // Called before each test
}

void tearDown(void) {
    // Called after each test
}

void test_addition(void) {
    TEST_ASSERT_EQUAL(4, add(2, 2));
    TEST_ASSERT_EQUAL(0, add(-2, 2));
}

void test_multiplication(void) {
    TEST_ASSERT_EQUAL(6, multiply(2, 3));
    TEST_ASSERT_EQUAL(0, multiply(0, 100));
}

int main(void) {
    UNITY_BEGIN();
    RUN_TEST(test_addition);
    RUN_TEST(test_multiplication);
    return UNITY_END();
}
```

### Google Test (C++)

```cpp
#include <gtest/gtest.h>

TEST(CalculatorTest, Addition) {
    EXPECT_EQ(4, Calculator::add(2, 2));
    EXPECT_EQ(0, Calculator::add(-2, 2));
}

TEST(CalculatorTest, Multiplication) {
    EXPECT_EQ(6, Calculator::multiply(2, 3));
    EXPECT_EQ(0, Calculator::multiply(0, 100));
}
```

## Mock Objects

- **Function pointers:** Replace dependencies with mocks
- **Linker wrapping:** `--wrap` flag for mocking
- **CMock:** Automatic mock generation from headers
- **Fake functions:** Lightweight test doubles
