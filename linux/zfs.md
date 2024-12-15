# ZFS Usage

## Overview

Benefit :

- ZFS kombinasi FS dan LVM
- Proteksi data corruption
- Storage up to 256 ZiB
- Snapshoot

VDEVS adalah meta-device yang berupa satu atau lebih device
zpool terdiri dari koleksi VDEVS

## Ubuntu Package

```shell
# Install Package
sudo apt install zfsutils-linux

# Find usage
whereis zfs
```

## Pool Type Creation

zpool create [pool name] [*mirror/stripe] ...[devices]

Invalid vdev : Using -f option

```shell
# striped pool | RAID-0 | capacity 2x | Fault Untolerance
sudo zpool create new-pool /dev/sdd

# mirrored pool | RAID-1 | capacity single | Fault Tolerance
sudo zpool create new-pool mirror /dev/sdb /dev/sdc

# Add physical to Pool
sudo zpool add /dev/sdd
```

## Zpool Utils

```shell
# Create vdev by file img
dd if=/dev/zero of=example.img bs=1M count=2048

# Status check
sudo zpool status new-pool

# Destroy or delete
sudo zpool destroy new-poo
```

## Mount

```shell
# Set mount point
zfs set mountpoint=/opt/softwareag webmethods

# Get mount point
zfs get mountpoint new-pool

# Live mout all
zfs mount -a

# Mount state
zfs mount

```