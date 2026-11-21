import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSquad } from '../context/SquadContext';
import unitsData from '../data/units.json';
import type { Unit } from '../types/unit';
import { validateSquad, validateStrikeTeam } from '../lib/validation';
import { exportSquadToBase64, importSquadFromBase64 } from '../lib/sharing';
import { Button } from '../components/ui/button';

const units = unitsData as Unit[];
const slots = ['primary', 'secondary', 'support'] as const;
export const ListBuilderPage = () => {
  const { squads, addSquad, removeSquad, updateSquadUnit, importSquad } = useSquad();
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const validation = validateStrikeTeam(squads);
  return <div className="flex flex-col gap-6">
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div><p className="text-emerald-500 font-mono text-xs uppercase tracking-widest">LST_07 / Local registry</p>
        <h1 className="text-3xl font-black uppercase mt-2">Strike team</h1>
        <p className="text-muted-foreground mt-2">Build two squads. Changes save on this device.</p></div>
      <Button onClick={addSquad}>Add squad</Button>
    </div>
    {squads.length === 0 && <p className="border border-dashed border-border p-8">Your registry is empty. Add a squad or import a squad code below.</p>}
    <div className="grid gap-6 lg:grid-cols-2">{squads.map((squad, index) => {
      const result = validateSquad(squad);
      return <section key={squad.id} className="border border-border bg-card p-5 flex flex-col gap-5">
        <div className="flex justify-between items-center"><h2 className="font-mono uppercase">Squad {index + 1}</h2>
          <Button variant="ghost" onClick={() => removeSquad(squad.id)}>Remove squad {index + 1}</Button></div>
        {slots.map(slot => <label key={slot} className="flex flex-col gap-2 text-sm capitalize">{slot}
          <select className="bg-background border border-border p-3 w-full text-foreground" value={squad[slot]?.name ?? ''}
            onChange={e => updateSquadUnit(squad.id, slot, units.find(u => u.name === e.target.value) ?? null)}>
            <option value="">Select {slot}</option>
            {units.filter(u => u.type.toLowerCase() === slot).map(u => <option key={u.name} value={u.name}>{u.name} / {Math.abs(u.points)} {slot === 'primary' ? 'SP' : 'points'}</option>)}
          </select></label>)}
        <div className="text-sm" role="status">{result.valid ? <p className="text-emerald-500">Squad ready</p> : result.errors.map(error => <p key={error} className="text-amber-500">{error}</p>)}</div>
        <Button variant="outline" onClick={() => { setCode(exportSquadToBase64(squad)); setMessage('Squad code ready. Copy it from the field below.'); }}>Export squad {index + 1}</Button>
      </section>;
    })}</div>
    <section className="border border-border p-5 flex flex-col gap-3">
      <h2 className="font-mono uppercase">Squad transfer</h2><label htmlFor="squad-code">Squad code</label>
      <textarea id="squad-code" className="border border-border bg-background p-3 font-mono text-sm w-full" rows={3} value={code} onChange={e => setCode(e.target.value)} />
      <Button className="self-start" disabled={!code.trim()} onClick={() => {
        const squad = importSquadFromBase64(code.trim(), name => units.find(u => u.name === name));
        if (squad) { importSquad(squad); setMessage('Squad imported.'); } else setMessage('Invalid squad code or unknown unit. No changes made.');
      }}>Import squad</Button><p role="status">{message}</p>
    </section>
    <div className="flex flex-col gap-2 text-sm">{validation.errors.map(error => <p className="text-amber-500" key={error}>{error}</p>)}
      {validation.valid && <Link className="text-emerald-500 underline" to="/shatterpoint-starpath/game">Deploy to game manager</Link>}
    </div>
  </div>;
};
