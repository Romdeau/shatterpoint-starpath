export const GameManagerPage = () => {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <div className="flex flex-col">
        <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-zinc-400">
          Game State Orchestrator
        </h2>
        <span className="text-[9px] font-aurebesh text-emerald-500/40 uppercase">tactical telemetry</span>
      </div>

      <div className="p-12 border border-dashed border-zinc-800 rounded-lg flex items-center justify-center bg-zinc-950/50">
        <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
          [ Game Manager Module : Offline ]
        </p>
      </div>
    </div>
  );
};
