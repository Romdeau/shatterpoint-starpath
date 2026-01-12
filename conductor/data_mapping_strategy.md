# Data Mapping Strategy: External to Shatterpoint Starpath

## Sources
1. **Tabletop Admiral (TTA):** Primarily for unit list, PC/SP costs.
2. **ShatterpointDB (SPDB):** For detailed card data including abilities, health (Stamina/Durability), and tags.

## Mapping Table

| External Field (SPDB/TTA) | Internal Schema Field | Logic/Transformation |
|---------------------------|-----------------------|----------------------|
| `name` / `card.name`      | `name`                | Direct map           |
| `type` / `card.type`      | `type`                | Map to "Primary", "Secondary", "Support" |
| `fp` / `card.force`       | `force`               | Direct map (Primary only) |
| `sp` / `card.points`      | `points`              | Direct map           |
| `stamina`                 | `health`              | Direct map           |
| `tags`                    | `keywords`            | Direct map (Array of strings) |
| `abilities`               | `abilities`           | Array transformation |
| `ability.name`            | `abilities[].name`    | Direct map           |
| `ability.type`            | `abilities[].type`    | Map to "Active", "Reactive", "Innate", "Identity" |
| `ability.cost`            | `abilities[].cost`    | Direct map (Default 0 if missing) |
| `ability.text`            | `abilities[].description` | Clean HTML tags if present |

## Transformation Process
1. **Extraction:** Use a headless browser or inspect network traffic to capture the raw JSON from external sources.
2. **Normalization:** Run a script (to be developed) that iterates through the raw data and applies the mapping logic above.
3. **Validation:** Each normalized unit MUST pass the `src/data/schema.json` validation.
4. **Enrichment:** Manually add missing data if not available from either source (e.g., specific keyword interactions).

## Implementation Plan
- Develop a Node/Bun script that takes a raw JSON blob from an external source and outputs a valid `Shatterpoint Unit` JSON.
- Store the results in `src/data/units/`.
