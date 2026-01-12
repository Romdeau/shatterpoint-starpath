import { UnitList } from "./components/UnitList";
import sampleUnit from "./data/sample_unit.json";
import type { Unit } from "./types/unit";

// Prepare sample data for the display
const units: Unit[] = [
  sampleUnit as unknown as Unit,
  {
    ...sampleUnit,
    name: "General Anakin Skywalker",
    points: 7,
    type: "Primary",
    stamina: 10,
    durability: 3
  } as unknown as Unit,
  {
    ...sampleUnit,
    name: "Captain Rex",
    points: 4,
    type: "Secondary",
    stamina: 9,
    durability: 2
  } as unknown as Unit
];

function App() {
  return (
    <div className="min-h-screen bg-black p-8 font-sans text-gray-200">
      <header className="mb-8 border-b border-orange-900 pb-4">
        <h1 className="text-3xl font-bold uppercase tracking-widest text-orange-500">
          Shatterpoint Starpath
        </h1>
        <p className="mt-2 text-sm text-gray-500 font-mono">
          N-S9 Unit: System Initialized // Visual Verification Mode
        </p>
      </header>

      <main>
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold uppercase text-white border-l-4 border-orange-600 pl-3">
            Unit Data Visualizer
          </h2>
          <UnitList units={units} />
        </section>
      </main>

      <footer className="mt-16 text-center text-xs text-gray-600 font-mono border-t border-orange-950 pt-4">
        Community tool. Not affiliated with Atomic Mass Games.
      </footer>
    </div>
  );
}

export default App;