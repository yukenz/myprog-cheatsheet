# User Manager


## List shell
```shell
cat /etc/shells
```

## adduser
```shell
adduser
```

## Check User Exist
```shell
less -S /etc/passwd
```

```shell
# List shell
grep '/bin/' /etc/shells

adduser

# List users
cat /etc/passwd

# Change Password
passwd $USER

# Modify whell
visudo

# Show member of groups
id -Gn vivek

# Add to group
pw groupmod wheel -m vivek

# list groups members
grep '^wheel' /etc/group

# delete user
rmuser $USER
```

## PW available command
```shell
pw user help
pw user add help
pw user del help
pw user mod help
pw group help
pw lock help
pw unlock help

# Example
## Add
pw user add -n softwareag -c "SoftwareAG" -d /home/softwareag -G wheel -m -s /usr/local/bin/zsh
## Remove
pw user del -n softwareag -r
```

### Explain user add
- pw user add : command
- -n softwareag #Login Name
- -c 'SoftwareAG' #Commend
- -d /home/softwareag # home dir
- -G wheel # additional group
- -m # Setup home
- -s /usr/local/bin/bash # Shell mode

