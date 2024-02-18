# DDC Utility Guide

## Detect Display Number

```shell
ddcutil detect 
```

```text
Display 1
   I2C bus:  /dev/i2c-3
   EDID synopsis:
      Mfg id:               ACI - Ancor Communications Inc
      Model:                VC279
      Product code:         10180  (0x27c4)
      Serial number:        H5LMRS008827
      Binary serial number: 16843009 (0x01010101)
      Manufacture year:     2017,  Week: 18
   VCP version:         2.1
```

Known as Display 1 or (-d 1)

## Get All Register Value

```shell
ddcutil getvcp known -d 1
```

```text
VCP code 0x02 (New control value             ): No new control values (0x01)
VCP code 0x0b (Color temperature increment   ): 100 degree(s) Kelvin
VCP code 0x0c (Color temperature request     ): 3000 + 35 * (feature 0B color temp increment) degree(s) Kelvin
VCP code 0x0e (Clock                         ): current value = 54053, max value =   100
VCP code 0x10 (Brightness                    ): current value =    19, max value =   100
VCP code 0x12 (Contrast                      ): current value =    80, max value =   100
VCP code 0x14 (Select color preset           ): 6500 K (sl=0x05)
VCP code 0x16 (Video gain: Red               ): current value =   100, max value =   100
VCP code 0x18 (Video gain: Green             ): current value =   100, max value =   100
VCP code 0x1a (Video gain: Blue              ): current value =   100, max value =   100
VCP code 0x1e (Auto setup                    ): Auto setup not active (sl=0x00)
VCP code 0x1f (Auto color setup              ): Performing auto setup (sl=0x01)
VCP code 0x20 (Horizontal Position (Phase)   ): current value =    50, max value =   100
VCP code 0x30 (Vertical Position (Phase)     ): current value =    50, max value =   100
VCP code 0x3e (Clock phase                   ): current value =   111, max value =   100
VCP code 0x52 (Active control                ): Value: 0x62
VCP code 0x60 (Input Source                  ): DVI-1 (sl=0x03)
VCP code 0x62 (Audio speaker volume          ): current value =    50, max value =   100
VCP code 0x6c (Video black level: Red        ): current value =    50, max value =   100
VCP code 0x6e (Video black level: Green      ): current value =    50, max value =   100
VCP code 0x70 (Video black level: Blue       ): current value =    50, max value =   100
VCP code 0x7e (Trapezoid                     ): Maximum retries exceeded
VCP code 0x87 (Sharpness                     ): current value =     0, max value =   100
VCP code 0xac (Horizontal frequency          ): 1964 hz
VCP code 0xae (Vertical frequency            ): 60.00 hz
VCP code 0xb2 (Flat panel sub-pixel layout   ): Red/Green/Blue vertical stripe (sl=0x01)
VCP code 0xb6 (Display technology type       ): LCD (active matrix) (sl=0x03)
VCP code 0xc0 (Display usage time            ): Usage time (hours) = 13907 (0x003653) mh=0xff, ml=0xff, sh=0x36, sl=0x53
VCP code 0xc6 (Application enable key        ): 0x45cc
VCP code 0xc8 (Display controller type       ): Mfg: RealTek (sl=0x09), controller number: mh=0x00, ml=0x24, sh=0x87
VCP code 0xc9 (Display firmware level        ): 0.1
VCP code 0xca (OSD                           ): OSD Disabled (sl=0x01)
VCP code 0xcc (OSD Language                  ): English (sl=0x02)
VCP code 0xd6 (Power mode                    ): DPM: On,  DPMS: Off (sl=0x01)
VCP code 0xdf (VCP Version                   ): 2.1
```

## Get Specific Register Value

Example for audio :

```shell
ddcutil getvcp known -d 1 0x62
```

```text
VCP code 0x62 (Audio speaker volume          ): current value =    50, max value =   100
```

## Set/Write Register Value

Example for audio :

```shell
ddcutl setvcp -d 1 0x62 50
```