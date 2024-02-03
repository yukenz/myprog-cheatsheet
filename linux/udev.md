# Setup Udev access ddcutil for NonRoot

<!-- TOC -->
* [Setup Udev access ddcutil for NonRoot](#setup-udev-access-ddcutil-for-nonroot)
  * [Create Group DDC](#create-group-ddc)
  * [Check I2C Bus](#check-i2c-bus)
  * [Check Udev PCI Path](#check-udev-pci-path)
  * [Get Mandatory Variable](#get-mandatory-variable)
  * [Add Udev Rules](#add-udev-rules)
  * [Test Rules before reload](#test-rules-before-reload)
  * [Probing and Reload](#probing-and-reload)
  * [Listing](#listing)
<!-- TOC -->

## Create Group DDC

```shell
groupadd ddc
```

## Check I2C Bus

```shell
ddcutil detect
```

## Check Udev PCI Path

```shell
udevadm info -q path -n /dev/i2c-4
```

## Get Mandatory Variable

```shell
udevadm info -a -p $(udevadm info -q path -n /dev/i2c-4)
```

***Filtering Result :***

```text
looking at device '/devices/pci0000:00/0000:00:01.0/0000:01:00.0/i2c-4/i2c-dev/i2c-4':
KERNEL=="i2c-4"
SUBSYSTEM=="i2c-dev"
DRIVER==""
ATTR{name}=="nvkm-0000:01:00.0-bus-0006"
ATTR{power/control}=="auto"
ATTR{power/runtime_active_time}=="0"
ATTR{power/runtime_status}=="unsupported"
ATTR{power/runtime_suspended_time}=="0"

looking at parent device '/devices/pci0000:00/0000:00:01.0/0000:01:00.0/i2c-4':
KERNELS=="i2c-4"
SUBSYSTEMS=="i2c"
DRIVERS==""
ATTRS{delete_device}=="(not readable)"
ATTRS{name}=="nvkm-0000:01:00.0-bus-0006"
ATTRS{new_device}=="(not readable)"
```

## Add Udev Rules

```shell
vim /etc/udev/rules.d/98-ddc.rules
```

```text
KERNEL=="i2c-4", SUBSYSTEM=="i2c-dev", GROUP="ddc", MODE="0660"
```

## Test Rules before reload

```shell
udevadm test /dev/i2c-4
```

## Probing and Reload

```shell
modprobe -r i2c-dev
udevadm control --reload-rules && udevadm trigger
modprobe i2c-dev
```

## Listing

```shell
ls -l /dev | grep i2c
```

Result should ddc group :

```text
# ls -allh /dev/i2c*                                                                                             [7:35:51]
crw-rw----. 1 root ddc 89, 0 Feb  3 07:35 /dev/i2c-0
crw-rw----+ 1 root ddc 89, 1 Feb  3 07:35 /dev/i2c-1
crw-rw----+ 1 root ddc 89, 2 Feb  3 07:35 /dev/i2c-2
crw-rw----+ 1 root ddc 89, 3 Feb  3 07:35 /dev/i2c-3
crw-rw----+ 1 root ddc 89, 4 Feb  3 07:35 /dev/i2c-4
crw-rw----+ 1 root ddc 89, 5 Feb  3 07:35 /dev/i2c-5
crw-rw----+ 1 root ddc 89, 6 Feb  3 07:35 /dev/i2c-6
```
