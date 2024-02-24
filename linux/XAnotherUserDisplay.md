# Using X Windows from another user

## Disable XHOST policy
```shell
xhost -
```

## Show Display Num
```shell
echo $DISPLAY
```

## Setup Display for Particular User
- Go Login for another user
- Setup Tunnel Display
```shell
export DISPLAY=:1
# Now run your program
```
