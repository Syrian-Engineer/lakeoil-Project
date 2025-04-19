import { atom } from 'jotai';
import type { SelectOption } from 'rizzui';

export const filterAtom = atom<{
  filtered_pumps: SelectOption[];
  filtered_tanks: SelectOption[];
  filtered_nozzles: SelectOption[];
  filtered_products: SelectOption[];
}>({
  filtered_pumps: [],
  filtered_tanks: [],
  filtered_nozzles: [],
  filtered_products: [],
});