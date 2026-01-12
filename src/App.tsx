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

import { ThemeSwitcher } from "./components/ThemeSwitcher";

import { useTheme } from "./context/ThemeContext";

function App() {
  const { accent, isFlickerEnabled } = useTheme();

  const logoFilter = {
    emerald: 'sepia(1) saturate(5) hue-rotate(90deg)',
    amber: 'sepia(1) saturate(5) hue-rotate(40deg)',
    red: 'sepia(1) saturate(5) hue-rotate(-10deg)',
  }[accent];

  return (
    <div className="min-h-screen bg-transparent p-6 md:p-12 font-sans text-zinc-100 selection:bg-emerald-500/30">
      {isFlickerEnabled && <div className="crt-screen" />}
      {/* Background Decorator */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-emerald-500/5 to-transparent" />
      </div>

      <header className="relative mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <img
              src={`${import.meta.env.BASE_URL}starpath.svg`}
              alt="Starpath Logo"
              className="w-10 h-10 brightness-150 grayscale contrast-200"
              style={{ filter: logoFilter }}
            />
            <h1 className="text-4xl font-black uppercase tracking-[0.2em] text-zinc-100">
              STAR<span className="text-emerald-500">PATH</span>
            </h1>
          </div>
          <div className="flex items-center gap-2 ml-11">
            <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
              Tactical Analysis & Logistics Interface // V2.0.26
            </p>
            <span className="text-[8px] font-aurebesh text-emerald-500/40 uppercase tracking-tighter">starpath protocol</span>
          </div>
        </div>

        <div className="flex flex-col md:items-end font-mono">
          <span className="text-[10px] text-emerald-500 uppercase font-bold tracking-widest animate-pulse flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Imperial Link: Secure
          </span>
          <div className="flex gap-4 text-[10px] text-zinc-600 uppercase mt-1">
            <span className="flex gap-1"><span className="font-aurebesh opacity-50">LAT</span> 53.3498° N</span>
            <span className="flex gap-1"><span className="font-aurebesh opacity-50">LNG</span> 6.2603° W</span>
          </div>
        </div>
      </header>

      <main className="relative">
        <div className="absolute -left-6 top-0 bottom-0 w-px bg-zinc-800/50 hidden md:block" />

        <section className="mb-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex flex-col">
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-zinc-400">
                Authorized Personnel Only
              </h2>
              <span className="text-[9px] font-aurebesh text-emerald-500/40 uppercase">active manifest</span>
            </div>
            <div className="h-px flex-1 bg-zinc-900/50" />
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-mono text-zinc-700">ORD_03.manifest</span>
              <span className="text-[8px] font-mono text-zinc-800 uppercase tracking-tighter">Clearance Level: Delta-9</span>
            </div>
          </div>

          <UnitList units={units} />
        </section>

        {/* Tactical Info Panel */}
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-16 border-t border-zinc-900/50 pt-8">
          <div className="flex flex-col gap-2 p-4 border border-zinc-900 bg-emerald-950/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-1">
              <span className="text-[8px] font-aurebesh text-zinc-800 group-hover:text-emerald-500/40 transition-colors uppercase">system</span>
            </div>
            <span className="text-[9px] font-mono text-zinc-500 uppercase">System Status</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="text-xs uppercase font-bold text-zinc-300">Operational</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-4 border border-zinc-900 bg-emerald-950/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-1">
              <span className="text-[8px] font-aurebesh text-zinc-800 group-hover:text-emerald-500/40 transition-colors uppercase">sector</span>
            </div>
            <span className="text-[9px] font-mono text-zinc-500 uppercase">Registry Sector</span>
            <span className="text-xs uppercase font-bold text-zinc-300">Coruscant / Bureau of Standards</span>
          </div>
          <div className="flex flex-col gap-2 p-4 border border-zinc-900 bg-emerald-950/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-1">
              <span className="text-[8px] font-aurebesh text-zinc-800 group-hover:text-emerald-500/40 transition-colors uppercase">data</span>
            </div>
            <span className="text-[9px] font-mono text-zinc-500 uppercase">Link Encryption</span>
            <span className="text-xs uppercase font-bold text-zinc-300">ISONET-7 / Imperial Standard</span>
          </div>
          <ThemeSwitcher />
        </section>
      </main>

      <footer className="mt-20 flex flex-col items-center gap-6">
        <div className="h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-zinc-900 to-transparent" />
        <div className="flex flex-col items-center gap-3">
          <p className="text-[9px] text-zinc-600 font-mono text-center uppercase tracking-[0.3em] max-w-2xl leading-relaxed">
            Imperial Property. Unauthorized access to this Starpath terminal is a violation of Imperial Decree 104-B.
            By order of the ISB, all data logged is subject to immediate review.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-aurebesh text-zinc-800 uppercase tracking-widest">authorized-only</span>
            <div className="w-1.5 h-1.5 bg-emerald-900/50 rotate-45" />
            <span className="text-[8px] text-zinc-800 font-mono uppercase tracking-[0.2em]">
              Starpath is a community tool // Not affiliated with Atomic Mass Games // Created for fan use only
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
