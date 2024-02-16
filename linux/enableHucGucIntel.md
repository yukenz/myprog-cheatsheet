# How To Enable Intel Guc/Huc Firmware

## Create File
/etc/modprobe.d/i915.conf

## Enter Text
```text
options i915 enable_guc=2
```

## Check Info
```shell
cat /sys/kernel/debug/dri/0/gt/uc/guc_info
cat /sys/kernel/debug/dri/0/gt/uc/huc_info
```

## Source
https://wiki.archlinux.org/title/intel_graphics