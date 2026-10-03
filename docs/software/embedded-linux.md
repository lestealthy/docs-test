# Embedded Linux

Yocto Project, BitBake, kernel development, device drivers.

## Yocto Project

### BitBake Recipes

```bitbake
# Example recipe: hello-world.bb
SUMMARY = "Simple Hello World application"
LICENSE = "MIT"
LIC_FILES_CHKSUM = "file://${COMMON_LICENSE_DIR}/MIT;md5=0835ade698e0bcf8506ecda3f270f3a3"

SRC_URI = "file://hello.c"

S = "${WORKDIR}"

do_compile() {
    ${CC} ${CFLAGS} ${LDFLAGS} hello.c -o hello
}

do_install() {
    install -d ${D}${bindir}
    install -m 0755 hello ${D}${bindir}
}
```

### Custom Layers

```
meta-custom/
├── conf/
│   └── layer.conf
├── recipes-core/
│   └── hello-world/
│       ├── hello-world.bb
│       └── files/
│           └── hello.c
└── recipes-kernel/
    └── linux/
        └── linux-custom_%.bbappend
```

## Cross-Compilation

```bash
# Set up Yocto environment
source poky/oe-init-build-env build

# Build image
bitbake core-image-minimal

# Build SDK
bitbake -c populate_sdk core-image-minimal
```

## Driver Development

```c
// Simple character device driver
#include <linux/module.h>
#include <linux/fs.h>
#include <linux/cdev.h>

static int __init mydriver_init(void) {
    // Register device
    return 0;
}

static void __exit mydriver_exit(void) {
    // Unregister device
}

module_init(mydriver_init);
module_exit(mydriver_exit);
MODULE_LICENSE("GPL");
```
