# Prepare OS Connection

## Network Configuration

```shell
# Show HW
dladm show-link -o link

# Create Adapter
ipadm create-if e1000g0

# DHCP Configuration
ipadm create-addr -T dhcp e1000g0/v4

# Remove IP Address Object
ipadm delete-addr e1000g0/v4

# Manual Configuration
ipadm create-addr -T static -a 192.168.1.8/24 e1000g0/v4

# Route (Need Setup Every Restart)
route add default 192.168.1.1
# Permanent Option
route -p add default 192.168.1.1

# Check Route
route -p show
# Check Route
netstat -rn
```

## Resolver Configuration

/etc/nsswitch.conf

```text
hosts:      files dns
ipnodes:    files dns
```

/etc/resolv.conf

```text
domain example.com
nameserver 192.168.1.1
```

# Set Environment

## Install Package

```shell
# Install Package
pkg install zsh git wget curl vim zip unzip jdk

# Install OhMyZsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)>
```

# User and Access Management

## Enable SSH

```shell
# Enabling SSH
svcadm enable ssh
# Make sure SSH Started
svcs -l ssh
```

## User Add

```bash
# Create user with zsh
useradd -m -s /bin/zsh -yukenz
# Change Password
passwd yukenz
```

## Enable Sudo

```shell
# Uncomment Wheel
vim /etc/sudoers
# Creat group Wheel
groupadd wheel
# Put user to wheel
usermod -G wheel yukenz
```
