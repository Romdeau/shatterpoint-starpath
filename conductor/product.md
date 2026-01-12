# Initial Concept

I want to build a new application that i'm calling Shatterpoint Starpath, named after the N-S9 Starpath Unit from Star Wars Andor series. This will be a list builder and game state manager for the Star Wars Shatterpoint Game by Atomic Mass Games (https://www.atomicmassgames.com/shatterpoint/).

For the application technology stack please consult the tech-stack.md file in this repo.

The core aim of the application is to provide a list building application to build lists (which should be exportable/sharable via a base64 string) and a game state manager to manage the game state so that we don't need to track this with the cards and tokens.

I don't have existing structured data for the units in the game, so we should pull this data from existing list builders and game state managers. Here are two examples;

* https://tabletopadmiral.com/shatterpoint/listbuilder
* https://shatterpointdb.com/create-squad/

I'm not sure what structure the data is in, so we should look at both of these examples and try to find a common structure, and then translate this data into JSON files. I don't want to start building the application until we've agreed on a data structure.

Because this is a community tool we should include a generic 'Community tool. Not affiliated with Atomic Mass Games.' on our pages.

## Target Audience
The primary focus is on casual players who need assistance with game state tracking during matches, though it will also serve players looking for an efficient way to build and share squads.

## Core Features
### 1. List Builder
- **Validation:** Enforce official squad-building rules from Atomic Mass Games.
- **Management:** Save multiple squads locally.
- **Sharing:** Export and import squads via base64 encoded strings for easy sharing.
- **Visualization:** Visual unit and card previews to assist in the selection process.

### 2. Game State Manager
- **Unit Tracking:** Track health, damage, and conditions (Strained, Disarmed, etc.) for all units in play.
- **Game Progression:** Manage the Struggle Tracker and Momentum tokens.
- **Resource Management:** Track Force Points and unit activation status.

## Platform Support
- **Modern Responsive Web:** Optimized for both Desktop and Mobile devices to ensure usability at the gaming table.

## Content & Data
- **Data Sourcing:** Unit data will be derived from existing community tools (Tabletop Admiral, ShatterpointDB) and structured into a common JSON format.
- **Legal Disclaimer:** Every page must display: "Community tool. Not affiliated with Atomic Mass Games."
