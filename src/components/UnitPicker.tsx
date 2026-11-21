import { useId, useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import type { Unit } from '../types/unit';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from './ui/command';

interface UnitPickerProps {
  slot: 'primary' | 'secondary' | 'support';
  squadNumber: number;
  units: Unit[];
  value: Unit | null;
  onChange: (unit: Unit | null) => void;
}

const searchable = (text: string) => text.normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase('en');

export function UnitPicker({ slot, squadNumber, units, value, onChange }: UnitPickerProps) {
  const id = useId();
  const title = slot.charAt(0).toUpperCase() + slot.slice(1);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const matches = units.filter(unit => searchable(unit.name).includes(searchable(search.trim())));
  const select = (unit: Unit | null) => {
    onChange(unit);
    setOpen(false);
    setSearch('');
  };
  const label = (unit: Unit) => `${unit.name} / ${Math.abs(unit.points)} ${slot === 'primary' ? 'SP' : 'points'}`;

  return <div className="flex flex-col gap-2 text-sm">
    <label htmlFor={id} className="capitalize">{title}<span className="sr-only">, squad {squadNumber}</span></label>
    <Popover open={open} onOpenChange={next => { setOpen(next); setSearch(''); }}>
      <PopoverTrigger asChild>
        <Button id={id} role="combobox" aria-label={`${title}, squad ${squadNumber}`} aria-expanded={open} aria-haspopup="dialog" variant="outline"
          className="h-auto min-h-12 w-full justify-between rounded-none px-3 py-3 text-left font-normal">
          <span className="min-w-0 whitespace-normal">{value ? label(value) : `Select ${slot}`}</span>
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[var(--radix-popover-trigger-width)] max-w-[calc(100vw-2rem)] rounded-none p-0" aria-label={`Choose ${slot}, squad ${squadNumber}`}>
        <Command shouldFilter={false}>
          <CommandInput aria-label={`Search ${slot} units`} placeholder={`Search ${slot} units...`} value={search} onValueChange={setSearch} />
          <CommandList className="max-h-[min(300px,calc(var(--radix-popover-content-available-height)-3rem))]">
            <CommandEmpty>No units found.</CommandEmpty>
            {!search.trim() && <CommandItem value="clear-selection" onSelect={() => select(null)}>Clear selection</CommandItem>}
            {matches.map(unit => <CommandItem key={unit.name} value={unit.name} onSelect={() => select(unit)} className="min-h-11 cursor-pointer rounded-none">
              <span className="flex-1">{label(unit)}</span>
              {value?.name === unit.name && <Check aria-label="Selected" className="size-4 shrink-0 text-emerald-500" />}
            </CommandItem>)}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </div>;
}
