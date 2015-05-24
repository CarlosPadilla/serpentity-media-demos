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

## Structure

This project uses the serpentity entity framework and is separated in
components, nodes and systems:

### Components

Components provide properties

* **Analyser** a node that provides an `analyser` object.
* **Configuration** a node that provides a `configuration` object.

### Nodes

Nodes are combinations of components

* **Analyser** a node consisting of only the `Analyser` component.
* **Configurable** a node consisting of only the `Configuration`
  component.
* **ConfigurableAnalyser** a node that has an `Analyser` and a
  `Configuration` component.

### Systems

Systems consume lists of nodes 

* **ConfigurationControls** maps gamepad to configurations
* **Fader** fades out fadable svg objects
* **FrequencyD3ClustererRenderer** renders clusters with d3
* **FrequencyD3Renderer** renders frequency points with d3
