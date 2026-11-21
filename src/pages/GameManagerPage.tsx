import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSquad } from '../context/SquadContext';
import { validateStrikeTeam } from '../lib/validation';
import { conditions, startGame, type Fighter } from '../lib/game';
import { useGame } from '../context/GameContext';
import { Button } from '../components/ui/button';

export const GameManagerPage = () => {
  const { squads } = useSquad();
  const { game, setGame, endGame } = useGame();
  const [confirm, setConfirm] = useState(false);
  const valid = validateStrikeTeam(squads).valid;
  const update = (id: string, patch: Partial<Fighter>) => setGame(g => g && ({ ...g, fighters: g.fighters.map(f => f.id === id ? { ...f, ...patch } : f) }));
  return <div className="flex flex-col gap-6">
    <div><p className="text-emerald-500 font-mono text-xs uppercase tracking-widest">GMT_12 / Saved session</p>
      <h1 className="text-3xl font-black uppercase mt-2">Game manager</h1>
      <p className="text-muted-foreground mt-2">Track your strike team locally. Resolve rules and scoring at the table.</p></div>
    {!game && <section className="border border-dashed border-border p-8 flex flex-col gap-4">
      <p>{valid ? 'Your strike team is ready to deploy.' : 'Complete a valid two-squad strike team first.'}</p>
      <Link className="text-emerald-500 underline" to="/shatterpoint-starpath/list">Open list builder</Link>
      <Button className="self-start" disabled={!valid} onClick={() => setGame(startGame(squads))}>Start game</Button></section>}
    {game && <>
      <div className="flex flex-wrap items-center gap-4 border border-border p-4">
        <Counter label="Force" value={game.force} min={0} max={99} onChange={force => setGame({ ...game, force })} />
        <Counter label="Struggle" value={game.struggle} min={-8} max={8} onChange={struggle => setGame({ ...game, struggle })} />
        <Button variant="outline" onClick={() => setConfirm(true)}>End game</Button>
      </div>
      {confirm && <div className="border border-amber-500 p-4 flex flex-wrap gap-4 items-center"><p>Clear this saved game? Your squads will stay saved.</p>
        <Button onClick={() => { if (endGame()) setConfirm(false); }}>Confirm end game</Button><Button variant="outline" onClick={() => setConfirm(false)}>Cancel</Button></div>}
      <div className="grid gap-4 lg:grid-cols-2">{game.fighters.map(f => <section key={f.id} aria-label={f.unit.name} className="border border-border bg-card p-5 flex flex-col gap-4">
        <div className="flex justify-between gap-3"><h2 className="font-bold text-lg">{f.unit.name}</h2><span className="text-xs font-mono text-muted-foreground">{f.unit.type}</span></div>
        <div className="flex flex-wrap gap-4"><Counter label="Damage" value={f.damage} min={0} max={f.unit.stamina} onChange={damage => update(f.id, { damage })} />
          <Counter label="Injuries" value={f.injuries} min={0} max={f.unit.durability} onChange={injuries => update(f.id, { injuries })} /></div>
        <p className="text-sm text-muted-foreground">Stamina {f.unit.stamina} / Durability {f.unit.durability}</p>
        <div className="flex flex-wrap gap-2">{conditions.map(c => <Button key={c} size="sm" variant={f.conditions.includes(c) ? 'default' : 'outline'} aria-pressed={f.conditions.includes(c)} onClick={() => update(f.id, { conditions: f.conditions.includes(c) ? f.conditions.filter(v => v !== c) : [...f.conditions, c] })}>{c}</Button>)}</div>
        <label className="flex items-center gap-3"><input type="checkbox" checked={f.activated} onChange={e => update(f.id, { activated: e.target.checked })} />Activated</label>
      </section>)}</div>
    </>}
  </div>;
};
function Counter({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (value: number) => void }) {
  return <div className="flex items-center gap-2"><span className="text-sm">{label}</span><Button variant="outline" size="sm" aria-label={`Decrease ${label}`} disabled={value <= min} onClick={() => onChange(value - 1)}>-</Button>
    <output className="font-mono text-xl min-w-8 text-center" aria-label={label}>{value}</output><Button variant="outline" size="sm" aria-label={`Increase ${label}`} disabled={value >= max} onClick={() => onChange(value + 1)}>+</Button></div>;
}
