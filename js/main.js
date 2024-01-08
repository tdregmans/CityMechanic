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

// Indicators
var EcologicalFootprintIndicatorValue = 0;
var NoOfResidentsIndicatorValue = 0;
var AverageTravelSpeedIndicatorValue = 0;

function updateIndicatorValues() {
  EcologicalFootprintIndicatorValue = grid.getAmountOfColor(2) + grid.getAmountOfColor(3) - (grid.getAmountOfColor(1) + grid.getAmountOfColor(5));
  NoOfResidentsIndicatorValue = grid.getAmountOfColor(4);
  AverageTravelSpeedIndicatorValue = grid.getAmountOfColor(1);

  document.getElementById("EcologicalFootprintIndicatorValue").innerHTML = EcologicalFootprintIndicatorValue;
  document.getElementById("NoOfResidentsIndicatorValue").innerHTML = NoOfResidentsIndicatorValue;
  document.getElementById("AverageTravelSpeedIndicatorValue").innerHTML = AverageTravelSpeedIndicatorValue;
}

let active = true;

function startStop() {
  if (active) {
    document.getElementById("mode-dropdown").setAttribute("disabled", "disabled");
  }
  else {
    document.getElementById("mode-dropdown").removeAttribute("disabled");
  }
  active = !active;
}

// execute code
if (canvas.getContext) {
    // drawing code here
    grid.draw();
    console.log("drawing...");
    updateIndicatorValues();
    canvas.addEventListener('click', function(e) {

      if(active) {
        let coords = getTileIndex(getCursorPosition(canvas, e).x, getCursorPosition(canvas, e).y);

        let newColor = grid.getColor(coords.xIndex, coords.yIndex) + 1;
        if (newColor > Object.getOwnPropertyNames(tileTypes).length - 2) {
          newColor = 0;
        }
        console.log(newColor);
        grid.updateTileType(coords.xIndex, coords.yIndex, newColor);
        
        grid.draw();

        updateIndicatorValues();
      }
    });
    
} 
else {
    // canvas-unsupported code here
    console.log("canvas not supported!");
}
