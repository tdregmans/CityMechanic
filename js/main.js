/**
 * CityMechanic
 * main.js
 * version: 1.0
 * 
 * Author: Thijs Dregmans
 * Last edited: 2024-01-02
 * 
 * See README.md for more information.
 */

// define canvas and context
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// define time constants
const d = new Date();
let time = d.getTime();

// Get the canvas dimensions
let width = canvas.offsetWidth; // Width of the scene
let height = canvas.offsetHeight; // Height of the scene

const tileTypes = ["DarkBlue", "DarkGray", "Cyan", "LawnGreen", "Tomato", "Yellow"];
const playModes = ["Unlimited", "Scarce"];

// build penmode selection
for(tileTypeId = 0; tileTypeId < tileTypes.length; tileTypeId++) {
  var tileColor = tileTypes[tileTypeId];
  document.getElementById("pen-mode").innerHTML += "<label for='"+tileColor+"'> <input type='radio' name='pen' class='"+tileColor+"' id='"+tileColor+"' value='"+tileColor+"'/> <svg height='40' width='40'> <circle cx='20' cy='20' r='15' stroke='black' stroke-width='1' /> </svg> </label>";
}

const timeoutSeconds = 5;

var playMode = 0;

class Grid {
  constructor(tileSize, noOfTiles) {
      this.grid = [];
      this.tileSize = tileSize;
      this.noOfTiles = noOfTiles;

      this.fillGrid()
  }

  fillGrid() {
    for (let x = 0; x < this.noOfTiles; x++) {
      let row = [];
      for (let y = 0; y < this.noOfTiles; y++) {
        let randomType = Math.floor(Math.random() * (Object.getOwnPropertyNames(tileTypes).length - 1));
        row.push(randomType);
      } 
      this.grid.push(row);
    } 
  }

  draw() {
    for (let x = 0; x < this.noOfTiles; x++) {
      let row = this.grid[x];
      for (let y = 0; y < this.noOfTiles; y++) {
        drawTile(x, y, tileTypes[row[y]]);
      }
    } 
  }
  
  updateTileType(x, y, color) {
    this.grid[x][y] = color;
  }

  getColor(x, y) {
    return this.grid[x][y];
  }

  getAmountOfColor(color) {
    var count = 0;

    for (let x = 0; x < this.noOfTiles; x++) {
      let row = this.grid[x];
      for (let y = 0; y < this.noOfTiles; y++) {
        if (this.getColor(x, y) == color) {
          count += 1;
        }
      }
    }
    return count;
  }
}

const tileSize = 40;
const noOfTiles = 10;
var grid = new Grid(tileSize, noOfTiles);

const gridWidth = tileSize * noOfTiles;
const gridHeight = tileSize * noOfTiles;


function drawTile(xIndex, yIndex, color) {
  const startX = (width - gridWidth) / 2;
  const startY = (height - gridHeight) / 2;
  const x = (xIndex * tileSize) + startX;
  const y = (yIndex * tileSize) + startY;

  ctx.fillStyle = color;
  ctx.fillRect(x, y, tileSize, tileSize );

}

function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  return ({"x": x, "y": y});
}

function getTileIndex(x, y) {
  const startX = (width - gridWidth) / 2;
  const startY = (height - gridHeight) / 2;

  let xIndex = Math.floor((x - startX) / tileSize);
  let yIndex = Math.floor((y - startY) / tileSize);

  return ({"xIndex": xIndex, "yIndex": yIndex});
}

function getColor(value) {
  // value from 0 to 1
  var hue = ((1 - value) * 120).toString(10);
  return ["hsl(",hue,",100%,50%)"].join("");
}

function getColorValueFromRange(value, range) {
  // value = 10
  // range = [-10, 10]
  var delta = range[1] - range[0]; // 20
  if (value <= range[0]) {
    
  }
  return value / delta;
}

// Indicators
var EcologicalFootprintIndicatorValue = 0;
var NoOfResidentsIndicatorValue = 0;
var AverageTravelSpeedIndicatorValue = 0;
var EfficencyIndicatorValue = 0;
var LoveOfNatureIndicatorValue = 0;
var GdpPerCaptiaIndicatorValue = 0;
var PercievedFreedomIndicatorValue = 0;

const EcologicalFootprintIndicatorValueRange = [-10, 10];
const NoOfResidentsIndicatorValueRange = [-10, 10];
const AverageTravelSpeedIndicatorValueRange = [-10, 10];
const EfficencyIndicatorValueRange = [-10, 10];
const LoveOfNatureIndicatorValueRange = [-10, 10];
const GdpPerCaptiaIndicatorValueRange = [-10, 10];
const PercievedFreedomIndicatorValueRange = [-10, 10];

function updateIndicatorValues() {
  EcologicalFootprintIndicatorValue = grid.getAmountOfColor(2) + grid.getAmountOfColor(3) - (grid.getAmountOfColor(1) + grid.getAmountOfColor(5));
  NoOfResidentsIndicatorValue = grid.getAmountOfColor(4);
  AverageTravelSpeedIndicatorValue = grid.getAmountOfColor(1);
  EfficencyIndicatorValue = grid.getAmountOfColor(1) + grid.getAmountOfColor(0) + grid.getAmountOfColor(5);
  LoveOfNatureIndicatorValue = grid.getAmountOfColor(3);
  GdpPerCaptiaIndicatorValue = (grid.getAmountOfColor(0) * 2) + grid.getAmountOfColor(5);
  PercievedFreedomIndicatorValue = grid.getAmountOfColor(3) - (grid.getAmountOfColor(0) + grid.getAmountOfColor(1));

  document.getElementById("EcologicalFootprintIndicatorValue").innerHTML = EcologicalFootprintIndicatorValue;
  document.getElementById("NoOfResidentsIndicatorValue").innerHTML = NoOfResidentsIndicatorValue;
  document.getElementById("AverageTravelSpeedIndicatorValue").innerHTML = AverageTravelSpeedIndicatorValue;
  document.getElementById("EfficencyIndicatorValue").innerHTML = EfficencyIndicatorValue;
  document.getElementById("LoveOfNatureIndicatorValue").innerHTML = LoveOfNatureIndicatorValue;
  document.getElementById("GdpPerCaptiaIndicatorValue").innerHTML = GdpPerCaptiaIndicatorValue;
  document.getElementById("PercievedFreedomIndicatorValue").innerHTML = PercievedFreedomIndicatorValue;


  document.getElementById("EcologicalFootprintIndicatorValue").style.backgroundColor = getColor(getColorValueFromRange(EcologicalFootprintIndicatorValue, EcologicalFootprintIndicatorValueRange));
  document.getElementById("NoOfResidentsIndicatorValue").style.backgroundColor = getColor(getColorValueFromRange(NoOfResidentsIndicatorValue, NoOfResidentsIndicatorValueRange));
  document.getElementById("AverageTravelSpeedIndicatorValue").style.backgroundColor = getColor(getColorValueFromRange(AverageTravelSpeedIndicatorValue, AverageTravelSpeedIndicatorValueRange));
  document.getElementById("EfficencyIndicatorValue").style.backgroundColor = getColor(getColorValueFromRange(EfficencyIndicatorValue, EfficencyIndicatorValueRange));
  document.getElementById("LoveOfNatureIndicatorValue").style.backgroundColor = getColor(getColorValueFromRange(LoveOfNatureIndicatorValue, LoveOfNatureIndicatorValueRange));
  document.getElementById("GdpPerCaptiaIndicatorValue").style.backgroundColor = getColor(getColorValueFromRange(GdpPerCaptiaIndicatorValue, GdpPerCaptiaIndicatorValueRange));
  document.getElementById("PercievedFreedomIndicatorValue").style.backgroundColor = getColor(getColorValueFromRange(PercievedFreedomIndicatorValue, PercievedFreedomIndicatorValueRange));
}

let active = false;

var timer = 0;
var timeout = 0;

function updateTimer() {
  timer += 1;
  document.getElementById("ClockValue").innerHTML = timer;
}

function updateTimeout(reset = false) {
  console.log(timeout);
  if (reset) {
    timeout = timeoutSeconds;
    TimeoutVar = setInterval(updateTimeout, 1000, false);
    document.getElementById("timeout").innerHTML = "Timeout: <i class='indicator-value' id='timeoutValue' style='background-color: black;'></i>";
    document.getElementById("timeoutValue").innerHTML = timeout;
  }
  else {
    if (timeout > 0) {
      timeout -= 1;
      document.getElementById("timeoutValue").innerHTML = timeout;
    }
    else{
      clearInterval(TimeoutVar);
      document.getElementById("timeout").innerHTML = "";
    }
  }
}

var IntervalVar;
var TimeoutVar;

function startStop() {
  if (active) {
    document.getElementById("mode-dropdown").removeAttribute("disabled");
    document.getElementById("startStopButton").innerHTML = "Start";
    clearInterval(IntervalVar);
  }
  else {
    document.getElementById("mode-dropdown").setAttribute("disabled", "disabled");
    document.getElementById("startStopButton").innerHTML = "Stop";
    IntervalVar = setInterval(updateTimer, 1000);
  }
  active = !active;
}

for(playModeId = 0; playModeId < playModes.length; playModeId++) {
  console.log(playModes[playModeId]);
  document.getElementById("mode-dropdown").innerHTML += "<option value='" + playModeId + "'>" + playModes[playModeId] + "</option>";
}

function updateGrid(e) {
  let coords = getTileIndex(getCursorPosition(canvas, e).x, getCursorPosition(canvas, e).y);

  let newColor = grid.getColor(coords.xIndex, coords.yIndex) + 1;
  if (newColor > Object.getOwnPropertyNames(tileTypes).length - 2) {
    newColor = 0;
  }
  console.log(newColor);
  grid.updateTileType(coords.xIndex, coords.yIndex, newColor);
  
  grid.draw();

  updateIndicatorValues();
  updateTimeout(true);
}

// execute code
if (canvas.getContext) {
    // drawing code here
    grid.draw();
    console.log("drawing...");
    updateIndicatorValues();
    canvas.addEventListener('click', function(e) {

      if(active) {
        playMode = document.getElementById("mode-dropdown").value;
        if (playMode == 0) {
          // playmode Unlimited
          updateGrid(e);
        }
        else if (playMode == 1 && timeout == 0) {
          //playmode Scarce and timeout not active
          console.log("Attempt");
          updateGrid(e);
        }
        else if (playMode == 1 && timeout > 0) {
          //playmode Scarce and timeout active
          console.log("Attempt prevented");
        }
      }
    });
    
} 
else {
    // canvas-unsupported code here
    console.log("canvas not supported!");
}
