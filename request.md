In the unit data (`src/data/units.json`) some missions are mixed in with this data. There look by the below;

```json
  {
    "name": "Shifting Priorities",
    "type": null,
    "points": 0,
    "force": 0,
    "stamina": 0,
    "durability": 0,
    "eras": [],
    "keywords": [],
    "image": "/media/ruyd53z5/shatterpoint-shifting-priorities.png?width=120&height=120&v=1db613fe67edfb0",
    "abilityIds": [],
    "stanceIds": []
  },
```

The thing that identifies them is they have 0 points, 0 force, 0 stamina, 0 durability, empty eras, empty keywords, empty abilityIds and empty stanceIds.

Please create a new schema for these that just contains the name and image property.