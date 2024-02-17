# DKMS Usage / Panduan DKMS

## DKMS Status

Untuk mengetahui modul DKMS yang sudah terinstall pada setiap kernel

```shell
dkms status
```

## Kernel Version Naming

```shell
ls -allh /boot/vm*
```

```text
-rwxr-xr-x. 1 root root 13M Jan  7 08:57 /boot/vmlinuz-0-rescue-8efd6937b5fc4ab1befb012c831e3d49
-rwxr-xr-x. 1 root root 13M Jan  4 03:59 /boot/vmlinuz-5.14.0-362.18.1.el9_3.x86_64
-rwxr-xr-x. 1 root root 13M Oct  3 23:01 /boot/vmlinuz-5.14.0-362.8.1.el9_3.x86_64
-rwxr-xr-x. 1 root root 13M Feb 17 03:03 /boot/vmlinuz-6.1.78-1.el9.elrepo.x86_64
-rwxr-xr-x. 1 root root 14M Jan  5 07:00 /boot/vmlinuz-6.6.10-200.fc39.x86_64
-rw-------. 1 root root 42M Jan  5 07:00 /boot/vmlinuz-virt.efi-6.6.10-200.fc39.x86_64
```

Ambil text dibelakang prefix vmlinuz-**kernel_naming**

## Download Kernel Module

```shell
git clone "https://github.com/lwfinger/rtl8xxxu.git" /usr/src/rtl8xxxu-latest
```

Lokasi untuk kmod ada di **/usr/src/**

Format penamaannya adalah nama_module-versi_module

## Installation DKMS kmod

```shell
dkms install -m rtl8xxxu -v latest -k 6.1.78-1.el9.elrepo.x86_64
```

## Uninstall DKMS kmod

```shell
dkms uninstall -m rtl8xxxu -v latest -k 6.1.78-1.el9.elrepo.x86_64
```

## DKMS Installed in kmod dir

DKMS akan terinstall di folder kenel

**/lib/modules/6.1.78-1.el9.elrepo.x86_64/extra/**

## DKMS Result Build Dir

DKMS akan terbuild di folder var

**/var/lib/dkms/rtl8xxxu**

## Module Conflict Blacklist

Jika module yang kamu install mengalami konflik contohnya nouveau dan r8188eu yang berkonflik dengan nvidia dan
rtl8xxxu.

Maka wajib hukumnya untuk diblacklist melalui GRUB kernel loader dengan args

```text
module_blacklist=nouveau,r8188eu
```