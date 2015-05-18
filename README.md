# serpentity-media-demos
Some demos with serpentity + several web media APIs

## Running

First install dependencies

```
bower install
```

Then load this in a browser. If you have python you can run the
following command from the project root:

```
python -m SimpleHttpServer
```

The demo will be available at `http://localhost:8000`

## Controller Mappings for PS4 Controller:

This demo is intended for use with a gamepad. It has been tested with a
PS4 controller (wired or bluetooth).

╳ = Toggle points
⃝ = Shuffle colors
△ = Reset colors
⃞ = Toggle colored background

R2 = Lock BG Color
L2 = Lock Cluster Color
(eg. Pressing R2+ ⃝  will only shuffle the foreground colors)

LS = Control cluster size
RS = Control cluster lifetime
