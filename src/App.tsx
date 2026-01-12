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
    durability: 3,
    force: 4,
    keywords: ["Jedi", "501st", "Galactic Republic"]
  } as unknown as Unit,
  {
    ...sampleUnit,
    name: "Captain Rex",
    points: 4,
    type: "Secondary",
    stamina: 9,
    durability: 2,
    keywords: ["501st", "Clone Trooper", "Galactic Republic"]
  } as unknown as Unit
];

function App() {
  return (
    <div className="min-h-screen bg-transparent p-6 md:p-12 font-sans text-zinc-100 selection:bg-orange-500/30">
      {/* Background Decorator */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-orange-900/10 to-transparent" />
      </div>

      <header className="relative mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-orange-600 flex items-center justify-center font-black text-black">S</div>
             <h1 className="text-4xl font-black uppercase tracking-[0.2em] text-zinc-100">
                STAR<span className="text-orange-600">PATH</span>
             </h1>
          </div>
          <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase ml-11">
            Tactical Analysis & Logistics Interface // V2.0.26
          </p>
        </div>

        <div className="flex flex-col md:items-end font-mono">
            <span className="text-[10px] text-orange-900 uppercase font-bold tracking-widest animate-pulse">
                System Link: Established
            </span>
            <div className="flex gap-4 text-[10px] text-zinc-600 uppercase mt-1">
                <span>Lat: 53.3498° N</span>
                <span>Long: 6.2603° W</span>
            </div>
        </div>
      </header>

      <main className="relative">
        <div className="absolute -left-6 top-0 bottom-0 w-px bg-zinc-800/50 hidden md:block" />
        
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-zinc-400">
              Active Unit Manifest
            </h2>
            <div className="h-px flex-1 bg-zinc-900" />
            <span className="text-[10px] font-mono text-zinc-700">ORD_03.manifest</span>
          </div>
          
          <UnitList units={units} />
        </section>

        {/* Tactical Info Panel (Mock) */}
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-16 border-t border-zinc-900 pt-8 opacity-50 hover:opacity-100 transition-opacity">
            <div className="flex flex-col gap-2 p-4 border border-zinc-900 bg-zinc-950/50">
                <span className="text-[9px] font-mono text-zinc-500 uppercase">System Status</span>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                    <span className="text-xs uppercase font-bold">Operational</span>
                </div>
            </div>
            <div className="flex flex-col gap-2 p-4 border border-zinc-900 bg-zinc-950/50">
                <span className="text-[9px] font-mono text-zinc-500 uppercase">Sector</span>
                <span className="text-xs uppercase font-bold">Mid Rim / Ferrix</span>
            </div>
            <div className="flex flex-col gap-2 p-4 border border-zinc-900 bg-zinc-950/50">
                <span className="text-[9px] font-mono text-zinc-500 uppercase">Encoding</span>
                <span className="text-xs uppercase font-bold">Imperial Standard v4</span>
            </div>
            <div className="flex flex-col gap-2 p-4 border border-zinc-900 bg-zinc-950/50">
                <span className="text-[9px] font-mono text-zinc-500 uppercase">Signal Range</span>
                <span className="text-xs uppercase font-bold">Deep Space Array</span>
            </div>
        </section>
      </main>

      <footer className="mt-20 flex flex-col items-center gap-4">
        <div className="h-1 w-24 bg-orange-950/30" />
        <p className="text-[8px] text-zinc-700 font-mono text-center uppercase tracking-[0.4em] max-w-md leading-relaxed">
          Proprietary data of the Ferrix Resistance. Unauthorized access is punishable by Imperial Decree 104-B. Starpath is a community tool. Not affiliated with Atomic Mass Games.
        </p>
      </footer>
    </div>
  );
}

export default App;
