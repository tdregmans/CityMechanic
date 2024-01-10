# CityMechanic

CityMechanic is a game that allows the user to build cities and see the impact of their design choices.

*The file structure was originally forked from [tdregmans/1000-the-game](https://github.com/tdregmans/1000-the-game).*

## Status

The project is in development.

There is a stable release: [Version 1.1](https://github.com/tdregmans/CityMechanic/releases/tag/v1.1).

## Idea

The idea came from the [The House of Futures (Futurium)](https://futurium.de/en) in Berlin. On the ground floor, there was a game like it with Lego pieces and a projector. It inspired me and I decided to build something similar.

### Tiles

The player has a grid of 20 by 20 tiles. The player is free to design the city in the way he/she wants. He/she does this by clicking a tile. It will switch to a different types. There are different types of tiles:

- Sky Scrapers (blue)
- Road (gray)
- Water (light blue)
- Nature (green)
- Residential Area (red)
- Industry (yellow)

At the start of the game, a random type is chosen for each tile.

### Indicators

The user can see the impact of his/her design choices by looking at the indicators. There are different types of indicators.

#### Basic indicators

- Ecological Footprint (The more Water and Nature, the lower the Ecological Footprint. The more Industry and Road, the lower the Ecological Footprint.)
- No. of Residents (The more Residential Area and Sky Scrapers, the more residents there are.)
- Average Travel Speed (The more Road, the higher the average speed.)

#### Complex indicators

- Efficency
- Love of Nature
- GDP
- Percieved Freedom

### Play modes

Like in other games, the player can choose a play mode:

- Unlimited: In this mode, the player can modify the city as much as he/she wants. The modifications take effect immediately. 
- Scarce: In this mode, the player the building resources are scarce. Modification takes time and resources. The modifications are queued.

## File stucture

The game is played in a browser, with `index.html`. The style guide is stored in `css/` and the source code is stored in `js/`.

## Inspiration

Here are some articles and other sources I used:
- ['how to render 3d in 2d canvas' from mamboleoo.be](https://www.mamboleoo.be/articles/how-to-render-3d-in-2d-canvas)
