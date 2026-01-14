import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import { UnitListPage } from "./pages/UnitListPage";
import { ListBuilderPage } from "./pages/ListBuilderPage";
import { GameManagerPage } from "./pages/GameManagerPage";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { accent, isFlickerEnabled } = useTheme();
  const location = useLocation();

  const getPageHeading = () => {
    switch (location.pathname) {
      case "/shatterpoint-starpath/":
        return {
          title: "Unit Database",
          subtitle: "active-manifest",
          id: "ORD_03.manifest"
        };
      case "/shatterpoint-starpath/list":
        return {
          title: "Squad Construction",
          subtitle: "logic-in-production",
          id: "LST_07.build"
        };
      case "/shatterpoint-starpath/game":
        return {
          title: "Game Orchestrator",
          subtitle: "tactical-telemetry",
          id: "GMT_12.state"
        };
      default:
        return {
          title: "Authorized Personnel Only",
          subtitle: "active-session",
          id: "SYS_00.core"
        };
    }
  };

  const heading = getPageHeading();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background text-foreground font-sans selection:bg-emerald-500/30">
        {isFlickerEnabled && <div className="crt-screen" />}

        <AppSidebar />

        <SidebarInset className="flex flex-col bg-transparent">
          {/* Header / Top Bar */}
          <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-zinc-900 px-4 md:px-6 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-background">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-zinc-400 hover:bg-emerald-500/10 hover:text-emerald-500 hover:border-emerald-500/20 border border-zinc-800 rounded-none transition-all h-8 w-8" />
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-4 border-r border-zinc-900 pr-6 h-8 hidden sm:flex">
                  <span className="text-[10px] text-emerald-500 uppercase font-bold tracking-widest animate-pulse flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    Imperial Link: Connected
                  </span>
                </div>
                <div className="flex flex-col">
                  <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 leading-tight">
                    {heading.title}
                  </h2>
                  <span className="text-[8px] font-aurebesh text-emerald-500/30 uppercase leading-tight">{heading.subtitle}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 md:gap-8 font-mono text-[9px] text-zinc-600 uppercase">
              <div className="flex flex-col items-end border-r border-zinc-900 pr-8 h-8 justify-center hidden md:flex">
                <span className="text-zinc-500 leading-tight">{heading.id}</span>
                <span className="text-[7px] text-zinc-800 tracking-tighter leading-tight">Clearance: Delta-9</span>
              </div>
              <div className="flex gap-4">
                <span className="flex gap-1"><span className="font-aurebesh opacity-50">LAT</span> 53.3498° N</span>
                <span className="flex gap-1 hidden sm:inline-flex"><span className="font-aurebesh opacity-50">LNG</span> 6.2603° W</span>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 p-6 md:p-10 relative">
            <div className="max-w-7xl mx-auto flex flex-col gap-16">
              <Routes>
                <Route path="/shatterpoint-starpath/" element={<UnitListPage />} />
                <Route path="/shatterpoint-starpath/list" element={<ListBuilderPage />} />
                <Route path="/shatterpoint-starpath/game" element={<GameManagerPage />} />
                {/* Redirect root to current base path if needed */}
                <Route path="/" element={<Navigate to="/shatterpoint-starpath/" replace />} />
              </Routes>

              {/* Shared Tactical Telemetry Feed (Bottom of every page) */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 border-t border-zinc-900/50 text-zinc-100">
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
                <div className="flex flex-col gap-2 p-4 border border-zinc-900 bg-emerald-950/5 relative overflow-hidden group justify-center">
                  <p className="text-[8px] text-zinc-600 font-mono text-center uppercase tracking-widest leading-relaxed">
                    Starpath v2.0 // Community Tool // Not affiliated with Atomic Mass Games
                  </p>
                </div>
              </section>
            </div>
          </main>

          <footer className="p-4 border-t border-zinc-900 text-center">
            <p className="text-[8px] text-zinc-700 font-mono uppercase tracking-[0.2em]">
              Authorized Imperial Use Only // Project Starpath // 2026
            </p>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

export default App;
